const cmsService = require("../services/cms_service");

// Category controllers
const getAllCategoriesController = (connection) => async (req, res) => {
  try {
    const categories = await cmsService.getAllCategoriesService(connection);
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error retrieving categories",
    });
  }
};

const getCategoryByIdController = (connection) => async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await cmsService.getCategoryByIdService(
      connection,
      categoryId
    );
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({
        message: "Category not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error retrieving category",
    });
  }
};

const createCategoryController = (connection) => async (req, res) => {
  try {
    const { name, description } = req.body;
    const categoryData = {
      name,
      description,
    };

    const result = await cmsService.createCategoryService(
      connection,
      categoryData
    );
    res.status(201).json({
      message: "Category created",
      categoryId: result.insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error creating category",
    });
  }
};

// Content controllers
const getAllContentController = (connection) => async (req, res) => {
  try {
    const content = await cmsService.getAllContentService(connection);
    res.status(200).json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error retrieving content",
    });
  }
};

const getContentByIdController = (connection) => async (req, res) => {
  try {
    const contentId = req.params.id;
    const content = await cmsService.getContentByIdService(
      connection,
      contentId
    );
    if (content) {
      res.status(200).json(content);
    } else {
      res.status(404).json({
        message: "Content not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error retrieving content",
    });
  }
};

const createContentController = (connection) => async (req, res) => {
  try {
    const { title, content, author_email, published_at, category_id } =
      req.body;
    const contentData = {
      title,
      content,
      author_email,
      published_at,
      category_id,
    };

    const result = await cmsService.createContentService(
      connection,
      contentData
    );
    res.status(201).json({
      message: "Content created",
      contentId: result.insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error creating content",
    });
  }
};

// Controller to get events count
const getContentCountController = (connection) => async (req, res) => {
  try {
    const total = await cmsService.getContentCountService(connection);
    
    res.status(200).json({
      total,
    });
    // console.log('get user count controller running');
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

module.exports = {
  getAllCategoriesController,
  getCategoryByIdController,
  createCategoryController,
  getAllContentController,
  getContentByIdController,
  createContentController,
  getContentCountController,
};
