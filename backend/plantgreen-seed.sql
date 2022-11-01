-- Test user have the password "password"
INSERT INTO
    users (username, email, password, is_admin)
VALUES
    (
        'testuser1',
        'testuser1@test.com',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        TRUE
    );

INSERT INTO
    plants (
        id,
        plant_api_id,
        common_names,
        edible_parts,
        info_url,
        propagation_methods,
        scientific_name,
        taxonomy,
        wiki_description
    )
VALUES
    (
        '1',
        ' 22062232',
        'common dandelion',
        '{"flowers","leaves"}',
        '"https://en.wikipedia.org/wiki/Taraxacum_officinale"',
        '{"division","seeds"}',
        'Taraxacum officinale',
        '{ "class" :"Magnoliopsida",
        "family" :"Asteraceae",
        "genus" :"Taraxacum",
        "kingdom" :"Plantae",
        "order" :"Asterales",
        "phylum" :"Magnoliophyta" }',
        '{ "value" :"Taraxacum officinale, the common dandelion (often simply called dandelion), is a flowering herbaceous...",
        "citation" :"https://en.wikipedia.org/wiki/Taraxacum_officinale",
        "license_name" :"CC BY-SA 3.0",
        "license_url" :"https://creativecommons.org/licenses/by-sa/3.0/" }'
    );

INSERT INTO
    user_saved_plants (user_id, plant_id, notes)
VALUES
    (
        '1',
        '1',
        'Best Note Ever'
    );