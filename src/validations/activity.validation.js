const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createActivity = {
  body: Joi.object().keys({
    discordUserId: Joi.string().required(),
    discordGuildId: Joi.string().required(),
    startTimestamp: Joi.number().required(),
    gameIcon: Joi.string(),
    discordGameId: Joi.string(),
  }),
};

const getActivities = {
  query: Joi.object().keys({
    users: Joi.array().items(Joi.string()),
    games: Joi.array().items(Joi.string().custom(objectId)),
    guilds: Joi.array().items(Joi.string()),
    start: Joi.number(),
    stop: Joi.number(),
  }),
};

const getActivity = {
  params: Joi.object().keys({
    activityId: Joi.string().custom(objectId),
  }),
};

const updateActivity = {
  params: Joi.object().keys({
    activityId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      discordUserId: Joi.string(),
      discordGuildId: Joi.string(),
      gameId: Joi.string(),
      verified: Joi.boolean(),
    })
    .min(1),
};

const deleteActivity = {
  params: Joi.object().keys({
    activityId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createActivity,
  getActivities,
  getActivity,
  updateActivity,
  deleteActivity,
};
