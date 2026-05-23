-- migrate:up
CREATE TABLE IF NOT EXISTS user_sessions (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    token_hash VARCHAR(64) NOT NULL,
    user_agent TEXT NOT NULL,
    ip_address VARCHAR(45) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMPTZ NOT NULL
);

-- migrate:down
DROP TABLE IF EXISTS user_sessions;
