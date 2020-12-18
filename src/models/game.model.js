const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
const { toJSON } = require('./plugins');

const gameSchema = mongoose.Schema(
  {
    discordId: {
      type: String,
      index: true,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    aliases: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
gameSchema.plugin(toJSON);
gameSchema.plugin(findOrCreate);

/**
 * Return a game with the given discord Id
 * @param {string} discordId - The game's discord Id
 * @returns {Promise<Game>}
 */
gameSchema.statics.getGameByDiscordId = async function (discordId) {
  const game = await this.findOne({ discordId });
  return game;
};

/**
 * @typedef Game
 */
const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
