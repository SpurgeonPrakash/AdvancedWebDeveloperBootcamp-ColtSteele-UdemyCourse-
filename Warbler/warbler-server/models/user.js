//mongoose -> ODM
const mongoose =require('mongoose');
//bcrypt for password hashing
const bcrypt = require('bcrypt');

//MONGOOSE SCHEMA -> USER
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: {type: String, required: true },
    profileImageUrl: {type: String }
  }
)

//MONGOOSE -> USER MODEL

const User = mongoose.model('User', userSchema);

module.exports = User
