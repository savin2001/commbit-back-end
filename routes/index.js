const connection = require('../mysql_connection/sql');
const usersRouter = require('./users')(connection);
const documentsRouter = require('./documents')(connection);
const eventsRouter = require('./events')(connection);
const mediaRouter = require('./media')(connection);
const ParticipantRouter = require('./participants')(connection);
const CMSRouter = require('./content_managment')(connection);
const express = require("express");
const router = express.Router();

console.log("Routes running");
router.use("/users", usersRouter);
router.use("/docs", documentsRouter);
router.use("/events", eventsRouter);
router.use("/media", mediaRouter);
router.use("/participants", ParticipantRouter);
router.use("/cms", CMSRouter);

module.exports = router;
