INSERT INTO filters (name) VALUES ('Hogwarts Students');
INSERT INTO filters (name) VALUES ('Magical Creatures');
INSERT INTO filters (name) VALUES ('Middle Earth Battles');
INSERT INTO filters (name) VALUES ('Jedi Knights');
INSERT INTO filters (name) VALUES ('Magical Artifacts');


INSERT INTO criteria (filter_id, type, condition, value_title)
VALUES (
           (SELECT filter_id FROM filters WHERE name = 'Hogwarts Students'),
           'TITLE',
           'CONTAINS',
           'Potter'
       );
INSERT INTO criteria (filter_id, type, condition, value_date)
VALUES (
           (SELECT filter_id FROM filters WHERE name = 'Hogwarts Students'),
           'DATE',
           'BEFORE',
           '1980-07-31'
       );
INSERT INTO criteria (filter_id, type, condition, value_amount)
VALUES (
           (SELECT filter_id FROM filters WHERE name = 'Hogwarts Students'),
           'AMOUNT',
           'GREATER_THAN',
           1
       );


INSERT INTO criteria (filter_id, type, condition, value_title)
VALUES (
           (SELECT filter_id FROM filters WHERE name = 'Magical Creatures'),
           'TITLE',
           'STARTS_WITH',
           'Hippogriff'
       );
INSERT INTO criteria (filter_id, type, condition, value_date)
VALUES (
           (SELECT filter_id FROM filters WHERE name = 'Magical Creatures'),
           'DATE',
           'AFTER',
           '1993-06-01'
       );
INSERT INTO criteria (filter_id, type, condition, value_amount)
VALUES (
           (SELECT filter_id FROM filters WHERE name = 'Magical Creatures'),
           'AMOUNT',
           'EQUAL_TO',
           1
       );


INSERT INTO criteria (filter_id, type, condition, value_title)
VALUES (
           (SELECT filter_id FROM filters WHERE name = 'Middle Earth Battles'),
           'TITLE',
           'ENDS_WITH',
           'Helm''s Deep'
       );
INSERT INTO criteria (filter_id, type, condition, value_date)
VALUES (
           (SELECT filter_id FROM filters WHERE name = 'Middle Earth Battles'),
           'DATE',
           'BEFORE',
           '3019-03-01'
       );
INSERT INTO criteria (filter_id, type, condition, value_amount)
VALUES (
           (SELECT filter_id FROM filters WHERE name = 'Middle Earth Battles'),
           'AMOUNT',
           'LESS_THAN',
           5000
       );

INSERT INTO criteria (filter_id, type, condition, value_title)
VALUES (
           (SELECT filter_id FROM filters WHERE name = 'Jedi Knights'),
           'TITLE',
           'CONTAINS',
           'Skywalker'
       );
INSERT INTO criteria (filter_id, type, condition, value_date)
VALUES (
           (SELECT filter_id FROM filters WHERE name = 'Jedi Knights'),
           'DATE',
           'AFTER',
           '1977-05-25'
       );
INSERT INTO criteria (filter_id, type, condition, value_amount)
VALUES (
           (SELECT filter_id FROM filters WHERE name = 'Jedi Knights'),
           'AMOUNT',
           'GREATER_THAN',
           0
       );

INSERT INTO criteria (filter_id, type, condition, value_title)
VALUES (
           (SELECT filter_id FROM filters WHERE name = 'Magical Artifacts'),
           'TITLE',
           'CONTAINS',
           'Horcrux'
       );
INSERT INTO criteria (filter_id, type, condition, value_date)
VALUES (
           (SELECT filter_id FROM filters WHERE name = 'Magical Artifacts'),
           'DATE',
           'AFTER',
           '1945-05-08'
       );
INSERT INTO criteria (filter_id, type, condition, value_amount)
VALUES (
           (SELECT filter_id FROM filters WHERE name = 'Magical Artifacts'),
           'AMOUNT',
           'EQUAL_TO',
           7
       );
INSERT INTO criteria (filter_id, type, condition, value_title)
VALUES (
           (SELECT filter_id FROM filters WHERE name = 'Magical Artifacts'),
           'TITLE',
           'STARTS_WITH',
           'Elder'
       );
INSERT INTO criteria (filter_id, type, condition, value_date)
VALUES (
           (SELECT filter_id FROM filters WHERE name = 'Magical Artifacts'),
           'DATE',
           'BEFORE',
           '1998-05-02'
       );