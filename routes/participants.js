const express = require('express');
const router = express.Router();
const {
  getAllParticipantsController,
  getParticipantByIdController,
  createParticipantController,
} = require('../controllers/participant_controller');

function ParticipantsRouter(connection) {
  router.get('/all', getAllParticipantsController(connection));
  router.get('/participant/:id', getParticipantByIdController(connection));
  router.post('/new', createParticipantController(connection));

  return router;
}

module.exports = ParticipantsRouter;
