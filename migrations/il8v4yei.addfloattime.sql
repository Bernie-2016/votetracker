-- up
ALTER TABLE caucus_report
	ADD float_time decimal(4,2);
ALTER TABLE primary_report
	ADD float_time decimal(4,2);
ALTER TABLE official_report
	ADD float_time decimal(4,2);

ALTER TABLE caucus_report
	ALTER report_age type decimal(4,2);
ALTER TABLE primary_report
	ALTER report_age type decimal(4,2);
ALTER TABLE official_report
	ALTER report_age type decimal(4,2);
---

ALTER TABLE caucus_report
	DROP float_time;
ALTER TABLE primary_report
	DROP float_time;
ALTER TABLE official_report
	DROP float_time;

ALTER TABLE caucus_report
	ALTER report_age type int;
ALTER TABLE primary_report
	ALTER report_age type int;
ALTER TABLE official_report
	ALTER report_age type int;

-- down
