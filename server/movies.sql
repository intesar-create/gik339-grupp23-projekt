DROP TABLE IF EXISTS movies;
CREATE TABLE IF NOT EXISTS movies (
   movie_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
   title VARCHAR(100) NOT NULL,
   year_released INTEGER NOT NULL,
   director VARCHAR(80) NOT NULL,
);
INSERT INTO movies(id,title, year_released,director) VALUES (1,'','','');
INSERT INTO movies(id,title, year_released,director) VALUES (2,'','','');
INSERT INTO movies(id,title, year_released,director) VALUES (3,'','','');


select * from movies;