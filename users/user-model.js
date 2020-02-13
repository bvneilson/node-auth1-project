const knex = require('knex');
const config = require('../knexfile.js');

const db = knex(config.development);

function register(user) {
  return db('users').insert(user);
}

function login(user) {
  return db('users').where('username', user.username).andWhere('password', user.password);
}

function getUsers(user) {
  return db('users');
}

module.exports = {
  register,
  login,
  getUsers
}
