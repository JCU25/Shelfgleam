-- migrate:up
CREATE TABLE IF NOT EXISTS user_books_link(
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(36) REFERENCES users(id),
    book_id VARCHAR(50) REFERENCES books(id),
    book_category_id INT REFERENCES user_book_categories(id),

    UNIQUE(book_id, book_category_id)
);

-- migrate:down
DROP IF EXISTS user_books_link;
