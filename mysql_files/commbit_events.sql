CREATE TABLE sys.events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_id INT,
  title VARCHAR(100),
  description VARCHAR(255),
  location VARCHAR(100),
  start_date DATE,
  end_date DATE,
  start_time TIME,
  end_time TIME,
  organizer INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES all_categories(id),
  FOREIGN KEY (organizer) REFERENCES users(id)
);

ALTER TABLE sys.events
ADD COLUMN del_flg ENUM('Y', 'N') NOT NULL DEFAULT 'N' AFTER created_at;

ALTER TABLE sys.events
ADD CONSTRAINT unique_title UNIQUE (title);

INSERT INTO sys.events (category_id, title, description, location, start_date, end_date, start_time, end_time, organizer)
VALUES
  (8, 'Tech Expo 2023', 'Explore the latest technology innovations and advancements.', 'Tech Convention Center', '2023-09-15', '2023-09-17', '09:00:00', '18:00:00', (SELECT id FROM sys.users WHERE user_type = 3 LIMIT 1)),
  (8, 'Art Gala Night', 'An evening celebrating artistic expressions from around the world.', 'Metropolitan Art Museum', '2023-10-20', '2023-10-21', '18:30:00', '23:00:00', (SELECT id FROM sys.users WHERE user_type = 3 LIMIT 1)),
  (10, 'Green Earth Symposium', 'Join experts in discussing sustainable practices for a greener future.', 'Eco Center Auditorium', '2023-11-12', '2023-11-14', '10:00:00', '16:30:00', (SELECT id FROM sys.users WHERE user_type = 3 LIMIT 1)),
  (11, 'Music Festival: Harmony of Cultures', 'A vibrant music festival showcasing diverse cultural performances.', 'City Park Amphitheater', '2023-12-05', '2023-12-08', '16:00:00', '23:59:59', (SELECT id FROM sys.users WHERE user_type = 3 LIMIT 1));

