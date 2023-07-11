// Retrieves all users from the database
const getAllUsersServices = async (connection) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users';
    connection.query(query, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
    // console.log('users select service running');
  });
};

// Retrieves a user by their ID from the database
const getUserServiceById = async (connection, serviceId) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE id = ?';
    connection.query(query, [serviceId], (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0]);
      }
    });
    // console.log('user select service running');
  });
};

// Creates a new user in the database
const postUserService = async (connection, service) => {
  return new Promise((resolve, reject) => {
    const { email, first_name, last_name, phone_number, user_type } = service;
    const selectQuery = 'SELECT id FROM user_role WHERE role_name = ?';

    connection.query(selectQuery, [user_type], (error, results, fields) => {
      if (error) {
        reject(error); // Reject with the SQL error object
      } else {
        if (results.length === 0) {
          reject(new Error('Invalid user_type'));
        } else {
          const roleId = results[0].id;
          const insertQuery = 'INSERT INTO users (email, first_name, last_name, phone_number, user_type) VALUES (?, ?, ?, ?, ?)';
          const insertParams = [email, first_name, last_name, phone_number, roleId];

          connection.query(insertQuery, insertParams, (error, results, fields) => {
            if (error) {
              reject(error); // Reject with the SQL error object
            } else {
              resolve(results);
            }
          });
        }
      }
    });
  });
};

// Updates a user's information based on their email
const updateUserService = async (connection, serviceEmail, updatedService) => {
  return new Promise((resolve, reject) => {
    const { first_name, last_name, phone_number } = updatedService;
    const updatedValues = { first_name, last_name, phone_number };

    const query = 'UPDATE users SET ? WHERE email = ?';
    connection.query(query, [updatedValues, serviceEmail], (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
    // // console.log('user update service running');
  });
};

// Disables a user by changing their 'del_flg' to 'Y'
const disableUserService = async (connection, serviceEmail) => {
  return new Promise((resolve, reject) => {
    const updatedValues = { del_flg: 'Y' };

    const query = 'UPDATE users SET ? WHERE email = ?';
    connection.query(query, [updatedValues, serviceEmail], (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
    // console.log('disable user service running');
  });
};

// Get the total count of all users
const getUserCountService = async (connection) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT COUNT(*) AS total_users FROM users';
    connection.query(query, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0].total_users);
      }
    });
    // console.log('get user count service running');
  });
};

// Get the total count of disabled users
const getUserCountDisabledService = async (connection) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT COUNT(*) AS total_disabled_users FROM users WHERE del_flg = "Y"';
    connection.query(query, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0].total_disabled_users);
      }
    });
    // console.log('get disabled user count service running');
  });
};

// Get the total count of active users
const getUserCountActiveService = async (connection) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT COUNT(*) AS total_not_disabled_users FROM users WHERE del_flg = "N"';
    connection.query(query, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0].total_not_disabled_users);
      }
    });
    // console.log('get active user count service running');
  });
};

// Get the list of disabled users
const getUserListDisabledService = async (connection) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE del_flg = "Y"';
    connection.query(query, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
    // console.log('get disabled user list service running');
  });
};

// Get the list of active users
const getUserListActiveService = async (connection) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE del_flg = "N"';
    connection.query(query, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
    // console.log('get active user list service running');
  });
};

// Service to enable a disabled user
const enableUserService = async (connection, serviceEmail) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE users SET del_flg = "N" WHERE email = ?';
    connection.query(query, [serviceEmail], (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
    // console.log('enable user service running');
  });
};


module.exports = {
  getAllUsersServices,
  getUserServiceById,
  postUserService,
  updateUserService,
  disableUserService,
  enableUserService,
  getUserCountService,
  getUserCountDisabledService,
  getUserCountActiveService,
  getUserListDisabledService,
  getUserListActiveService
};
