const httpStatus = require('http-status');
const { Game } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a game
 * @param {Object} gameBody
 * @returns {Promise<Game>}
 */
const createGame = async (gameBody) => {
  const gameModel = {
    discordId: gameBody.discordId,
    aliases: [gameBody.game],
    icon: gameBody.gameIcon,
  };
  const game = await Game.create(gameModel);
  return game;
};

/**
 * Get or create a game
 * @param {string} discordGameId
 * @param {string} gameName
 * @param {string} gameIcon
 * @returns {Promise<Game>}
 */
const getOrCreateGame = async (discordGameId, gameName, gameIcon) => {
  const gameModel = {
    aliases: [gameName],
    icon: gameIcon,
  };
  const game = await Game.findOrCreate({ discordId: discordGameId }, gameModel);
  return game.doc;
};

/**
 * Query for games
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryGames = async (filter, options) => {
  const games = await Game.paginate(filter, options);
  return games;
};

/**
 * Get game by id
 * @param {ObjectId} id
 * @returns {Promise<Game>}
 */
const getGameById = async (id) => {
  return Game.findById(id);
};

/**
 * Update game by id
 * @param {ObjectId} gameId
 * @param {Object} updateBody
 * @returns {Promise<Game>}
 */
const updateGameById = async (gameId, updateBody) => {
  const game = await getGameById(gameId);
  if (!game) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Game not found');
  }
  Object.assign(game, updateBody);
  await game.save();
  return game;
};

/**
 * Delete game by id
 * @param {ObjectId} gameId
 * @returns {Promise<Game>}
 */
const deleteGameById = async (gameId) => {
  const game = await getGameById(gameId);
  if (!game) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Game not found');
  }
  await game.remove();
  return game;
};

module.exports = {
  createGame,
  getOrCreateGame,
  queryGames,
  getGameById,
  updateGameById,
  deleteGameById,
};
