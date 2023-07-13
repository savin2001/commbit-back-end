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
  getUserListActiveController,
  loginUserController
} = require('../controllers/user_controller');

function UserRouter(connection) {
  router.get('/all', getAllUsersController(connection));
  router.get('/user', getUserServiceByIdController(connection));
  router.post('/login', loginUserController(connection));
  router.post('/post', postUserServiceController(connection));
  router.put('/update', updateUserServiceController(connection));
  router.put('/disable', disableUserServiceController(connection));
  router.put('/enable', enableUserServiceController(connection));
  router.get('/count', getUserCountController(connection));
  router.get('/disable', getUserListDisabledController(connection));
  router.get('/active', getUserListActiveController(connection));

  // console.log('user runs');
  return router;
}

module.exports = UserRouter;
