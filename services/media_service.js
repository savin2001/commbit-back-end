// Fetch all media
const getAllMedia = async (connection) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM media";
    connection.query(query, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
    console.log("Get all media service running");
  });
};

// Fetch specific media
const getMediaByIdService = async (connection, mediaId) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM media WHERE id = ?";
    connection.query(query, [mediaId], (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0]);
      }
    });
    console.log("get media by id service running");
  });
};

// Fetching media by event ID
const getMediaByEventId = async (connection, eventId) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM media WHERE event_id = ?";
    connection.query(query, [eventId], (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
    console.log("Get media by event_id service running");
  });
};

// Function to retrieve user_id based on email
const getUserIDByEmail = async (connection, userEmail) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT id FROM users WHERE email = ?";
    console.log("1");
    connection.query(query, [userEmail], (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0]?.id);
      }
    });
  });
};


// Service function to get media uploaded by other users
const getMediaByUserId = async (connection, userEmail) => {
  return new Promise((resolve, reject) => {
    const query =
      "SELECT * FROM media WHERE uploaded_by = (SELECT id FROM users WHERE email = ?)";
    connection.query(query, [userEmail], (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
    console.log("Get media by user_id service running");
  });
};

// Service function to get media uploaded by other users
const getMediaByOtherUsers = async (connection, userEmail) => {
  try {
    const userId = await getUserIDByEmail(connection, userEmail);
    console.log("3");
    if (userId) {
      const query = "SELECT * FROM media WHERE uploaded_by != ?";
      return new Promise((resolve, reject) => {
        connection.query(query, [userId], (error, results, fields) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getMediaByIdService,
  getAllMedia,
  getMediaByEventId,
  getMediaByUserId,
  getMediaByOtherUsers,
};
