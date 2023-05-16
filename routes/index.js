const router = require('express').Router();
const User = require('../models/user');
const genPassword = require('../config/password').genPassword;
const passport = require('passport');
const connection = require('../config/database');
const Post = require('../models/post');

router.get('/', async (req, res) => {
  const posts = await Post.find().sort({
    createdAt: 'desc',
  });

  if (req.isAuthenticated()) {
    res.render('posts', {
      title: 'Posts',
      message: req.flash(),
      user: req.user,
      posts: posts,
    });
  } else {
    res.render('index', {
      title: 'Homepage',
      message: req.flash(),
      user: req.user,
    });
  }
});

router.get('/register', (req, res) => {
  res.render('register', {
    title: 'Register',
    message: req.flash(),
    user: req.user,
  });
});

router.post('/register', async (req, res, next) => {
  let password1 = req.body.password;
  let password2 = req.body.passwordConfirm;
  if (password1 !== password2) {
    req.flash('error', 'test');
    res.redirect('/register');
    return next();
  }

  const saltHash = genPassword(req.body.password);
  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = new User({
    username: req.body.email,
    hash: hash,
    salt: salt,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  try {
    const result = await newUser.save();
    console.log(result);
    res.redirect('/');
  } catch (err) {
    req.flash('emailExists', 'email already in use');
    res.redirect('/register');
  }
});

router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/',
    successRedirect: '/',
    failureFlash: true,
  })
);

module.exports = router;
