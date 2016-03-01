-- up
ALTER TABLE caucus_report
	ADD undeclared_supporters int;
---
ALTER TABLE caucus_report
	DROP undeclared_supporters;
-- down
