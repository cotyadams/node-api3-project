const users = require('../../data/seeds/02-users');
const User = require('../users/users-model');
function logger(req, res, next) {
  // DO YOUR MAGIC
  console.table({
    method: req.method,
    URL: req.url,
    time: new Date().toLocaleString(),
  });
  next()
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  try {
    let user = await User.getById(req.params.id);
    if (!user) { 
      res.status(404).json({
        message: 'User not found',
      })
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    res.status(500).json({
      message: 'Error validating user id',
    })
  }
}


// `validateUser` validates the `body` on a request to create or update a user
// - if the request `body` lacks the required `name` field, respond with status `400` and `{ message: "missing required name field" }`
function validateUser(req, res, next) {
  // DO YOUR MAGIC
    if (!req.body.name) {
      res.status(400).json({
        message: "missing required name field"
      })
    } else next();
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  if (!req.body.text) {
    res.status(400).json({
      message: "missing required text field"
    })
  } else next();
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}