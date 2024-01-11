
const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./gik339-projekt.db');

const express = require('express');
const server = express();

server
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', '*');
        res.header('Access-Control-Allow-Methods', '*');

        next();
    });
//Startar servern och lyssnar på port 3000.
server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

//Safiyo börjar här
//Hämtar alla filmer från databasen.
server.get('/movies', (req, res) => {
    const sql = 'SELECT * FROM movies';

    db.all(sql, (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(rows);
        }
    });
});

//Hämtar en specifik film baserad på ID.
server.get('/movies/:id', (req, res) => {
    const id = req.params.id;

    const sql = `SELECT * FROM movies WHERE id=${id}`;

    db.all(sql, (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(rows[0]);
        }
    });
});

//Lägger till en ny film i databasen.
server.post('/movies', (req, res) => {
    const movie = req.body;
    const sql = `INSERT INTO movies(titel,dirctor , release_date, color) VALUES (?,?,?,?)`;

    db.run(sql, Object.values(movie), (err) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.send('Filmen sparades');
        }
    });
});


//Intisar börjar här
//Uppdaterar en befintlig film i databasen.
server.put('/movies', (req, res) => {
    const bodyData = req.body;

    const id = bodyData.id;
    const movie = {
        titel: bodyData.titel,
        dirctor: bodyData.dirctor,
        release_date: bodyData.release_date,
        color: bodyData.color
    };

    let updateString = '';
    const columnsArray = Object.keys(movie);
    columnsArray.forEach((column, i) => {
        updateString += `${column}="${movie[column]}"`;
        if (i !== columnsArray.length - 1) updateString += ',';
    });
    const sql = `UPDATE movies SET ${updateString} WHERE id=${id}`;

    db.run(sql, (err) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.send('Filmen uppdaterades');
        }
    });

});

//Tar bort en film baserad på ID.
server.delete('/movies/:id', (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM movies WHERE id = ${id}`;

    db.run(sql, (err) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.send('Filmen borttagen');
        }
    });
});