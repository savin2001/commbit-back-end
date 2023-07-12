const express = require('express');
const router = express.Router();
const {
  getAllDocumentsController,
  getDocumentByIdController,
  getUserDocumentsController,
  getOtherUserDocumentsController,
  getDocumentsBySubcategoryController,
  getAllDocumentCategoriesController,
  getAllSubcategoriesByCategoryController,
  createDocumentController,
  disableDocumentController,
  enableDocumentController,
} = require('../controllers/document_controller');

function DocumentRouter(connection) {
  router.get('/all', getAllDocumentsController(connection));
  router.get('/doc/:id', getDocumentByIdController(connection));
  router.get('/mine', getUserDocumentsController(connection));
  router.get('/shared', getOtherUserDocumentsController(connection));
  router.get('/subcategory/:subcategoryId', getDocumentsBySubcategoryController(connection));
  router.get('/subcategories/:categoryId', getAllSubcategoriesByCategoryController(connection));
  router.get('/categories', getAllDocumentCategoriesController(connection));
  router.post('/upload', createDocumentController(connection));
  router.put('/archive/:id', disableDocumentController(connection));
  router.put('/enable/:id', enableDocumentController(connection));
  
  // console.log('docs runs');
  return router;
}

module.exports = DocumentRouter;
