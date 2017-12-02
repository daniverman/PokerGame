/**
 * Created by daniel on 02/12/2017.
 */

let express = require('express');
let app = express();
let morgan = require('morgan');
let bodyParser = require('body-parser');
let methodOverride = require('method-override');
let path = require('path');
let port = 8080;

let users = require('./routes/users');

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));   // parse application/vnd.api+json as json
app.use(methodOverride());

//server
app.use('/users',users);
//app
app.use('*' , function (req , res) {
    res.redirect('/');
});

app.listen(port);
console.log("App listening in port" +  port );

module.exports = app;