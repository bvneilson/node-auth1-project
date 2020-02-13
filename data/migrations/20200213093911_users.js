
exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
    tbl.increments();
    tbl.text('username', 128);
    tbl.text('password', 256)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
