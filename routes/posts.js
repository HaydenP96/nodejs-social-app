const router = require('express').Router();
const isAuth = require('../utils/auth').isAuth;
const Post = require('../models/post');
const connection = require('../config/database');
const passport = require('passport');

router.get('/new', isAuth, (req, res, next) => {
  res.render('newPost', {
    title: 'New Post',
    user: req.user,
    message: req.flash(),
  });
});

router.post('/new', (req, res, next) => {
  const newPost = new Post({
    title: req.body.postTitle,
    description: req.body.postDescription,
    createdBy: req.user,
  });

  newPost.save().then((post) => {
    console.log(post);
  });
  res.redirect('/');
});

module.exports = router;
