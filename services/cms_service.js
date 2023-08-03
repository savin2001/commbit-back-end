// Category services
const getAllCategoriesService = async (connection) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM all_categories";
    connection.query(query, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
    console.log("Get all categories service running");
  });
};

const getCategoryByIdService = async (connection, categoryId) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM all_categories WHERE id = ?";
    connection.query(query, [categoryId], (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0]);
      }
    });
    console.log("Get category by ID service running");
  });
};

const createCategoryService = async (connection, categoryData) => {
  return new Promise((resolve, reject) => {
    const { name, description } = categoryData;
    const query =
      "INSERT INTO all_categories (name, description) VALUES (?, ?)";
    const params = [name, description];
    connection.query(query, params, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
    console.log("Create category service running");
  });
};

// Content services
const getAllContentService = async (connection) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM content";
    connection.query(query, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
    console.log("Get all content service running");
  });
};

const getContentByIdService = async (connection, contentId) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM content WHERE id = ?";
    connection.query(query, [contentId], (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0]);
      }
    });
    console.log("Get content by ID service running");
  });
};

const createContentService = async (connection, contentData) => {
  return new Promise((resolve, reject) => {
    const { title, content, author_email, category_id } = contentData;

    // Fetch the author_id from the users table using the author_email
    const authorQuery = "SELECT id FROM users WHERE email = ?";
    connection.query(
      authorQuery,
      [author_email],
      (authorError, authorResults) => {
        if (authorError) {
          reject(authorError);
        } else {
          if (authorResults.length === 0) {
            reject(new Error("Author not found"));
          } else {
            const author_id = authorResults[0].id;

            // Insert content with the retrieved author_id
            const query =
              "INSERT INTO content (title, content, author_id, category_id) VALUES (?, ?, ?, ?)";
            const params = [title, content, author_id, category_id];

            connection.query(query, params, (error, results, fields) => {
              if (error) {
                reject(error);
              } else {
                resolve(results);
              }
            });
            console.log("Create content service running");
          }
        }
      }
    );
  });
};

// Get the total count of all events
const getContentCountService = async (connection) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT COUNT(*) AS total_content FROM content";
    connection.query(query, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0].total_content);
      }
    });
    console.log("get content count service running");
  });
};

module.exports = {
  getAllCategoriesService,
  getCategoryByIdService,
  createCategoryService,
  getAllContentService,
  getContentByIdService,
  createContentService,
  getContentCountService,
};
