// Getting all documents in the system
const getAllDocumentsService = async (connection) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT d.id, d.filename, u.first_name as uploaded_by, u.email as user_email, d.created_at, d.del_flg as deleted,
    ds.name AS document_group
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
    const query = `
    SELECT d.id, d.filename, u.first_name as uploaded_by, u.email as user_email, d.created_at, d.del_flg as deleted,
        ds.name AS document_group
    FROM documents d
    JOIN users u ON d.uploaded_by = u.id
    JOIN document_subcategories ds ON d.subcategory_id = ds.id
    WHERE u.email = ?;
`;

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
    console.log("get user count service running");
  });
};

// Get the total count of shared documents
const getDocCountSharedService = async (connection, userEmail) => {
  return new Promise((resolve, reject) => {
    const query =
      "SELECT count(*) AS shared_docs FROM documents WHERE uploaded_by != (SELECT id FROM users WHERE email = ?)";
    connection.query(query, [userEmail], (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0].shared_docs);
      }
    });
    console.log("get shared docs count service running");
  });
};

// Get the total count of my documents
const getDocCountMyService = async (connection, userEmail) => {
  return new Promise((resolve, reject) => {
    const query =
      "SELECT COUNT(*) AS my_docs FROM documents WHERE uploaded_by = (SELECT id FROM users WHERE email = ?)";
    connection.query(query, [userEmail], (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0].my_docs);
      }
    });
    console.log("get my docs count service running");
  });
};

// Documents shared by other users
const getOtherUserDocumentsService = async (connection, userEmail) => {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT d.id, d.filename, u.first_name as uploaded_by, u.email as user_email, d.created_at, d.del_flg as deleted,
        ds.name AS document_group
    FROM documents d
    JOIN users u ON d.uploaded_by = u.id
    JOIN document_subcategories ds ON d.subcategory_id = ds.id
    WHERE u.email != ?;
`;
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
const getDocumentsBySubcategoryService = async (
  connection,
  subcategoryName
) => {
  return new Promise((resolve, reject) => {
    console.log(subcategoryName);
    const query = `
  SELECT d.id, d.filename, u.first_name as uploaded_by, u.email as user_email, d.created_at, d.del_flg as deleted, ds.name AS document_group
  FROM documents d
  JOIN users u ON d.uploaded_by = u.id
  JOIN document_subcategories ds ON d.subcategory_id = ds.id
  WHERE d.subcategory_id = (SELECT id FROM document_subcategories WHERE name = ?);
`;

    connection.query(query, [subcategoryName], (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
    console.log("Get documents by subcategory service running");
  });
};

//   Fetching by sub-categories
const getDocumentSubcategoriesWithDocumentsService = async (connection) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT ds.id AS subcategory_id, ds.name AS document_subcategory_name, COUNT(d.id) AS document_count
      FROM document_subcategories ds
      LEFT JOIN documents d ON ds.id = d.subcategory_id
      GROUP BY ds.id, ds.name
      HAVING COUNT(d.id) >= 1;
    `;

    connection.query(query, (error, results, fields) => {
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
const getAllSubcategoriesByCategoryService = async (
  connection,
  categoryName
) => {
  return new Promise((resolve, reject) => {
    const query =
      "SELECT * FROM document_subcategories WHERE category_id = (SELECT id FROM document_categories WHERE name = ?)";
    connection.query(query, [categoryName], (error, results, fields) => {
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

    const { subcategory_name, filename, file_url, file_size, email } = document;
    const selectUserQuery = "SELECT id FROM users WHERE email = ?";
    const selectSubcategoryQuery =
      "SELECT id FROM document_subcategories WHERE name = ?";

    // Fetch user ID based on the provided email
    connection.query(selectUserQuery, [email], (error, userResults, fields) => {
      if (error) {
        reject(error);
      } else {
        if (userResults.length === 0) {
          reject(new Error("Invalid email"));
        } else {
          const uploadedBy = userResults[0].id;

          // Fetch subcategory ID based on the provided subcategory_name
          connection.query(
            selectSubcategoryQuery,
            [subcategory_name],
            (error, subcategoryResults, fields) => {
              if (error) {
                reject(error);
              } else {
                if (subcategoryResults.length === 0) {
                  reject(new Error("Invalid subcategory"));
                } else {
                  const subcategoryId = subcategoryResults[0].id;

                  // Insert the document record with the fetched IDs
                  connection.query(
                    query,
                    [subcategoryId, filename, file_url, file_size, uploadedBy],
                    (error, insertResults, fields) => {
                      if (error) {
                        reject(error);
                      } else {
                        resolve(insertResults);
                      }
                    }
                  );
                }
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
  getDocumentSubcategoriesWithDocumentsService,
  getAllDocumentCategoriesService,
  getAllSubcategoriesByCategoryService,
  createDocumentService,
  disableDocumentService,
  enableDocumentService,
  getDocCountMyService,
  getDocCountSharedService,
  getDocCountService,
};
