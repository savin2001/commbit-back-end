const userService = require("../services/user_service");

// Controller to get all users
const getAllUsersController = (connection) => async (req, res) => {
  try {
    const services = await userService.getAllUsersServices(connection);
    res.status(200).json(services);
    // console.log("get all users controller running");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error retrieving user controllers",
    });
  }
};

// Controller to get a user by ID
const getUserServiceByIdController = (connection) => async (req, res) => {
  try {
    const serviceId = req.params.id;
    const service = await userService.getUserServiceById(connection, serviceId);
    res.status(200).json(service);
    // console.log("get one user controller running");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error retrieving user controller",
    });
  }
};

// Controller to create a new user
const postUserServiceController = (connection) => async (req, res) => {
  try {
    const { email, first_name, last_name, phone_number, user_type } = req.body;
    const newService = {
      email,
      first_name,
      last_name,
      phone_number,
      user_type,
    };
    const result = await userService.postUserService(connection, newService);
    res.status(201).json({
      message: "User service created",
      serviceId: result.insertId,
    });
    // console.log("post user controller running");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error_code: error?.code,
      error_num: error?.errno,
      reason: error?.sqlMessage,
      message: "Failed to register user",
    });
    // console.log(req.body);
  }
};

// Controller to update a user
const updateUserServiceController = (connection) => async (req, res) => {
  try {
    const serviceEmail = req.body.email;
    // console.log("serviceEmail", serviceEmail);
    const { first_name, last_name, phone_number } = req.body;
    const updatedService = { first_name, last_name, phone_number };
    const result = await userService.updateUserService(
      connection,
      serviceEmail,
      updatedService
    );
    res.status(200).json({
      message: "User service updated",
      affectedRows: result.affectedRows,
    });
    // // console.log("update user controller running");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error_code: error?.code,
      error_num: error?.errno,
      reason: error?.sqlMessage,
      message: "Error updating user",
    });
    // // console.log(req.body);
  }
};

// Controller to disable a user
const disableUserServiceController = (connection) => async (req, res) => {
  try {
    const serviceEmail = req.body.email;
    // console.log("serviceEmail", serviceEmail);

    const result = await userService.disableUserService(
      connection,
      serviceEmail
    );
    res.status(200).json({
      message: "User disabled",
      affectedRows: result.affectedRows,
    });
    // console.log("disable user controller running");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error?.message,
      error_code: error?.code,
      error_num: error?.errno,
      reason: error?.sqlMessage,
      message: "Error disabling user",
    });
  }
};

// Controller to enable a disabled user
const enableUserServiceController = (connection) => async (req, res) => {
  try {
    const serviceEmail = req.body.email;
    // console.log("serviceEmail", serviceEmail);
    const result = await userService.enableUserService(
      connection,
      serviceEmail
    );
    res.status(200).json({
      message: "User enabled",
      affectedRows: result.affectedRows,
    });
    // console.log("enable user controller running");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error?.message,
      error_code: error?.code,
      error_num: error?.errno,
      reason: error?.sqlMessage,
      message: "Error enabling user",
    });
  }
};

// Controller to get user count
const getUserCountController = (connection) => async (req, res) => {
  try {
    const totalUsers = await userService.getUserCountService(connection);
    const totalDisabledUsers = await userService.getUserCountDisabledService(
      connection
    );
    const totalActiveUsers = await userService.getUserCountActiveService(
      connection
    );

    res.status(200).json({
      totalUsers,
      totalDisabledUsers,
      totalActiveUsers,
    });
    // console.log('get user count controller running');
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error?.message,
      error_code: error?.code,
      error_num: error?.errno,
      reason: error?.sqlMessage,
      message: "Error retrieving user count",
    });
  }
};

// Controller to get the list of disabled users
const getUserListDisabledController = (connection) => async (req, res) => {
  try {
    const userListDisabled = await userService.getUserListDisabledService(
      connection
    );
    res.status(200).json(userListDisabled);
    // console.log('get disabled user list controller running');
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error?.message,
      error_code: error?.code,
      error_num: error?.errno,
      reason: error?.sqlMessage,
      message: "Error retrieving disabled user list",
    });
  }
};

// Controller to get the list of active users
const getUserListActiveController = (connection) => async (req, res) => {
  try {
    const userListActive = await userService.getUserListActiveService(
      connection
    );
    res.status(200).json(userListActive);
    // console.log('get active user list controller running');
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error?.message,
      error_code: error?.code,
      error_num: error?.errno,
      reason: error?.sqlMessage,
      message: "Error retrieving active user list",
    });
  }
};

module.exports = {
  getAllUsersController,
  getUserServiceByIdController,
  postUserServiceController,
  updateUserServiceController,
  disableUserServiceController,
  enableUserServiceController,
  getUserCountController,
  getUserListDisabledController,
  getUserListActiveController,
};
