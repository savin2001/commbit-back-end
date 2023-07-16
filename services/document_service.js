// Getting all documents in the system
const getAllDocumentsService = async (connection) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT d.*, u.email as user_email, ds.name AS document_group
    FROM documents d
    JOIN users u ON d.uploaded_by = u.id
    JOIN document_subcategories ds ON d.subcategory_id = ds.id
    `;
    connection.query(query, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
    // console.log("Get all documents service running");
  });
};

// Getting individual documents using their id
const getDocumentByIdService = async (connection, documentId) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM documents WHERE id = ?";
    connection.query(query, [documentId], (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        if (results.length === 0) {
          resolve(null); // Document not found
        } else {
          resolve(results[0]);
        }
      }
    });
    // console.log("Get document by ID service running");
  });
};

// Documents that belong to the user
const getUserDocumentsService = async (connection, userEmail) => {
  return new Promise((resolve, reject) => {
    const query =
      "SELECT * FROM documents WHERE uploaded_by = (SELECT id FROM users WHERE email = ?)";
    connection.query(query, [userEmail], (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
    console.log("Get user documents service running");
  });
};

// Get the total count of all documents
const getDocCountService = async (connection) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT COUNT(*) AS total_docs FROM documents";
    connection.query(query, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0].total_docs);
      }
    });
    console.log('get user count service running');
  });
};

// Get the total count of disabled documents
const getDocCountDisabledService = async (connection) => {
  return new Promise((resolve, reject) => {
    const query =
      'SELECT COUNT(*) AS total_disabled_docs FROM documents WHERE del_flg = "Y"';
    connection.query(query, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0].total_disabled_docs);
      }
    });
    // console.log('get disabled user count service running');
  });
};

// Get the total count of active documents
const getDocCountActiveService = async (connection) => {
  return new Promise((resolve, reject) => {
    const query =
      'SELECT COUNT(*) AS total_not_disabled_docs FROM documents WHERE del_flg = "N"';
    connection.query(query, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0].total_not_disabled_docs);
      }
    });
    // console.log('get active user count service running');
  });
};

// Documents shared by other users
const getOtherUserDocumentsService = async (connection, userEmail) => {
  return new Promise((resolve, reject) => {
    const query =
      "SELECT * FROM documents WHERE uploaded_by != (SELECT id FROM users WHERE email = ?)";
    connection.query(query, [userEmail], (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
    console.log("Get other user documents service running");
  });
};

//   Fetching by sub-categories
const getDocumentsBySubcategoryService = async (connection, subcategoryId) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM documents WHERE subcategory_id = ?";
    connection.query(query, [subcategoryId], (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
    console.log("Get documents by subcategory service running");
  });
};

//   Fetching subcategories
const getAllSubcategoriesByCategoryService = async (connection, categoryId) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM document_subcategories WHERE category_id = ?";
    connection.query(query, [categoryId], (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
    console.log("Get all subcategories by category service running");
  });
};

//   Fetching categories
const getAllDocumentCategoriesService = async (connection) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM document_categories";
    connection.query(query, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
    console.log("Get all document categories service running");
  });
};

// Uploading a new document
const createDocumentService = async (connection, document) => {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO documents (subcategory_id, filename, file_url, file_size, uploaded_by) VALUES (?, ?, ?, ?, ?)";
    const { subcategory_id, filename, file_url, file_size, email } = document;
    const selectQuery = "SELECT id FROM users WHERE email = ?";

    connection.query(selectQuery, [email], (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        if (results.length === 0) {
          reject(new Error("Invalid email"));
        } else {
          const uploadedBy = results[0].id;

          connection.query(
            query,
            [subcategory_id, filename, file_url, file_size, uploadedBy],
            (error, results, fields) => {
              if (error) {
                reject(error);
              } else {
                resolve(results);
              }
            }
          );
        }
      }
    });
    console.log("Create document service running");
  });
};

// Disable viewing of document by ID
const disableDocumentService = async (connection, documentId) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE documents SET del_flg = "Y" WHERE id = ?';
    connection.query(query, [documentId], (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
    console.log("disable document service running");
  });
};

// Enable documents to be viewed
const enableDocumentService = async (connection, documentId) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE documents SET del_flg = "N" WHERE id = ?';
    connection.query(query, [documentId], (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
    console.log("enable document service running");
  });
};

module.exports = {
  getAllDocumentsService,
  getDocumentByIdService,
  getUserDocumentsService,
  getOtherUserDocumentsService,
  getDocumentsBySubcategoryService,
  getAllDocumentCategoriesService,
  getAllSubcategoriesByCategoryService,
  createDocumentService,
  disableDocumentService,
  enableDocumentService,
  getDocCountActiveService,
  getDocCountDisabledService,
  getDocCountService,
};
