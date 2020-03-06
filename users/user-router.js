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
      req.session.user = user;
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

router.get('/logout', (req, res) => {
  if (req.session && req.session.user) {
    req.session.destroy(err => {
      if (err) {
        res.send('error logging out')
      } else {
        res.send('log out successful');
      }
    })
  } else {
    res.send('you never logged in');
  }
})

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

  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ message: 'You shall not pass!' });
  }
}

module.exports = router;
