const express = require('express');
const activityRoute = require('./activity.route');
const docsRoute = require('./docs.route');

const router = express.Router();

router.use('/activities', activityRoute);
router.use('/docs', docsRoute);

module.exports = router;
