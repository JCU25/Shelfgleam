-- migrate:up
ALTER TABLE users ADD is_active BOOLEAN DEFAULT TRUE;

-- migrate:down
ALTER TABLE users DROP COLUMN is_active;
