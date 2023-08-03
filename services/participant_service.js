// Get all participants
const getAllParticipantsService = async (connection) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM participants';
    connection.query(query, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
    console.log('Get all participants service running');
  });
};

// Get specific participant by ID
const getParticipantByIdService = async (connection, participantId) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM participants WHERE participant_id = ?';
    connection.query(query, [participantId], (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0]);
      }
    });
    console.log('Get participant by ID service running');
  });
};

// Create a new participant
const createParticipantService = async (connection, participantData) => {
  return new Promise((resolve, reject) => {
    const { participant_name, mobile_number } = participantData;
    const query =
      'INSERT INTO participants (participant_name, mobile_number) VALUES (?, ?)';
    const params = [participant_name, mobile_number];
    connection.query(query, params, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
    console.log('Create participant service running');
  });
};

module.exports = {
  getAllParticipantsService,
  getParticipantByIdService,
  createParticipantService,
};
