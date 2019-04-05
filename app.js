var express = require('express'),
  routes = require('./routes');
var app = express();
var user = require('./routes/user');
var session = require('express-session');
var bodyParser = require('body-parser');
var mysql = require('mysql');
const url = require('url');

var con = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: ''
});
// connect to mysql server
con.connect(function(err) {
  if (err) throw err;
  console.log('Connected!');
  // create database
  con.query('CREATE DATABASE IF NOT EXISTS ci', function(err, result) {
    if (err) throw err;
    console.log('Database created!');
    con.query('use ci;');
    con.query(
      `CREATE TABLE IF NOT EXISTS users (
        id int NOT NULL AUTO_INCREMENT,
        name varchar(50) NOT NULL,
        user_name varchar(30) NOT NULL,
        password varchar(32) NOT NULL,
        PRIMARY KEY (id)
        )`,
      function(err, result) {
        if (err) throw err;
        console.log('Table created');
      }
    );
  });
});
// declare global variables
global.db = con;
global.url = url;

// all environments
app.set('port', 8081);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// edit session settings
app.use(
  session({
    secret: 'ais ci cookie dude!',
    saveUninitialized: true,
    cookie: { maxAge: 90000 },
    resave: false
  })
);
app.get('/', routes.index); //call for main index page
app.get('/home', routes.index); //call for main index page
app.post('/home', routes.index); //call for main index page
app.get('/register', user.register); //call for register page
app.post('/login', user.login); //call for login post
app.get('/login', user.login); //call for login get
app.listen(8081);
