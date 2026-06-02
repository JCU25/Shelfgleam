-- migrate:up
CREATE TABLE IF NOT EXISTS user_book_categories (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(36) REFERENCES users(id) ON DELETE CASCADE,
    category_name VARCHAR(255),
    description TEXT,
    display_order INT,
    
    UNIQUE(user_id, category_name)
);

-- migrate:down
DROP TABLE IF EXISTS user_book_categories;