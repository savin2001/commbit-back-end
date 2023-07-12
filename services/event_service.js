// Get all events
const getAllEventsService = async (connection) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM events";
    connection.query(query, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
    console.log("get all events service running");
  });
};

//   Get one event
const getEventByIdService = async (connection, eventId) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM events WHERE id = ?";
    connection.query(query, [eventId], (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0]);
      }
    });
    console.log("get event by ID service running");
  });
};

//   Get events by category
const getEventsByCategoryService = async (connection, categoryId) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM events WHERE category_id = ?";
    connection.query(query, [categoryId], (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
    console.log("get events by category service running");
  });
};

// Create a new event
const createEventService = async (connection, eventData) => {
  return new Promise((resolve, reject) => {
    const {
      category_id,
      title,
      description,
      location,
      start_date,
      end_date,
      start_time,
      end_time,
      organizer_email,
    } = eventData;

    const organizerQuery = "SELECT id FROM users WHERE email = ?";
    connection.query(
      organizerQuery,
      [organizer_email],
      (organizerError, organizerResults) => {
        if (organizerError) {
          reject(organizerError);
        } else {
          if (organizerResults.length === 0) {
            reject(new Error("Organizer not found"));
          } else {
            const organizerId = organizerResults[0].id;
            const insertQuery =
              "INSERT INTO events (category_id, title, description, location, start_date, end_date, start_time, end_time, organizer) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
            const insertParams = [
              category_id,
              title,
              description,
              location,
              start_date,
              end_date,
              start_time,
              end_time,
              organizerId,
            ];

            connection.query(
              insertQuery,
              insertParams,
              (insertError, insertResults) => {
                if (insertError) {
                  reject(insertError);
                } else {
                  resolve(insertResults);
                }
              }
            );
          }
        }
      }
    );
  });
};

// Get all event categories
const getAllCategoriesService = async (connection) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM all_categories";
    connection.query(query, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
    console.log("get all categories service running");
  });
};

// Cancelling events
const cancelEventService = async (connection, eventId) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE events SET del_flg = "Y" WHERE id = ?';
    connection.query(query, [eventId], (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
    console.log("cancel event service running");
  });
};

module.exports = {
  getAllEventsService,
  getEventByIdService,
  getEventsByCategoryService,
  createEventService,
  getAllCategoriesService,
  cancelEventService,
};
