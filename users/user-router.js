const express = require('express');

const router = express.Router();
const db = require('./user-model.js');

router.post('/register', (req, res) => {
  db.register(req.body).then(response => {
    res.status(200).json({response: response});
  }).catch(err => {
    res.status(500).json({message: "Could not register user"});
  })
});

router.post('/login', (req, res) => {
  db.login(req.body).then(response => {
    res.status(200).json({response: response});
  }).catch(err => {
    res.status(500).json({message: "Could not log in user"});
  })
});

router.get('/users', (req, res) => {
  db.getUsers().then(response => {
    res.status(200).json({users: response});
  }).catch(err => {
    res.status(500).json({message: "Could not get users"});
  })
});

module.exports = router;
