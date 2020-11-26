const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { activityService } = require('../services');

const createActivity = catchAsync(async (req, res) => {
  const activity = await activityService.createActivity(req.body);
  if (!activity) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, httpStatus[httpStatus.INTERNAL_SERVER_ERROR]);
  }
  res.status(httpStatus.CREATED).send(activity);
});

const getActivities = catchAsync(async (req, res) => {
  // const filter = // pick logic
  // const options = // pick logic
  // const result = await activityService.queryActivities(filter, options);
  res.send({});
});

const getActivity = catchAsync(async (req, res) => {
  const user = await activityService.getActivityById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateActivity = catchAsync(async (req, res) => {
  const user = await activityService.updateActivityById(req.params.userId, req.body);
  res.send(user);
});

const deleteActivity = catchAsync(async (req, res) => {
  await activityService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createActivity,
  getActivities,
  getActivity,
  updateActivity,
  deleteActivity,
};
