const { Schema, model } = require('mongoose');

const LinkSchema = new Schema({
  userId: { type: Schema.Types.ObjectId },
  link: { type: String },
});

module.exports = model('Link', LinkSchema);
