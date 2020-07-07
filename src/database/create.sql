/* 	
 	PostgreSQL 
 */
-- Create icon_requests

CREATE TABLE IF NOT EXISTS icon_requests (
    id serial PRIMARY KEY,
    name text NOT NULL,
    component text NOT NULL,
    url text NOT NULL,
    status text DEFAULT 'pending'
);

CREATE TABLE IF NOT EXISTS api_keys (
    id serial PRIMARY KEY,
    api_key text NOT NULL
);

-- Create api_keys
CREATE TABLE IF NOT EXISTS api_keys (
    id serial PRIMARY KEY,
    api_key text NOT NULL
);

