-- migrate:up
CREATE TABLE IF NOT EXISTS genres (
    id VARCHAR(36) PRIMARY KEY,
    genre VARCHAR(255)
);

-- migrate:down
DROP TABLE IF EXISTS genres;
