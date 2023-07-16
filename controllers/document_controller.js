const documentService = require("../services/document_service");

// Getting all documents from database
const getAllDocumentsController = (connection) => async (req, res) => {
  try {
    const documents = await documentService.getAllDocumentsService(connection);
    res.status(200).json(documents);
    // console.log('Get all documents controller running');
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error retrieving documents",
    });
  }
};

// Getting all documents from database
const getDocumentSubcategoriesWithDocumentsController =
  (connection) => async (req, res) => {
    try {
      const documents =
        await documentService.getDocumentSubcategoriesWithDocumentsService(
          connection
        );
      res.status(200).json(documents);
      // console.log('Get all documents controller running');
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Error retrieving documents",
      });
    }
  };

// Retrieve doc by ID
const getDocumentByIdController = (connection) => async (req, res) => {
  try {
    const documentId = req.params.id;
    const document = await documentService.getDocumentByIdService(
      connection,
      documentId
    );

    if (document === null) {
      res.status(404).json({
        message: "Document not found",
      });
    } else {
      res.status(200).json(document);
    }

    // console.log('Get document by ID controller running');
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error retrieving document",
    });
  }
};

// Get documents belonging to the user
const getUserDocumentsController = (connection) => async (req, res) => {
  try {
    const { email } = req.params;
    const documents = await documentService.getUserDocumentsService(
      connection,
      email
    );

    res.status(200).json(documents);

    console.log("Get user documents controller running");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error retrieving user documents",
    });
  }
};

// Controller to get docs count
const getDocCountController = (connection) => async (req, res) => {
  try {
    const { email } = req.params;
    const total = await documentService.getDocCountService(connection);
    const totalShared = await documentService.getDocCountSharedService(
      connection,
      email
    );
    const totalMine = await documentService.getDocCountMyService(
      connection,
      email
    );

    res.status(200).json({
      total,
      totalShared,
      totalMine,
    });

    console.log("get document count controller running");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error?.message,
      error_code: error?.code,
      error_num: error?.errno,
      reason: error?.sqlMessage,
      message: "Error retrieving user count",
    });
  }
};

// Shared by other users
const getOtherUserDocumentsController = (connection) => async (req, res) => {
  try {
    const { email } = req.params;
    console.log(email);
    const documents = await documentService.getOtherUserDocumentsService(
      connection,
      email
    );

    res.status(200).json(documents);

    console.log("Get other user documents controller running");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error retrieving other user documents",
    });
  }
};

// Getting documents by sub category
const getDocumentsBySubcategoryController =
  (connection) => async (req, res) => {
    try {
      const subcategoryName = req.params.subcategoryName;
      console.log(subcategoryName);
      const documents = await documentService.getDocumentsBySubcategoryService(
        connection,
        subcategoryName
      );

      res.status(200).json(documents);

      // console.log("Get documents by subcategory controller running");
    } catch (error) {
      console.error(error);
      console.error("error");
      res.status(500).json({
        message: "Error retrieving documents by subcategory",
      });
    }
  };

//   Getting document subcategories

const getAllSubcategoriesByCategoryController =
  (connection) => async (req, res) => {
    try {
      const categoryName = req.params.categoryName;
      const subcategories =
        await documentService.getAllSubcategoriesByCategoryService(
          connection,
          categoryName
        );

      res.status(200).json(subcategories);

      console.log("Get all subcategories by category controller running");
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Error retrieving subcategories",
      });
    }
  };

//   Getting document categories
const getAllDocumentCategoriesController = (connection) => async (req, res) => {
  try {
    const categories = await documentService.getAllDocumentCategoriesService(
      connection
    );

    res.status(200).json(categories);

    console.log("Get all document categories controller running");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error retrieving document categories",
    });
  }
};

// Uploading a new document
const createDocumentController = (connection) => async (req, res) => {
  try {
    const { subcategory_name, filename, file_url, file_size, email } = req.body;
    const document = { subcategory_name, filename, file_url, file_size, email };
    const result = await documentService.createDocumentService(
      connection,
      document
    );

    res.status(201).json({
      message: "Document created",
      documentId: result.insertId,
    });

    console.log("Create document controller running");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error creating document",
    });
  }
};

// Archiving/disabling document
const disableDocumentController = (connection) => async (req, res) => {
  try {
    const documentId = req.params.id;
    const result = await documentService.disableDocumentService(
      connection,
      documentId
    );
    res.status(200).json({
      message: "Document disabled",
      affectedRows: result.affectedRows,
    });
    console.log("disable document controller running");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error disabling document",
      error: error?.message,
    });
  }
};

// Enable document to be viewed
const enableDocumentController = (connection) => async (req, res) => {
  try {
    const documentId = req.params.id;
    const result = await documentService.enableDocumentService(
      connection,
      documentId
    );
    res.status(200).json({
      message: "Document enabled",
      affectedRows: result.affectedRows,
    });
    console.log("enable document controller running");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error enabling document",
      error: error?.message,
    });
  }
};

module.exports = {
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
  getDocCountController,
  getDocumentSubcategoriesWithDocumentsController,
};
