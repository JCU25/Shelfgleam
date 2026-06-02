-- migrate:up
CREATE TABLE IF NOT EXISTS book_genres_link (
    book_id VARCHAR(50) REFERENCES books(id) ON DELETE CASCADE,
    genre_id VARCHAR(36) REFERENCES genres(id) ON DELETE CASCADE,
    PRIMARY KEY (book_id, genre_id)
);

-- migrate:down
DROP TABLE IF EXISTS book_genres_link;
