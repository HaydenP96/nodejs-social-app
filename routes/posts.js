const router = require('express').Router();
const isAuth = require('../utils/auth').isAuth;
const Post = require('../models/post');

router.get('/post/new', isAuth, (req, res, next) => {
  res.render('newPost', {
    title: 'New Post',
    user: req.user,
    message: req.flash(),
  });
});

router.post('/post/new', (req, res, next) => {
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
