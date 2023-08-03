CREATE TABLE sys.all_categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50),
  description VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE sys.all_categories MODIFY description VARCHAR(200);

INSERT INTO sys.all_categories (name, description)
VALUES
  ('Institutional development', 'The development and strengthening of institutions for effective governance and service delivery.'),
  ('Civic engagement and awareness', 'Focused on promoting citizen participation, community engagement, and raising awareness on social issues.'),
  ('Human rights and access to justice', 'Dedicated to promoting and protecting human rights, ensuring access to justice, and advocating for legal reforms.'),
  ('Girls United Initiative', 'Highlighting initiatives and programs empowering and supporting girls, promoting gender equality, and advocating for girls\' rights.'),
  ('Children rights awareness program', 'Centered around raising awareness on children\'s rights, child protection, and advocating for the well-being of children.'),
  ('Peace building and climate conflict', 'Focused on fostering peace, conflict resolution, and addressing the impacts of climate change on vulnerable communities.'),
  ('Urban inclusion program', 'Aimed at promoting inclusive development, addressing urban challenges, and ensuring equitable access to resources and services in urban areas.');

CREATE TABLE sys.media (
  id INT AUTO_INCREMENT PRIMARY KEY,
  event_id INT,
  title VARCHAR(100),
  description VARCHAR(255),
  file_url VARCHAR(255),
  file_type VARCHAR(50),
  file_size INT,
  uploaded_by INT,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (event_id) REFERENCES events(id),
  FOREIGN KEY (uploaded_by) REFERENCES users(id)
);
ALTER TABLE sys.media
ADD COLUMN del_flg ENUM('Y', 'N') NOT NULL DEFAULT 'N' AFTER uploaded_at;

ALTER TABLE sys.media
ADD CONSTRAINT unique_title UNIQUE (title);
INSERT INTO sys.media (event_id, title, description, file_url, file_type, file_size, uploaded_by)
VALUES
  (12, 'Media 1', 'Description of Media 1', 'http://example.com/media1.jpg', 'image/jpeg', 1024, (SELECT id FROM sys.users WHERE user_type = 2 LIMIT 1)),
  (9, 'Media 2', 'Description of Media 2', 'http://example.com/media2.mp4', 'video/mp4', 2048, (SELECT id FROM sys.users WHERE user_type = 2 LIMIT 1)),
  (10, 'Media 3', 'Description of Media 3', 'http://example.com/media3.png', 'image/png', 512, (SELECT id FROM sys.users WHERE user_type = 2 LIMIT 1)),
  (11, 'Media 4', 'Description of Media 4', 'http://example.com/media4.wav', 'audio/wav', 4096, (SELECT id FROM sys.users WHERE user_type = 2 LIMIT 1));
  
CREATE TABLE sys.content (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  slug VARCHAR(255),
  content TEXT,
  author_id INT,
  published_at DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  category_id INT,
  media_id INT,
  FOREIGN KEY (author_id) REFERENCES users(id),
  FOREIGN KEY (category_id) REFERENCES all_categories(id),
  FOREIGN KEY (media_id) REFERENCES media(id)
);
ALTER TABLE sys.content
ADD CONSTRAINT unique_title UNIQUE (title);
-- Drop the existing 'published_at' column
ALTER TABLE sys.content
DROP COLUMN published_at;

-- Add a new 'published_at' column with DEFAULT CURRENT_TIMESTAMP
ALTER TABLE sys.content
ADD COLUMN published_at DATETIME DEFAULT CURRENT_TIMESTAMP;

INSERT INTO sys.content (title, slug, content, author_id, published_at, category_id, media_id)
VALUES
  ('Getting Started with Node.js', 'getting-started-with-nodejs', '<p>This blog post provides a beginner-friendly guide to get started with Node.js development.</p>', (SELECT id FROM sys.users WHERE user_type = 2 LIMIT 1), '2023-07-01 10:00:00', 8, 5),
  ('Introduction to React Hooks', 'introduction-to-react-hooks', '<p>Learn about the power of React Hooks and how they can simplify your React component logic.</p>', (SELECT id FROM sys.users WHERE user_type = 2 LIMIT 1), '2023-07-03 14:30:00', 8, 6),
  ('Building RESTful APIs with Express', 'building-restful-apis-with-express', '<p>Discover the process of building RESTful APIs using the Express framework in Node.js.</p>', (SELECT id FROM sys.users WHERE user_type = 2 LIMIT 1), '2023-07-07 11:15:00', 10, 7),
  ('Mastering CSS Flexbox Layouts', 'mastering-css-flexbox-layouts', '<p>Learn how to create flexible and responsive layouts using CSS Flexbox.</p>', (SELECT id FROM sys.users WHERE user_type = 2 LIMIT 1), '2023-07-10 16:45:00', 11, 8);


