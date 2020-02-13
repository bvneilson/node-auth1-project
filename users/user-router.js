const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();
const db = require('./user-model.js');

router.post('/register', validation, (req, res) => {
  const credentials = req.body;
  const hash = bcrypt.hashSync(credentials.password, 14);
  credentials.password = hash;

  db.register(req.body).then(response => {
    res.status(200).json({response: response});
  }).catch(err => {
    res.status(500).json({message: "Could not register user"});
  })
});

router.post('/login', validation, (req, res) => {
  const credentials = req.body;

  db.login(req.body).first().then(user => {
    if (!user || !bcrypt.compareSync(credentials.password, user.password)) {
      res.status(401).json({error: 'Incorrect credentials'});
    } else {
      res.status(200).json({messages: `Welcome ${user.username}!`});
    }
  }).catch(err => {
    res.status(500).json({message: "Could not log in user"});
  })
});

router.get('/users', restricted, (req, res) => {
  db.getUsers().then(response => {
    res.status(200).json({users: response});
  }).catch(err => {
    res.status(500).json({message: "Could not get users"});
  })
});

//Middleware

function validation(req, res, next) {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({error: 'Must provide username and password'});
  } else {
    next();
  }
};

function restricted(req, res, next) {
  const { username, password } = req.headers;

  if (username && password) {
    db.findUser({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          next();
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      })
      .catch(error => {
        res.status(500).json({ message: 'Unexpected error' });
      });
  } else {
    res.status(400).json({ message: 'No credentials provided' });
  }
}

module.exports = router;
