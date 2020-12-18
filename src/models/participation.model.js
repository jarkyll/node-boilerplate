const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const participationSchema = mongoose.Schema(
  {
    discordId: {
      type: String,
      index: true,
      required: true,
    },
    optIn: {
      type: Date,
      required: true,
    },
    optOut: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
participationSchema.plugin(toJSON);

/**
 * @typedef Participation
 */
const Participation = mongoose.model('Participation', participationSchema);

module.exports = Participation;
