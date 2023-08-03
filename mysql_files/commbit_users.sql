
CREATE USER commbit_backend@localhost
  IDENTIFIED WITH mysql_native_password BY 'manager';
  
GRANT ALL ON my_db.* TO commbit_backend@localhost;

alter user 'root'@'localhost' identified with mysql_native_password by 'manager123';

CREATE TABLE sys.user_role (
  id INT AUTO_INCREMENT PRIMARY KEY,
  role_name VARCHAR(50),
  permissions VARCHAR(100)
);

ALTER TABLE sys.user_role
DROP COLUMN del_flg;


INSERT INTO sys.user_role (role_name, permissions) VALUES
  ('admin', 'all'),
  ('content_manager', 'create, read, update'),
  ('event_manager', 'create, read, update'),
  ('back_office', 'create, read, update, delete');
  
CREATE TABLE sys.users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100),
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  phone_number VARCHAR(20),
  user_type INT,
  FOREIGN KEY (user_type) REFERENCES user_role(id)
);

ALTER TABLE sys.users
ADD COLUMN del_flg ENUM('Y', 'N') NOT NULL DEFAULT 'N' AFTER user_type;

ALTER TABLE sys.users
ADD CONSTRAINT unique_email UNIQUE (email);


INSERT INTO sys.users (email, first_name, last_name, phone_number, user_type)
VALUES
  ('user1@example.com', 'John', 'Doe', '1234567890', 1),
  ('user2@example.com', 'Jane', 'Smith', '9876543210', 2),
  ('user3@example.com', 'Alice', 'Johnson', '5555555555', 3),
  ('user4@example.com', 'Bob', 'Williams', '1111111111', 2),
  ('user5@example.com', 'Emily', 'Brown', '9999999999', 4);


