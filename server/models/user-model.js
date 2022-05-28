const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isActivatedAccount: { type: Boolean, default: false },
});

module.exports = model('User', UserSchema);
