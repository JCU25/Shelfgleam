-- migrate:up
ALTER TABLE user_sessions ADD COLUMN is_revoked BOOL;

-- migrate:down
ALTER TABLE user_sessions DROP COLUMN is_revoked;
