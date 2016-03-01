-- up
ALTER TABLE caucus_report
	ADD ip VARCHAR(100);
ALTER TABLE primary_report
	ADD ip VARCHAR(100);
ALTER TABLE official_report
	ADD ip VARCHAR(100);

---
ALTER TABLE caucus_report
	DROP ip;
ALTER TABLE primary_report
	DROP ip;
ALTER TABLE official_report
	DROP ip;

-- down
