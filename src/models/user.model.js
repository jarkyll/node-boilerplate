const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const userSchema = mongoose.Schema(
  {
    discordId: {
      type: String,
      index: true,
      required: true,
    },
    aliases: {
      type: [String],
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema);

module.exports = User;
