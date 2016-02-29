-- up
CREATE TABLE precincts (
	id int primary key,
	state_code VARCHAR(4),
	county VARCHAR(100),
	name VARCHAR(200)
);
---
DROP TABLE precincts;
-- down
