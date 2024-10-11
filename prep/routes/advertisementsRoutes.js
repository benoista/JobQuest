//DB and ExpressJS & crypto (hash password)
const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const db = require('../db.js');


//Select ALL
router.get('/', (req, res) => {

    console.log(req.query);
    const id = req.query.id;
    const title = req.query.title;
    const companies = req.query.company;
    const localization = req.query.localization;
    const salary = req.query.salary;
    const contract_type = req.query.contract_type;
    const date = req.query.date;
    const sector = req.query.sector;

    const values = [];
    const joins = [];

    if (id) {values.push(`id = '${id}'`);}
    if (title) {values.push(`title LIKE '%${title}%'`);}
    if (companies) {
        values.push(`company = (SELECT id FROM companies WHERE companies.name = '${companies}')`);
    }
    if (localization) {values.push(`localization = '${localization}'`);}
    if (salary) {values.push(`salary >= '${salary}'`);}
    if (contract_type) {values.push(`contract_type = '${contract_type}'`);}
    if (date) {values.push(`date = '${date}'`);}
    if (sector) {
        values.push(`sector.id = ${sector}`);
        joins.push('JOIN sector on sector.id = id_sector');
    }


    let whereClause = "";
    let joinClause = "";
    if (values.length === 0) {
        whereClause = "";
    } else {
        whereClause = 'WHERE ' + values.join(' AND ');
    }
    if (values.length === 0) {
        joinClause = "";
    } else {
        joinClause = joins.join('');
    }
    const sqlQuery = `SELECT title, short_description, (SELECT NAME FROM companies WHERE company = companies.id) AS company, localization, salary, contract_type, date, working_time, (SELECT NAME FROM sector WHERE id_sector = sector.id) AS id_sector  FROM advertisements ${joinClause} ${whereClause}`;
    db.query(sqlQuery, [id, title, companies, localization, salary, contract_type, date, sector], (err, results) => {
    if (err) {
        return res.status(500).send(err);
    }
    res.status(200).json(results);
    });
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
