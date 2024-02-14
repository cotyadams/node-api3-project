const express = require('express');
const {logger, validateUserId, validateUser, validatePost} = require('./middleware/middleware');
const server = express();

// imports the router from users-router.js
const usersRouter = require('./users/users-router.js');

// allows server to parse JSON data globally
server.use(express.json());
// global middlewares and the user's router need to be connected here
server.use(logger);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
