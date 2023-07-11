const express = require('express');
const router = express.Router();
const {
    getAllUsersController,
    getUserServiceByIdController,
    postUserServiceController,
    updateUserServiceController,
    deleteUserServiceController
} = require('../controllers/user_controller');

function UserRouter(connection) {

    router.get('/', getAllUsersController(connection));
    router.get('/:id', getUserServiceByIdController(connection));
    router.post('/post', postUserServiceController(connection));
    router.put('/update/:id', updateUserServiceController(connection));
    router.delete('/delete/:id', deleteUserServiceController(connection));

    console.log('user running')
    return router;
}

module.exports = UserRouter;