// Get all events
const getAllEventsService = async (connection) => {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT e.*, ac.name AS social_cause, u.email AS organized_by
    FROM events e
    JOIN all_categories ac ON e.category_id = ac.id
    JOIN users u ON e.organizer = u.id

    `;
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
            console.log(insertParams);
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

// Get the total count of all events
const getEventCountService = async (connection) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT COUNT(*) AS total_events FROM events";
    connection.query(query, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0].total_events);
      }
    });
    console.log("get user count service running");
  });
};

// Get the total count of disabled events
const getEventCountDisabledService = async (connection) => {
  return new Promise((resolve, reject) => {
    const query =
      'SELECT COUNT(*) AS total_disabled_events FROM events WHERE del_flg = "Y"';
    connection.query(query, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0].total_disabled_events);
      }
    });
    // console.log('get disabled user count service running');
  });
};

// Get the total count of active events
const getEventCountActiveService = async (connection) => {
  return new Promise((resolve, reject) => {
    const query =
      'SELECT COUNT(*) AS total_not_disabled_events FROM events WHERE del_flg = "N"';
    connection.query(query, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0].total_not_disabled_events);
      }
    });
    // console.log('get active user count service running');
  });
};

// Disable viewing of event by ID
const disableEventService = async (connection, eventId) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE events SET del_flg = "Y" WHERE id = ?';
    connection.query(query, [eventId], (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
    console.log("disable event service running");
  });
};

// Enable events to be viewed
const enableEventService = async (connection, eventId) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE events SET del_flg = "N" WHERE id = ?';
    connection.query(query, [eventId], (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
    console.log("enable event service running");
  });
};



module.exports = {
  getAllEventsService,
  getEventByIdService,
  getEventsByCategoryService,
  createEventService,
  getAllCategoriesService,
  cancelEventService,
  getEventCountDisabledService,
  getEventCountActiveService,
  getEventCountService,
  enableEventService,
  disableEventService,
};
