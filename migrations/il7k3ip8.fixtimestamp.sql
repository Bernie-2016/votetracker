-- up
ALTER TABLE caucus_report
	ALTER report_time set default current_timestamp;
ALTER TABLE primary_report
	ALTER report_time set default current_timestamp;
ALTER TABLE official_report
	ALTER report_time set default current_timestamp;

---

-- down
