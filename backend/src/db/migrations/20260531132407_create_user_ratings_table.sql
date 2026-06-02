-- migrate:up
CREATE TABLE IF NOT EXISTS user_book_ratings (
    user_id VARCHAR(36) REFERENCES users(id) ON DELETE CASCADE,
    book_id VARCHAR(50) REFERENCES books(id) ON DELETE CASCADE,
    rating NUMERIC(2, 1) CHECK (rating >= 1 AND rating <= 5),
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    PRIMARY KEY(user_id, book_id)
);

-- migrate:down
DROP TABLE IF EXISTS user_book_ratings;

