-- -- Test user have the password "password"
INSERT INTO
    users (username, email, password, is_admin)
VALUES
    (
        'testuser1',
        'testuser1@test.com',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        TRUE
    );

-- INSERT INTO
--     plants (
--         plant_api_id,
--         common_names,
--         edible_parts,
--         info_url,
--         propagation_methods,
--         scientific_name,
--         taxonomy,
--         wiki_description
--     )
-- VALUES
--     (
--         '22062232',
--         'common dandelion',
--         'flowers,leaves',
--         'https://en.wikipedia.org/wiki/Taraxacum_officinale',
--         'division,seeds',
--         'Taraxacum officinale',
--         '{"class" :"Magnoliopsida",
--         "family" :"Asteraceae",
--         "genus" :"Taraxacum",
--         "kingdom" :"Plantae",
--         "order" :"Asterales",
--         "phylum" :"Magnoliophyta"}',
--         'Taraxacum officinale, the common dandelion (often simply called dandelion), is a flowering herbaceous...'
--     );
-- INSERT INTO
--     user_saved_plants (username, plant_id, notes)
-- VALUES
--     (
--         'testuser1',
--         '1',
--         'Best Note Ever'
--     );