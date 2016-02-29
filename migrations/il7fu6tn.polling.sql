-- up
CREATE TABLE polling_location (
	id int primary key,
	state_code VARCHAR(4),
	county VARCHAR(100),
	precinct_name VARCHAR(200),
	pollinglocation VARCHAR(200),
	pollingaddress VARCHAR(200),
	pollingcity VARCHAR(200),
	pollingzip VARCHAR(200)
);

---
DROP TABLE polling_location;
-- down
