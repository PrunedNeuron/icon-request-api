CREATE TABLE IF NOT EXISTS icon_requests(
	id			SERIAL PRIMARY KEY,
	name		TEXT NOT NULL,
	component	TEXT NOT NULL,
	url			TEXT NOT NULL,
	status		TEXT DEFAULT 'pending'
);

CREATE TABLE IF NOT EXISTS api_keys(
	id			SERIAL PRIMARY KEY,
	api_key	TEXT NOT NULL
);