const connection = require('../mysql_connection/sql');
const usersRouter = require('./users')(connection);
const express = require("express");
const router = express.Router();

console.log("Routes running");
router.use("/users", usersRouter);

module.exports = router;
