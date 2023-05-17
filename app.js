const express = require('express');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const path = require('path');

require('dotenv').config();

const connection = require('./config/database');
const routes = require('./routes/index');
const postRoutes = require('./routes/posts');
const { isAuth } = require('./utils/auth');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cookieParser('kdskds'));
app.use(flash());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

app.get('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
  });
  res.redirect('/');
});

app.use(routes);
app.use(postRoutes);

app.listen(8080);
