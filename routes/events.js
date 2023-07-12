const express = require("express");
const router = express.Router();
const {
  getAllEventsController,
  getEventByIdController,
  getEventsByCategoryController,
  createEventController,
  getAllCategoriesController,
  cancelEventController,
} = require("../controllers/event_controller");

function EventRouter(connection) {
  router.get("/all", getAllEventsController(connection));
  router.get("/event/:id", getEventByIdController(connection));
  router.get("/categories", getAllCategoriesController(connection));
  router.get("/category/:id", getEventsByCategoryController(connection));
  router.post("/new", createEventController(connection));
  router.put("/cancel/:id", cancelEventController(connection));

  // console.log('events runs');
  return router;
}

module.exports = EventRouter;
