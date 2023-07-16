// Create a new participant
const createParticipantService = async (connection, participantData) => {
    return new Promise((resolve, reject) => {
      const { participant_name, mobile_number } = participantData;
  
      const insertQuery = "INSERT INTO participants (participant_name, mobile_number) VALUES (?, ?)";
      const insertParams = [participant_name, mobile_number];
      
      connection.query(insertQuery, insertParams, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  };
  
  
  module.exports = {
    createParticipantService,
  };