\echo 'Delete and recreate PlantGreen db?' 
\prompt 'Return for yes or control-C to cancel > ' foo 

DROP DATABASE IF EXISTS plantgreen;
CREATE DATABASE plantgreen;
\connect plantgreen

DROP TABLE IF EXISTS user_saved_plants;
DROP TABLE IF EXISTS plants;
DROP TABLE IF EXISTS users;

\i plantgreen-schema.sql 
\i plantgreen-seed.sql 
\echo 'Delete and recreate plantgreen_test db?' 
\prompt 'Return for yes or control-C to cancel > ' foo 

DROP DATABASE plantgreen_test;
CREATE DATABASE plantgreen_test;

\connect plantgreen_test
\i plantgreen-schema.sql