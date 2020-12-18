const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const activitySchema = mongoose.Schema(
  {
    discordUserId: {
      type: String,
      index: true,
      required: true,
    },
    guilds: {
      type: [String],
      index: true,
      required: true,
    },
    start: {
      type: Date,
      required: true,
    },
    stop: {
      type: Date,
      required: true,
    },
    gameId: {
      type: String,
      index: true,
      required: false,
    },
    verified: {
      type: Boolean,
      index: true,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
activitySchema.plugin(toJSON);
activitySchema.plugin(paginate);

/**
 * @typedef Activity
 */
const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
