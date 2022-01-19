DROP DATABASE IF EXISTS todos_db;
CREATE DATABASE todos_db;


USE todos_db;


CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(30) NOT NULL,
    PRIMARY KEY (id);
);

CREATE TABLE todos (
    id INT NOT NULL AUTO_INCREMENT,
    task VARCHAR(30) NOT NULL,
    completed BOOLEAN DEFAULT false,
    date_created DATETIME DEFAULT CURRENT_TIMESTAMP, 
    userId INT,
    PRIMARY KEY (id), 
    FOREIGN KEY (userID)
    REFERENCES users(id)
    ON DELETE SET NULL
);