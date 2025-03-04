require('dotenv').config();
var express = require('express');
var RateLimit = require('express-rate-limit');
const cors = require('cors');
const app = express();
const urlparser = require('url')
const {MongoClient} = require('mongodb')
const dns = require('dns');

// Basic Configuration
const port = process.env.PORT || 3000;

const cdb = new MongoClient(process.env.URI);
const db = cdb.db("url_service");
const storeUrls = db.collection('urls');

// set up rate limiter: maximum of 100 requests per 15 minutes
// found this suggestion on the forum for timelut
var limiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per windowMs
});

// apply rate limiter to all requests
app.use(limiter);
app.use(cors());
app.use('/public', express.static(`${process.cwd()}/public`));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
}); 


// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', function(req, res){
  const urlString = req.body.url;
  const lookDns = dns.lookup(urlparser.parse(urlString).hostname , async(req , validIP) => {
   if(!validIP){
    res.json({error: "Invalid URL"})
   } else {


    //check if url already exists
    const urlExists = await storeUrls.findOne({urlString});
    if (urlExists) {
      res.json({
        original_url: urlString,
        short_url: urlExists.short_url
      });
    } else {  
      const countUrls = await storeUrls.countDocuments({});
      const urlStore = {
        urlString,
        short_url: countUrls
      }

      const respond = await storeUrls.insertOne(urlStore);
      res.json({
        original_url: urlString,
        short_url: countUrls
      });
     }
    }



  })
 });

 app.get("/api/shorturl/:short_url" , async (req ,res) => {
  const shorturl = req.params.short_url;
  const urlStore = await storeUrls.findOne({ short_url: +shorturl })
  res.redirect(urlStore.urlString); 
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});