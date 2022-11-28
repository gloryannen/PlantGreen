CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY UNIQUE,
  email TEXT UNIQUE NOT NULL CHECK (position('@' IN email) > 1),
  password TEXT NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE
);

-- CREATE TABLE plants (
--   id SERIAL PRIMARY KEY,
--   plant_api_id INTEGER,
--   common_names VARCHAR,
--   edible_parts VARCHAR,
--   info_url VARCHAR,
--   propagation_methods VARCHAR,
--   scientific_name VARCHAR,
--   taxonomy JSON,
--   wiki_description VARCHAR
-- );
-- CREATE TABLE user_saved_plants(
--   username VARCHAR(25) REFERENCES users ON DELETE CASCADE,
--   plant_id INTEGER REFERENCES plants,
--   notes TEXT,
--   PRIMARY KEY (username, plant_id)
-- );