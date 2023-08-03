CREATE TABLE sys.participants (
  participant_id INT AUTO_INCREMENT PRIMARY KEY,
  participant_name VARCHAR(100),
  mobile_number VARCHAR(20)
);

CREATE TABLE sys.event_participants (
  participant_id INT,
  event_id INT,
  attendance_status VARCHAR(20),
  invitation_sent BOOLEAN,
  response_status VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (participant_id) REFERENCES sys.participants(participant_id),
  FOREIGN KEY (event_id) REFERENCES sys.events(id)
);
