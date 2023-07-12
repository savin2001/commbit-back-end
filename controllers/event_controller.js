const eventService = require("../services/event_service");

const getAllEventsController = (connection) => async (req, res) => {
  try {
    const events = await eventService.getAllEventsService(connection);
    res.status(200).json(events);
    console.log("get all events controller running");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error retrieving events",
      error: error?.message,
    });
  }
};

// Get specific event
const getEventByIdController = (connection) => async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await eventService.getEventByIdService(connection, eventId);
    if (event) {
      res.status(200).json(event);
      console.log("get event by ID controller running");
    } else {
      res.status(404).json({
        message: "Event not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error retrieving event",
      error: error?.message,
    });
  }
};

// Events by category
const getEventsByCategoryController = (connection) => async (req, res) => {
  try {
    const categoryId = req.params.id;
    const events = await eventService.getEventsByCategoryService(
      connection,
      categoryId
    );
    res.status(200).json(events);
    // console.log('get events by category controller running');
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error retrieving events by category",
    });
  }
};

// Creating a new event
const createEventController = (connection) => async (req, res) => {
  try {
    const {
      category_id,
      title,
      description,
      location,
      start_date,
      end_date,
      start_time,
      end_time,
      organizer_email,
    } = req.body;
    const eventData = {
      category_id,
      title,
      description,
      location,
      start_date,
      end_date,
      start_time,
      end_time,
      organizer_email,
    };

    const result = await eventService.createEventService(connection, eventData);
    res.status(201).json({
      message: "Event created",
      eventId: result.insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error creating event",
    });
  }
};

// Fetching all categories of events
const getAllCategoriesController = (connection) => async (req, res) => {
  try {
    const categories = await eventService.getAllCategoriesService(connection);
    res.status(200).json(categories);
    // console.log('get all categories controller running');
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error retrieving categories",
    });
  }
};

// Event cancelling
const cancelEventController = (connection) => async (req, res) => {
  try {
    const eventId = req.params.id;
    const result = await eventService.cancelEventService(connection, eventId);
    res.status(200).json({
      message: "Event canceled",
      affectedRows: result.affectedRows,
    });
    // console.log('cancel event controller running');
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error canceling event",
    });
  }
};

module.exports = {
  getAllEventsController,
  getEventByIdController,
  getEventsByCategoryController,
  createEventController,
  getAllCategoriesController,
  cancelEventController,
};
