const { Schema, model } = require('mongoose');

const TokenSchema = new Schema({
  userId: { type: Schema.Types.ObjectId },
  refreshToken: { type: String },
});

module.exports = model('Token', TokenSchema);
