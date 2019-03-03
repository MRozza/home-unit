var express = require('express'),
  routes = require('./routes');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
const url = require('url');

var con = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: ''
});

con.connect(function(err) {
  if (err) throw err;
  console.log('Connected!');
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

global.db = con;
global.url = url;

// all environments
app.set('port', 8093);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/', routes.index); //call for main index page
app.get('/home', routes.index); //call for main index page
app.post('/home', routes.index); //call for main index page
app.listen(8093);
