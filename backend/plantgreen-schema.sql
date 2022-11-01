CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(25) UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL CHECK (position('@' IN email) > 1),
  password TEXT NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE plants (
  id SERIAL PRIMARY KEY,
  plant_api_id INT,
  common_names TEXT NOT NULL,
  edible_parts TEXT,
  info_url TEXT,
  propagation_methods TEXT,
  scientific_name TEXT,
  taxonomy TEXT,
  wiki_description TEXT NOT NULL
);

CREATE TABLE user_saved_plants(
  user_id INT NOT NULL,
  plant_id INT NOT NULL,
  notes TEXT,
  PRIMARY KEY (user_id, plant_id),
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
  FOREIGN KEY (plant_id) REFERENCES plants (id) ON DELETE CASCADE
)