const httpStatus = require('http-status');
const { Activity } = require('../models');
const gameService = require('./game.service');
const ApiError = require('../utils/ApiError');

/**
 * Get Activity by discordUserId and gameId
 * @param {string} discordUserId
 * @param {string} gameId
 * @returns {Promise<Activity>}
 */
const getActivityByUserAndGame = async (discordUserId, gameId) => {
  return Activity.findOne({ discordUserId, gameId });
};

/**
 * Query for activities
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryActivities = async (filter, options) => {
  const activities = await Activity.paginate(filter, options);
  return activities;
};

/**
 * Create an activity
 * @param {Object} activityBody
 * @returns {Promise<Activity>}
 */
const createActivity = async (activityBody) => {
  const game = await gameService.getOrCreateGame(activityBody.discordGameId, activityBody.gameName, activityBody.gameIcon);

  // TODO make the logic to find an activity and append the guildId if it isn't in the guilds array to be atomic
  const activity = await getActivityByUserAndGame(activityBody.discordUserId, game.id);

  activity.guilds.addToSet(activityBody.discordGuildId);
  activity.verified = !!game.gameId;

  await activity.save();
  return activity;
};

/**
 * Get activity by id
 * @param {ObjectId} id
 * @returns {Promise<Activity>}
 */
const getActivityById = async (id) => {
  return Activity.findById(id);
};

/**
 * Update activity by id
 * @param {ObjectId} activityId
 * @param {Object} updateBody
 * @returns {Promise<Activity>}
 */
const updateActivityById = async (activityId, updateBody) => {
  const activity = await getActivityById(activityId);
  if (!activity) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Activity not found');
  }
  Object.assign(activity, updateBody);
  await activity.save();
  return activity;
};

/**
 * Delete activity by id
 * @param {ObjectId} activityId
 * @returns {Promise<User>}
 */
const deleteActivityById = async (activityId) => {
  const activity = await getActivityById(activityId);
  if (!activity) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Activity not found');
  }
  await activity.remove();
  return activity;
};

module.exports = {
  getActivityByUserAndGame,
  queryActivities,
  createActivity,
  getActivityById,
  updateActivityById,
  deleteActivityById,
};
