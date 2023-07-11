const express = require('express');
const router = express.Router();
const {
  getAllUsersController,
  getUserServiceByIdController,
  postUserServiceController,
  updateUserServiceController,
  disableUserServiceController,
  enableUserServiceController,
  getUserCountController,
  getUserListDisabledController,
  getUserListActiveController
} = require('../controllers/user_controller');

function UserRouter(connection) {
  router.get('/all', getAllUsersController(connection));
  router.get('/user/:id', getUserServiceByIdController(connection));
  router.post('/post', postUserServiceController(connection));
  router.put('/update/:id', updateUserServiceController(connection));
  router.put('/disable', disableUserServiceController(connection));
  router.put('/enable', enableUserServiceController(connection));
  router.get('/count', getUserCountController(connection));
  router.get('/disabled', getUserListDisabledController(connection));
  router.get('/active', getUserListActiveController(connection));

  // console.log('user runs');
  return router;
}

module.exports = UserRouter;
