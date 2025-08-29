CREATE SCHEMA IF NOT EXISTS anime_db;

USE anime_db;

CREATE TABLE IF NOT EXISTS anime_info (
    id INT NOT NULL AUTO_INCREMENT,
    anime_name VARCHAR(100),
    img_url VARCHAR(75),
    author VARCHAR(50),
    rating DECIMAL(3, 1) CHECK(rating BETWEEN 0 AND 10),
    PRIMARY KEY (id)
);
