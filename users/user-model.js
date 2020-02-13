const knex = require('knex');
const config = require('../knexfile.js');

const db = knex(config.development);

function register(user) {
  return db('users').insert(user);
}

function login(user) {
  return db('users').where('username', user.username);
}

function getUsers(user) {
  return db('users');
}

function findUser(username) {
  return db('users').where('username', username);
}

module.exports = {
  register,
  login,
  getUsers,
  findUser
}
