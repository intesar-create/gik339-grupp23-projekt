DROP TABLE IF EXISTS movies;
CREATE TABLE IF NOT EXISTS movies(
   id        INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT
  ,titel VARCHAR(8) NOT NULL
  ,dirctor  VARCHAR(9) NOT NULL
  ,release_date         INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT
  ,color     VARCHAR(6) NOT NULL
);
INSERT INTO movies(id,titel,dirctor,release_date,color) VALUES (2,'Muhammad','Torphy',2019,'gray');
INSERT INTO movies(id,titel,dirctorrelease_date,color) VALUES (3,'Carlee','Tromp',2020,'purple');
INSERT INTO movies(id,titel,dirctor,release_date,color) VALUES (1,'Zena','Zulauf',2022,'green');


select * from movies;