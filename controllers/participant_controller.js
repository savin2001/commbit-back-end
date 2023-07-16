const participantService = require("../services/participant_service");

// Creating a new participant
const createParticipantController = (connection) => async (req, res) => {
    try {
      const { participant_name, mobile_number } = req.body;
      const participantData = {
        participant_name,
        mobile_number,
      };
  
      const result = await participantService.createParticipantService(connection, participantData);
      res.status(201).json({
        message: "Participant created",
        participantId: result.insertId,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Error creating participant",
      });
    }
  };

  
  module.exports = {
    createParticipantController,
  };