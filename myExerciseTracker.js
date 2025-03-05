import express, { application } from 'express';
import json from 'express';
const app = express()
import cors from 'cors';
import config from 'dotenv';

import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import mongoose from 'mongoose';
import RateLimit from 'express-rate-limit';
import bodyParser from 'body-parser';
import { create } from 'node:domain';
import { log } from 'node:console';

const __dirname = dirname(fileURLToPath(import.meta.url));
config.config();

app.use(cors())
app.use(express.static('public'))
app.use('/public', express.static(`${process.cwd()}/public`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


mongoose.connect(process.env.URI+'/fcc-exercise-tracker', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

//* Schemas
const exerciseSchema = new mongoose.Schema({
	userId: String,
	username: String,
	description: { type: String, required: true },
	duration: { type: Number, required: true },
	date: Date,
});

const userSchema = new mongoose.Schema({
	username: String,
});

//* Models
let Users = mongoose.model('User', userSchema);
let Exercises = mongoose.model('Exercise', exerciseSchema);


// set up rate limiter: maximum of 100 requests per 15 minutes
let limiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per windowMs
});

// apply rate limiter to all requests
app.use(limiter);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.post('/api/users', async (req, res) => {
  const newUserName = req.body.username;
  let user = await Users.findOne({username: newUserName}).exec();
  if(user) {
     res.json({error: 'Username already taken'})
  }
  else {
    // Create a new user
    let newUser = new Users({ username: newUserName });

    try {
      await newUser.save();
      //console.error("user create", newUser.username, newUser._id);
      res.json({ username: newUser.username, _id: newUser._id });
    } catch (err) {
      res.json({ message: 'User creation failed!' });
    }
  }
});


app.get('/api/users', async (req, res) => {

  try {
    const users = await Users.find({});
		if (users.length === 0) {
			res.json({ message: 'There are no users in the database!' });
		}
		//console.log('users in database: ', users.length);
		res.json(users);
  } catch (err) {
      console.error(err);
      res.json({message: 'Getting all users failed!'});
 }
});

app.post('/api/users/:_id/exercises', async (req, res) => {
  const id = req.params._id;
  let {description, duration, date} = req.body;

	// Check for date
	if (!date) {
      date = new Date().toDateString();
  }

  try {
    const userDB = await Users.findById(id).exec();
    let newExercise = null;

    //user found
    if(userDB) {
      //* Create new exercise
      newExercise = new Exercises({
        userId: userDB._id,
        username: userDB.username,
        description: description,
        duration: parseInt(duration),
        date: date,
      });
    } else {
       console.error("User not found");
       return res.json({ message: '!User not found!' });
    }

    try {
      await newExercise.save();
      //console.log("Exercise create", newExercise.username);

      res.json({
        username: userDB.username,
        description: description,
        duration: parseInt(duration),
        date: new Date(date).toDateString(),
        _id: userDB._id,
      });


    } catch (err) {
      console.error(err);
      res.json({ message: 'Exercise creation failed!' });
    }

  } catch (err) {
    console.error(err);
    res.json({ message: 'User not found' });
  }
});	



app.get('/api/users/:_id/logs', async (req, res) => {
  const id = req.params._id;
  const { from, to, limit } = req.query;

  const userDB = await Users.findById(id).exec();
  if(!userDB) {
    return res.json({error: 'User not found'})
  }

  let dateObj = {};

  if (from) { dateObj["$gte"] = new Date(from);}
  if (to)   { dateObj["$lte"] = new Date(to);  }

  let filter = {userId: id};
  if (from || to) { filter.date = dateObj;}

  try {
    const exercises = await Exercises.find(filter).limit(+limit || 1000);
    const log = exercises.map((exercise) => ({
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.date.toDateString(),
    }));

    res.json({
      _id: userDB._id,
      username: userDB.username,
      count: log.length,
      log: log,
    });
  } catch (err) {
    console.error(err);
    res.status(1000).json({ error: "Oh crap, something bad happened" });
  }

});


app.get('/api/users/:_id/exercises', async (req, res) => {
  const id = req.params._id;
  const userDB = await Users.findById(id).exec();
  if(!userDB) {
    return res.json({error: 'User not found'})
  }
  const userExercises = await Exercises.find({username: userDB.username}).exec();
  return res.json({username: Users.username, _id: userDB._id, exercises: userExercises});
});

const listener = app.listen(3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
