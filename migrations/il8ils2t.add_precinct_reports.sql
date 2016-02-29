-- up
ALTER TABLE caucus_report
	ADD precinct_id int;

ALTER TABLE primary_report
	ADD precinct_id int;

ALTER TABLE official_report
	ADD precinct_id int;
---

ALTER TABLE official_report
	DROP precinct_id;
ALTER TABLE caucus_report
	DROP precinct_id;
ALTER TABLE primary_report
	DROP precinct_id;

-- down
