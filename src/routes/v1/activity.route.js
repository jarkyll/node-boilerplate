const express = require('express');
const validate = require('../../middlewares/validate');
const activityValidation = require('../../validations/activity.validation');
const activityController = require('../../controllers/activity.controller');

const router = express.Router();

router
  .route('')
  .post(validate(activityValidation.createActivity), activityController.createActivity)
  .get(validate(activityValidation.getActivities), activityController.getActivities);

router
  .route('/:activityId')
  .get(validate(activityValidation.getActivity), activityController.getActivity)
  .patch(validate(activityValidation.updateActivity), activityController.updateActivity)
  .delete(validate(activityValidation.deleteActivity), activityController.deleteActivity);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Activity
 *   description: Activity management and retrieval
 */

/**
 * @swagger
 * path:
 *  /activities:
 *    post:
 *      summary: Create a activity
 *      description: Only admins can create other activities.
 *      tags: [Activities]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - discordUserId
 *                - discordGuildId
 *                - startTimestamp
 *              optional:
 *                - discordGameId
 *                - gameIcon
 *              properties:
 *                discordUserId:
 *                  type: string
 *                  description: Discord Id for the User
 *                discordGuildId:
 *                  type: string
 *                  description: Discord Id for the guild/server
 *                startTimestamp:
 *                  type: number
 *                  description: Starting timestamp for the Activity
 *                discordGameId:
 *                  type: string
 *                  description: Discord Id for the Game if it exists
 *                gameIcon:
 *                  type: string
 *                  description: URL for the Game if it exists
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Activity'
 *
 *    get:
 *      summary: Get all Activities
 *      tags: [Activities]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - in: query
 *          name: users
 *          schema:
 *            type: [objectID]
 *          description: list of User ids
 *        - in: query
 *          name: games
 *          schema:
 *            type: [objectID]
 *          description: list of Game ids
 *        - in: query
 *          name: guilds
 *          schema:
 *            type: [string]
 *          description: list of Discord guild ids
 *        - in: query
 *          name: sortBy
 *          schema:
 *            type: string
 *          description: sort by query in the form of field:desc/asc (ex. name:asc)
 *        - in: query
 *          name: limit
 *          schema:
 *            type: integer
 *            minimum: 1
 *          default: 10
 *          description: Maximum number of Activities
 *        - in: query
 *          name: page
 *          schema:
 *            type: integer
 *            minimum: 1
 *            default: 1
 *          description: Page number
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  results:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Activity'
 *                  page:
 *                    type: integer
 *                    example: 1
 *                  limit:
 *                    type: integer
 *                    example: 10
 *                  totalPages:
 *                    type: integer
 *                    example: 1
 *                  totalResults:
 *                    type: integer
 *                    example: 1
 */

/**
 * @swagger
 * path:
 *  /activities/{id}:
 *    get:
 *      summary: Get an activity
 *      tags: [Activities]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Activity id
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Activity'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 *    patch:
 *      summary: Update an activity
 *      tags: [Activities]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Activity id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                discordUserId:
 *                  type: string
 *                discordGuildId:
 *                  type: string
 *                gameId:
 *                  type: string
 *                verified:
 *                  type: boolean
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Activity'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 *    delete:
 *      summary: Delete an activity
 *      tags: [Activities]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Activity id
 *      responses:
 *        "200":
 *          description: No content
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 */
