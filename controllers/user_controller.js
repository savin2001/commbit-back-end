const userService = require("../services/user_service");

const getAllUsersController = (connection) => async (req, res) => {
  try {
    const services = await userService.getAllUsersServices(connection);
    res.status(200).json(services);
    console.log("get all users controller running");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error retrieving user controllers",
    });
  }
};

const getUserServiceByIdController = (connection) => async (req, res) => {
  try {
    const serviceId = req.params.id;
    const service = await userService.getUserServiceById(connection, serviceId);
    res.status(200).json(service);
    console.log("get one user controller running");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error retrieving user controller",
    });
  }
};

const postUserServiceController = (connection) => async (req, res) => {
  try {
    const { name, description, category, price, image_url } = req.body;
    const newService = { name, description, category, price, image_url };
    const result = await userService.postUserService(connection, newService);
    res.status(201).json({
      message: "Web design service created",
      serviceId: result.insertId,
    });
    console.log("post user controller running");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error creating user controller",
    });
    console.log(req.body);
  }
};

const updateUserServiceController = (connection) => async (req, res) => {
  try {
    const serviceId = req.params.id;
    console.log("serviceId", serviceId);
    const { name, description, category, price, image_url } = req.body;
    const updatedService = { name, description, category, price, image_url };
    const result = await userService.updateUserService(
      connection,
      serviceId,
      updatedService
    );
    res.status(200).json({
      message: "Web design service updated",
      affectedRows: result.affectedRows,
    });
    console.log("update user controller running");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error updating user controller",
    });
    console.log(req.body);
  }
};

const deleteUserServiceController = (connection) => async (req, res) => {
  try {
    const serviceId = req.params.id;
    const result = await userService.deleteUserService(connection, serviceId);
    res.status(200).json({
      message: "Web design service deleted",
      affectedRows: result.affectedRows,
    });
    console.log("delete user controller running");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error deleting user controller",
    });
  }
};

module.exports = {
  getAllUsersController,
  getUserServiceByIdController,
  postUserServiceController,
  updateUserServiceController,
  deleteUserServiceController,
};
