var express = require('express'),
  routes = require('./routes');
var app = express();
var user = require('./routes/user');
var session = require('express-session');
var bodyParser = require('body-parser');
const { Pool } = require('pg');
const dotenv = require('dotenv');
const url = require('url');
const PORT = process.env.PORT || 5000;
dotenv.config();

const pool = new Pool({
  connectionString:
    'postgres://rhvdxhazqobubd:b48ee7ef642af26d2cfab2ea919c39cfc1820318c19555fc708f57cb9a1d0f82@ec2-54-225-242-183.compute-1.amazonaws.com:5432/d3reo846hopkg'
});

pool.on('connect', () => {
  console.log('connected to the db');
});
const createTables = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS users (
    user_id serial PRIMARY KEY,
    user_name VARCHAR (50) UNIQUE NOT NULL,
    password VARCHAR (50) NOT NULL,
      name VARCHAR (50) NOT NULL
      )`;

  pool
    .query(queryText)
    .then(res => {
      console.log(res);
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
};
pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createTables
};
// declare global variables
global.db = pool;
global.url = url;

// all environments
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
app.post('/register', user.register); //call for register page
app.post('/login', user.login); //call for login post
app.get('/login', user.login); //call for login get
app.listen(PORT);
