'use strict';

import express     from 'express';
import bodyParser  from 'body-parser';
import cors        from 'cors';
import dotenv from 'dotenv';
dotenv.config()

// config .env
import mongodb from 'mongodb';
const { MongoClient } = mongodb;

import apiRoutes         from './routes/api.js';
import fccTestingRoutes  from './routes/fcctesting.js';
import runner            from './test-runner.js';

const app = express();

app.use('/public', express.static(process.cwd() + '/public'));

app.use(cors({origin: '*'})); //USED FOR FCC TESTING PURPOSES ONLY!

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });


  const URI = process.env.DB;
  //console.log("URI", URI);
  const client = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
      // connect to mongodb cluster 
      await client.connect();

      // create a validator for the collection
      const validator = {
          validator: {
              $jsonSchema: {
                  bsonType: "object",
                  required: ["title"],
                  properties: {
                      title: {
                          bsonType: "string",
                          description: "must be a string and is required"
                      },
                      comments: {
                          bsonType: "array",
                          items: {
                              bsonType: "string"
                          }
                      },
                      commentcount: {
                          bsonType: "int",
                          minimum: 0
                      }
                  }
              }
          }
      }

      // Make the appropriate DB calls
      const db = await client.db('database');
      const Books = (await db.listCollections({ name: 'books' }).next() ? await db.collection('books') : await db.createCollection('books', validator));
      
      //For FCC testing purposes
      fccTestingRoutes(app);
      
      //Routing for API 
      apiRoutes(app, Books);

      console.log("API Routes are set up"); 

  }
  catch (e) {
      //cathc any errors
      console.log(e);
      throw new Error("Unable to Connect to the Database");
  }
    

//Start our server and tests!
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
  if(process.env.NODE_ENV==='test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        runner.run();
      } catch(e) {
          console.log('Tests are not valid:');
          console.error(e);
      }
    }, 1500);
  }
});

//for unit/functional testing
export {app}; 
