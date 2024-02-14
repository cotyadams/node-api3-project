const express = require('express');
// You will need `users-model.js` and `posts-model.js` both
const User = require('../users/users-model');
const Post = require('../posts/posts-model');
// The middleware functions also need to be required
const {logger, validateUserId, validateUser, validatePost} = require('../middleware/middleware');

const router = express.Router();
router.use(logger);
router.use(express.json());
router.use('/:id', validateUserId);

router.get('/', async (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  res.status(200).json(await User.get())
});

router.get('/:id', (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.status(200).json(req.user);
});

router.post('/', validateUser, async (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  let user = await User.insert(req.body)
  res.status(201).json(user);
});


// NEED HELP
// NEED HELP
// NEED HELP
// NEED HELP
router.put('/:id', validateUserId, validateUser, async (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  res.status(200).json(await User.update(req.params.id, req.body.name));
});

router.delete('/:id', validateUserId, async (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  let deleted = await User.getById(req.params.id);
  await User.remove(req.params.id)
  res.status(200).json(deleted);
});

router.get('/:id/posts', validateUserId, async (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  let posts = await User.getUserPosts(req.params.id)
  res.status(200).json(posts);
});

router.post('/:id/posts', validateUserId, validatePost, async (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const post = await Post.insert({...req.body, user_id: req.params.id})
  res.status(201).json(post)
});

// do not forget to export the router
module.exports = router;