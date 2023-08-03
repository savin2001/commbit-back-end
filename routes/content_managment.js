const express = require("express");
const router = express.Router();
const {
  getAllCategoriesController,
  getCategoryByIdController,
  createCategoryController,
  getAllContentController,
  getContentByIdController,
  createContentController,
  getContentCountController,
} = require("../controllers/cms_controller");

function CMSRouter(connection) {
  // Category routes
  router.get("/categories/all", getAllCategoriesController(connection));
  router.get("/categories/:id", getCategoryByIdController(connection));
  router.post("/categories/new", createCategoryController(connection));

  // Content routes
  router.get("/content/all", getAllContentController(connection));
  router.get("/content/:id", getContentByIdController(connection));
  router.post("/content/new", createContentController(connection));
  router.get("/count", getContentCountController(connection));

  return router;
}

module.exports = CMSRouter;
