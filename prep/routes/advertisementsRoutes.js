//DB and ExpressJS & crypto (hash password)
const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const db = require('../db.js');


//Select ALL
router.get('/', (req, res) => { 
    const id = req.query.id;

    if (id){
        const query = 'SELECT title, short_description, companies.NAME AS company, localization, salary, contract_type, date, working_time, sector.NAME AS sector FROM advertisements JOIN companies ON advertisements.company = companies.id JOIN sector ON advertisements.id_sector = sector.id WHERE advertisements.id = (?)';
        const values = [id];
    
        db.query(query, values, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Data recovery error');
            }
            res.json(results);
        });
    } else {
        const query = 'SELECT title, short_description, companies.NAME AS company, localization, salary, contract_type, date, working_time, sector.NAME AS sector FROM advertisements JOIN companies ON advertisements.company = companies.id JOIN sector ON advertisements.id_sector = sector.id';
        db.query(query, (err, results) => {
            if (err) {
                return res.status(500).send('Data recovery error');
            }
            res.json(results);
        });
    }
});

//Add new person 
router.post('/add', (req, res) => {
    const {title, short_description, description, company, localization, salary, contract_type, date, working_time, sector} = req.body;

    //Check if foreginKey exist
    const checkForeignKeys = `
        SELECT 
            (SELECT id FROM companies WHERE name = ?) AS companyiD,
            (SELECT id FROM sector WHERE name = ?) AS sectoriD`;
    const checkValues = [company, sector];
    db.query(checkForeignKeys, checkValues, (err, results) => {
        if (err) {
            return res.status(500).send('Error foreing key:');
        }

        const {companyiD, sectoriD} = results[0];
        if (!companyiD || !sectoriD) {
            return res.status(400).send('Invalid foreing key.');
        }

        const insertQuery = `
            INSERT INTO advertisements (title, short_description, description, company, localization, salary, contract_type, date, working_time, id_sector) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const insertValues = [title, short_description, description, companyiD, localization, salary, contract_type, date, working_time, sectoriD];
        console.log(insertValues);

        db.query(insertQuery, insertValues, (err, results) => {
            if (err) {

                return res.status(500).send('Error when adding data:');
            }
            res.status(200).send(true);
        });
    });
});



// Select Delete 1
router.delete('/remove', (req, res) => {
    const id = req.query.id;

    // Check ID
    if (!id) {
        return res.status(400).send('ID is needed');
    }

    const query = 'DELETE FROM advertisements WHERE id = ?';
    const values = [id];

    db.query(query, values, (err, results) => {
        if (err) {
            return res.status(500).send('Error when deleting data :', err);
        }

        // Check if ID exist
        if (results.affectedRows === 0) {
            return res.status(404).send('User ID not exist');
        }

        res.status(200).send(true);
    });
});

router.get('/description', (req, res) => { 
    const id = req.query.id;

    if (!id){
        return res.status(400).send('ID is needed');
    } else{
        const query = 'SELECT (description) FROM advertisements WHERE id = (?)';
        const values = [id];
    
        db.query(query, values, (err, results) => {
            if (err) {
                return res.status(500).send('Data recovery error', err);
            }
            res.json(results);
        });
    }
});


module.exports = router;
