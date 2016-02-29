-- up
CREATE TABLE caucus_report (
	id serial,
	phase int,
	report_age int,
	client_id varchar(200),
	location_id int,
	sanders_supporters int,
	clinton_supporters int,
	other_supporters int,
	sanders_delegates int default(0),
	clinton_delegates int default(0),
	other_delegates int default(0),
	report_time timestamptz
);

CREATE TABLE primary_report (
	id serial,
	report_age int,
	location_id int,
	client_id varchar(200),
	type varchar(10),
	ballots_cast int,
	report_time timestamptz
);

CREATE TABLE official_report (
	id serial,
	report_age int,
	client_id varchar(200),
	location_id int,
	state varchar(4),
	county varchar(100),
	sanders_votes int,
	clinton_votes int,
	percent_reporting float,
	other_votes int,
	attribution text,
	report_time timestamptz
);

---
DROP TABLE caucus_report;
DROP TABLE primary_report;
DROP TABLE official_report;
-- down
