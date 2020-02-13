const express = require('express');
const userRoutes = require('./users/user-router.js');
const session = require('express-session');

const server = express();
const port = 5010;

const sessionConfig = {
  name: "testName",
  secret: "my test secret",
  cookie: {
    maxAge: 1000 * 30,
    secure: false, // true in production
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: false, // Only true when user has opted in to having cookies tracked
}

server.use(express.json());
server.use(session(sessionConfig));
server.use('/api', userRoutes);

server.listen(port, () => console.log(`Server listening on port ${port}`))
