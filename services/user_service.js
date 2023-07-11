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
      console.log('users select service running')
    });
  };
  
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
      console.log('user select service running')
    });
  };
  
  const postUserService = async (connection, service) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO users SET ?';
      connection.query(query, service, (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
      console.log('user insert service running')
    });
  };
  
  const updateUserService = async (connection, serviceId, updatedService) => {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE users SET ? WHERE id = ?';
      connection.query(query, [updatedService, serviceId], (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
      console.log('user update  service running')
    });
  };
  
  const deleteUserService = async (connection, serviceId) => {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM users WHERE id = ?';
      connection.query(query, serviceId, (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
      console.log('user delete service running')
    });
  };
  
  module.exports = {
    getAllUsersServices,
    getUserServiceById,
    postUserService,
    updateUserService,
    deleteUserService
  };