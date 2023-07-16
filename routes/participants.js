const express = require("express");
const router = express.Router();
const {
  createParticipantController,
} = require("../controllers/participant_controller");

function ParticipantRouter(connection) {
  router.post("/new", createParticipantController(connection));

  // console.log('participants runs');
  return router;
}

module.exports = ParticipantRouter;
