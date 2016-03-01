-- up
ALTER TABLE primary_report
	ADD early_absentee int;
---
ALTER TABLE primary_report
	DROP early_absentee;
-- down
