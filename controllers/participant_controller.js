const participantService = require('../services/participant_service');

// Get all participants
const getAllParticipantsController = (connection) => async (req, res) => {
  try {
    const participants = await participantService.getAllParticipantsService(
      connection
    );
    res.status(200).json(participants);
    console.log('Get all participants controller running');
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error retrieving participants',
    });
  }
};

// Get specific participant by ID
const getParticipantByIdController = (connection) => async (req, res) => {
  try {
    const participantId = req.params.id;
    const participant = await participantService.getParticipantByIdService(
      connection,
      participantId
    );
    if (participant) {
      res.status(200).json(participant);
      console.log('Get participant by ID controller running');
    } else {
      res.status(404).json({
        message: 'Participant not found',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error retrieving participant',
    });
  }
};

// Create a new participant
const createParticipantController = (connection) => async (req, res) => {
  try {
    const { participant_name, mobile_number } = req.body;
    const participantData = {
      participant_name,
      mobile_number,
    };

    const result = await participantService.createParticipantService(
      connection,
      participantData
    );
    res.status(201).json({
      message: 'Participant created',
      participantId: result.insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error creating participant',
    });
  }
};

module.exports = {
  getAllParticipantsController,
  getParticipantByIdController,
  createParticipantController,
};
