const express = require("express");
const router = express.Router();
const {
  getMediaByIdController,
  getAllMediaController,
  getMediaByEventIdController,
  getMediaByUserController,
  getMediaByOtherUsersController,
} = require("../controllers/media_controller");

function MediaRouter(connection) {
  router.get("/all", getAllMediaController(connection));
  router.get("/:id", getMediaByIdController(connection));
  router.get("/event/:id", getMediaByEventIdController(connection));
  router.get("/shared/:email", getMediaByOtherUsersController(connection));
  router.get("/mine/:email", getMediaByUserController(connection));

  // console.log('events runs');
  return router;
}

module.exports = MediaRouter;
