CREATE TABLE criteria (
    crit_id SERIAL PRIMARY KEY,
    filter_id BIGINT NOT NULL,
    FOREIGN KEY (filter_id) REFERENCES filters(filter_id),
    type VARCHAR(255),
    condition VARCHAR(255),
    value_amount INTEGER,
    value_title VARCHAR(255),
    value_date DATE
);