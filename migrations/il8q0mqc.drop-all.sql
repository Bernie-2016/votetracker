-- up
DROP TABLE precinct_data;
---
CREATE TABLE precinct_data
(
  state_code varchar(4),
  precinctID int,
  pollinglocation varchar(250),
  pollingaddress varchar(250),
  county varchar(100),
  pollingcity varchar(100),
  pollingzip varchar(10)
);
-- down
