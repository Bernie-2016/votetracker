-- up
ALTER TABLE caucus_report
	ADD contact_info TEXT;
ALTER TABLE primary_report
	ADD contact_info TEXT;
ALTER TABLE official_report
	ADD contact_info TEXT;

---
ALTER TABLE caucus_report
	DROP contact_info;
ALTER TABLE primary_report
	DROP contact_info;
ALTER TABLE official_report
	DROP contact_info;

-- down
