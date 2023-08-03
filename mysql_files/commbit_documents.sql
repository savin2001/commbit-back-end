CREATE TABLE sys.document_categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50),
  description VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO sys.document_categories (name, description)
VALUES
  ('Financial Documents', 'Documents related to financial management and reporting.'),
  ('Proposals and Grants', 'Documents related to funding proposals and grant applications.'),
  ('Program and Project Documentation', 'Documents related to program plans, monitoring, and evaluation.'),
  ('Policies and Procedures', 'Organizational policies and procedures.'),
  ('Legal Documents', 'Legal documents such as registrations, agreements, and bylaws.'),
  ('Communications and Marketing', 'Documents related to communications and marketing strategies.');

CREATE TABLE sys.document_subcategories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_id INT,
  name VARCHAR(50),
  description VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES document_categories(id)
);



INSERT INTO sys.document_subcategories (category_id, name, description)
VALUES
  (1, 'Budgets', 'Financial budget documents.'),
  (1, 'Financial Statements', 'Financial statements and reports.'),
  (1, 'Annual Reports', 'Yearly financial reports.'),
  (1, 'Expense Reports', 'Expense reports and reimbursement claims.'),
  (1, 'Grant Reports', 'Reports on grants received and utilization.'),
  (1, 'Audited Financial Statements', 'Financial statements audited by external agencies.'),
  (2, 'Funding Proposals', 'Proposals for funding requests.'),
  (2, 'Grant Applications', 'Applications for grant funding.'),
  (2, 'Project Proposals', 'Proposals for specific projects.'),
  (2, 'Partnership Proposals', 'Proposals for collaboration and partnerships.'),
  (2, 'Grant Agreements', 'Agreements related to grant funding.'),
  (3, 'Project Plans', 'Plans and outlines for specific projects.'),
  (3, 'Monitoring and Evaluation Reports', 'Reports on project monitoring and evaluation.'),
  (3, 'Impact Assessments', 'Assessments of project impacts and outcomes.'),
  (3, 'Case Studies', 'In-depth case studies of specific projects or programs.'),
  (3, 'Program Guidelines', 'Guidelines for program implementation and management.'),
  (3, 'Success Stories', 'Success stories and testimonials from projects.'),
  (4, 'Organizational Policies', 'Policies governing the organization.'),
  (4, 'Code of Conduct', 'Code of conduct and ethical guidelines.'),
  (4, 'Human Resources Policies', 'Policies related to human resources and employee management.'),
  (4, 'Procurement Policies', 'Policies related to procurement and purchasing.'),
  (4, 'Governance and Board Policies', 'Policies related to governance and board operations.'),
  (5, 'Registration Certificates', 'Certificates of registration or incorporation.'),
  (5, 'Memorandum of Understanding (MOU)', 'MOUs or agreements with other organizations.'),
  (5, 'Contracts and Agreements', 'Contracts and legal agreements.'),
  (5, 'Bylaws', 'Organizational bylaws and regulations.'),
  (5, 'Intellectual Property Documents', 'Documents related to intellectual property protection.'),
  (6, 'Newsletters', 'Organization newsletters and updates.'),
  (6, 'Press Releases', 'Press releases and media announcements.'),
  (6, 'Media Coverage', 'Media coverage and news articles.'),
  (6, 'Marketing Materials', 'Marketing materials and promotional documents.'),
  (6, 'Social Media Strategies', 'Strategies and plans for social media engagement.'),
  (6, 'Branding Guidelines', 'Guidelines for organizational branding and visual identity.');

CREATE TABLE sys.documents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  subcategory_id INT,
  filename VARCHAR(100),
  file_url VARCHAR(255),
  file_size INT,
  uploaded_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (subcategory_id) REFERENCES document_subcategories(id),
  FOREIGN KEY (uploaded_by) REFERENCES users(id)
);

ALTER TABLE sys.documents
ADD COLUMN del_flg ENUM('Y', 'N') NOT NULL DEFAULT 'N' AFTER created_at;

ALTER TABLE sys.documents
DROP COLUMN subcategory_id;

ALTER TABLE sys.documents
ADD CONSTRAINT unique_filename UNIQUE (filename);

INSERT INTO sys.documents (subcategory_id, filename, file_url, file_size, uploaded_by)
VALUES
  (1, 'document1.pdf', 'https://example.com/documents/document1.pdf', 1024, (SELECT id FROM users WHERE email = 'user1@example.com')),
  (2, 'document2.docx', 'https://example.com/documents/document2.docx', 2048, (SELECT id FROM users WHERE email = 'user2@example.com')),
  (3, 'document3.png', 'https://example.com/documents/document3.png', 512, (SELECT id FROM users WHERE email = 'user3@example.com')),
  (1, 'document4.pdf', 'https://example.com/documents/document4.pdf', 3072, (SELECT id FROM sys.users WHERE email = 'user4@example.com')),
  (2, 'document5.docx', 'https://example.com/documents/document5.docx', 4096, (SELECT id FROM sys.users WHERE email = 'user5@example.com'));
  
INSERT INTO sys.documents (subcategory_id, filename, file_url, file_size, uploaded_by)
VALUES
  (1, 'document1.pdf', 'https://example.com/document1.pdf', 1024, (SELECT id FROM sys.users WHERE user_type = 4 ORDER BY id LIMIT 1)),
  (2, 'document2.docx', 'https://example.com/document2.docx', 2048, (SELECT id FROM sys.users WHERE user_type = 4 ORDER BY id LIMIT 1)),
  (3, 'document3.jpg', 'https://example.com/document3.jpg', 512, (SELECT id FROM sys.users WHERE user_type = 4 ORDER BY id LIMIT 1));





