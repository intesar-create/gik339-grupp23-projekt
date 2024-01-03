DROP TABLE IF EXISTS movies;
CREATE TABLE IF NOT EXISTS movies(
   id             INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT
  ,titel          VARCHAR(8) NOT NULL
  ,dirctor        VARCHAR(9) NOT NULL
  ,release_date   INTEGER  NOT NULL
  ,color          VARCHAR(6) NOT NULL
);
INSERT INTO movies(id,titel,dirctor,release_date,color) VALUES (2,'Parasite','Bong Joon Ho',2019,'gray');
INSERT INTO movies(id,titel,dirctor,release_date,color) VALUES (3,'Time to Hunt','Yoon Sunghyun',2020,'purple');
INSERT INTO movies(id,titel,dirctor,release_date,color) VALUES (1,'The Pirates: The Last Royal Treasure','Jeong-hoon Kim',2022,'green');


select * from movies;