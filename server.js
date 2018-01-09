var config = require('./config.json')
var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./api/models/todoListModel'), //created model loading here
  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
var mongoDB = mongoose.connect(config.uri, {
                               useMongoClient: true,
                               promiseLibrary: global.Promise
                            });
 mongoDB
        .then(db => {
            console.log('Mongodb has been connected');
        })
        .catch(err => {
            console.log('Error while trying to connect with mongodb');
            throw err;
        });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/todoListRoutes'); //importing route
routes(app); //register the route


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);