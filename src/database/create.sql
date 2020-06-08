CREATE TABLE IF NOT EXISTS icon_requests(
	id			SERIAL PRIMARY KEY,
	name		text NOT NULL,
	component	text NOT NULL,
	url			text NOT NULL
);