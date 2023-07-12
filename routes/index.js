const connection = require('../mysql_connection/sql');
const usersRouter = require('./users')(connection);
const documentsRouter = require('./documents')(connection);
const eventsRouter = require('./events')(connection);
const mediaRouter = require('./media')(connection);
const express = require("express");
const router = express.Router();

console.log("Routes running");
router.use("/users", usersRouter);
router.use("/docs", documentsRouter);
router.use("/events", eventsRouter);
router.use("/media", mediaRouter);

module.exports = router;
