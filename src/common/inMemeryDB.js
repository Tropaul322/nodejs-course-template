const User = require('./../resources/users/user.model');
const DB = [];

DB.push(new User({ id: '1' }), new User(), new User());

module.exports = DB;
