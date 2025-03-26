'use strict';


var expect = require('chai').expect;
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  project_title: {
    'type': String
  },
  issues: [
    {
      "_id":         {'type': String, 'default': new ObjectId()},
      "issue_title": {'type': String},
      "issue_text":  {'type': String},
      "created_by":  {'type': String},
      "assigned_to": {'type': String},
      "status_text": {'type': String},
      "created_on":  {'type': Date, 'default': new Date()},
      "updated_on":  {'type': Date, 'default': new Date()},
      "open":        {'type': Boolean}
    }
  ]
});
const Project = mongoose.model('Project', projectSchema);

mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connection.once('open', () => {
  console.log('MongoDB database connection established successfully'+ mongoose.connection.readyState);
}); 


module.exports = function (app) {

  app.route('/api/issues/:project')
    .get(function (req, res){
      let project_name = req.params.project; //get project from url
      
      console.log("get",req.params, req.query);

      //check if project exists
      Project.findOne({project_title: project_name}, (err, project) => {
        if (!project) {
          console.log("Error: That project does not exist", project_name );
          res.json({ error : "That project does not exist" });
          return;
        }

        // remove query Added by vscodeBrowserReqId
        if(req.query.hasOwnProperty("vscodeBrowserReqId")) {
          console.log("vscodeBrowserReqId",req.query.vscodeBrowserReqId);

          // remvoe vscodeBrowserReqId
          delete req.query.vscodeBrowserReqId;
        } 

        if(!isEmpty(req.query)) {    
          if (req.query.hasOwnProperty("open")){
            if(req.query.open == "true") {
              req.query.open = true
            } else {
              req.query.open = false
            }
          };

          req.query.hasOwnProperty("created_on") ? req.query.created_on = new Date(req.query.created_on) : null;
          req.query.hasOwnProperty("updated_on") ? req.query.updated_on = new Date(req.query.updated_on) : null;

          // loop through params to create condition
          let cond = Object.entries(req.query).map(el => {
            return {$eq: [`$$item.${el[0]}`, el[1] ]};
          });       

          Project.aggregate(
                [
                  {
                    $match: {
                      'project_title': project_name
                    }
                  }, {
                    $project: {
                      issue: {
                        $filter: {
                          input: '$issues', 
                          as: 'item', 
                          cond: { $and: cond}
                        }
                      }
                    }
                  }
                ]
            ).exec((err, issues) => {
                if (err) return res.json({ error: "That project does not exist" });
                return res.json(issues[0].issue);
            })
        } else {
            //console.log("return all", project.issues);
            return res.json(project.issues);        
        }        
      })  
  })
  .post(function (req, res){
    let projecttitle = req.params.project; //get project from url
    
    console.log("post",req.params,req.body);

     // check if mandatory fields are filled
     if (!req.body.issue_title || !req.body.issue_text || !req.body.created_by) {
      return res.json( { error: 'required field(s) missing' });
    }

    //check if project exists
    Project.findOne({project_title: projecttitle}, (err, project) => {
      if (!project) {
        //create new project
        project = new Project({
          project_title: projecttitle
        });
        

      } 
      // replace null with empty string
      let assigned_to = req.body.assigned_to ? req.body.assigned_to : "";
      let status_text = req.body.status_text ? req.body.status_text : "";

      let issue = {
        _id: new ObjectId(),
        issue_title: req.body.issue_title,
        issue_text: req.body.issue_text,
        created_by: req.body.created_by,  
        assigned_to: assigned_to,
        status_text: status_text,
        open: true,
        created_on: new Date(),
        updated_on: new Date()
      };
      project.issues.push(issue);
      project.save();
      res.json(issue);
      
   });
  })
  .put(function (req, res){
    let project = req.params.project; //get project from url
    
    console.log("put",req.params,req.body);

    //check if project exists
    Project.findOne({project_title: project}, (err, project) => {
      if (!project) {
        res.json({ error: 'That project does not exist' });
      } else {
        //if no id is given, return error
        if (!req.body._id) {
          res.json({ error : 'missing _id' });
        } else {

          // check if no update field is given
          if (!req.body.issue_title && !req.body.issue_text && !req.body.assigned_to && !req.body.status_text && !req.body.open) {
            res.json({ error: 'no update field(s) sent','_id': req.body._id });
          } else {
            //check if issue exists
            let issue = project.issues.find(issue => issue._id == req.body._id);
            if (!issue) {
              res.json({ error: 'could not update','_id': req.body._id });
            } else {
            //update issue
              issue.issue_title = req.body.issue_title ? req.body.issue_title : issue.issue_title;
              issue.issue_text = req.body.issue_text ?  req.body.issue_text : issue.issue_text;
              issue.assigned_to = req.body.assigned_to ? req.body.assigned_to : issue.assigned_to;
              issue.status_text = req.body.status_text ? req.body.status_text : issue.status_text;
              issue.open = req.body.open ? req.body.open : issue.open;
              issue.updated_on = new Date();
              project.save();
              res.json({  result: 'successfully updated', '_id': req.body._id});
            }
          }
        }
      }
    });
  })
  .delete(function (req, res){
    let project = req.params.project; //get project from url
    
    console.log("delete",req.params);

    //check if project exists
    Project.findOne({project_title: project}, (err, project) => {
      if (!project) {
        res.json({ error : 'That project does not exist' });
      } else {
        //if no id is given, return error
        if (!req.body._id) {
          console.log("missing _id", req.body._id);
          res.json({error: "missing _id" });
        } else {
          //check if issue exists
          let issue = project.issues.find(issue => issue._id == req.body._id);
          if (!issue) {
            console.log("could not delete", req.body._id);
            res.json({error: 'could not delete', '_id':  req.body._id});
          } else {
            //delete issue
            project.issues.splice(project.issues.indexOf(issue), 1);
            project.save();
            console.log('deleted',  issue._id);
            res.json({result: 'successfully deleted', '_id':  req.body._id}); 
          }
        }
      }
    });
  });

/*
// Enable for extra debugging
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });
*/

  //add new project
  app.post('/', (req, res) => {

    const projecttitle = req.body.projecttitle;
    console.log("post /", projecttitle);

    Project.findOne({project_title: projecttitle}, (err, project) => {
      if (project) {
        res.json({"That project exists": projecttitle});
      }
      else {

        let new_project = new Project({
          project_title: projecttitle
        });
        new_project.save(
          function (err, data) {
            res.json({
              "project_title": data.project_title,
              "_id": data._id
            });
          }
        );
      }
    });
  });

      // check that an object is empty/not empty
      function isEmpty(obj) {
        for(var key in obj) {
          if(obj.hasOwnProperty(key))
            return false;
        }
          return true;
      }

};
