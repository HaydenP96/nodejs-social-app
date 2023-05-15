const express = require('express');
const connection = require('./config/database');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index', { title: 'Homepage' });
});

app.get('/register', (req, res) => {
  res.render('register', { title: 'Register' });
});
app.listen(3000);
