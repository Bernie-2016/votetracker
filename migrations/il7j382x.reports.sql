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
	other_delegates int default(0)
);

---
DROP TABLE caucus_report;
-- down
