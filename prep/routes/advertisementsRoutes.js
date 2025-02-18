//DB and ExpressJS & crypto (hash password)
const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const db = require('../db.js');


//Select ALL
router.get('/', (req, res) => {

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

    if (id) {values.push(`advertisements.id = '${id}'`);}
    if (title) {values.push(`advertisements.title LIKE '%${title}%'`);}
    if (companies) {
        values.push(`advertisements.company = (SELECT id FROM companies WHERE companies.name = '${companies}')`);
    }
    if (localization) {values.push(`advertisements.localization = '${localization}'`);}
    if (salary) {values.push(`advertisements.salary >= '${salary}'`);}
    if (contract_type) {values.push(`advertisements.contract_type = '${contract_type}'`);}
    if (date) {values.push(`advertisements.date = '${date}'`);}
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
    const sqlQuery = `SELECT advertisements.id, advertisements.title, advertisements.short_description, (SELECT NAME FROM companies WHERE company = companies.id) AS company, advertisements.localization, advertisements.salary, advertisements.contract_type, advertisements.date, advertisements.working_time, (SELECT NAME FROM sector WHERE id_sector = sector.id) AS sector  FROM advertisements ${joinClause} ${whereClause}`;
    db.query(sqlQuery, [id, title, companies, localization, salary, contract_type, date, sector], (err, results) => {
    if (err) {
        return res.status(500).send(err);
    }
    res.status(200).json(results);
    });
});

router.get("/all", (req, res) => {

    const page = req.query.page;
    const limit = req.query.page;
    const offset = (page - 1) * limit;

    // Import the 'fs' module to work with the file system
    const fs = require('fs');
    // Read the SQL file synchronously
    const sqlFilePath = './scripts/pagination.sql';  // Replace with the correct file path
    const sqlQuery = fs.readFileSync(sqlFilePath, 'utf8') + ` LIMIT ${limit} OFFSET ${offset}`;


    // Log or use the SQL query as needed
    db.query(sqlQuery, page,  (err, results) => {
        if (err) {
            console.log(err)
            return res.status(500).send("aaazeazeazeaz");
        }
        return res.status(200).json(results);
    })
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
        console.log("companyID: ", companyiD , "sectorID", sectoriD);
        if (!companyiD || !sectoriD) {
            return res.status(400).send('Invalid foreing key.');
        }

        const insertQuery = `
            INSERT INTO advertisements (title, short_description, description, company, localization, salary, contract_type, date, working_time, id_sector) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const insertValues = [title, short_description, description, companyiD, localization, salary, contract_type, date, working_time, sectoriD];

        db.query(insertQuery, insertValues, (err, results) => {
            if (err) {
                console.log("error on insert advertisement : " + err);
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
    console.log("received request for description with id: ", id);
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

router.put('/update', (req, res) => {
    const id = req.query.id;
    const {title, short_description, description, company, localization, salary, contract_type, date, working_time, sector} = req.body;

    //Check if foreginKey exist
    const checkForeignKeys = `
        SELECT 
            (SELECT id FROM companies WHERE name = ?) AS companyiD,
            (SELECT id FROM sector WHERE name = ?) AS sectoriD`;
    const checkValues = [company, sector];
    console.log(checkValues);
    db.query(checkForeignKeys, checkValues, (err, results) => {
        if (err) {
            return res.status(500).send('Error foreing key:');
        }

        const {companyiD, sectoriD} = results[0];
        console.log("companyID: ", companyiD , "sectorID: ", sectoriD);

        if (!companyiD || !sectoriD) {
            return res.status(400).send('Invalid foreing key.');
        }

        const updateQuery = `
            UPDATE advertisements SET title = ?, short_description = ?, description = ?, company = ?, localization = ?, salary = ?, contract_type = ?, working_time = ?, id_sector= ? WHERE id = ?`;
        const insertValues = [title, short_description, description, companyiD, localization, salary, contract_type, working_time, sectoriD, id];

        db.query(updateQuery, insertValues, (err, results) => {
            if (err) {
                console.log("error : " + err);
                return res.status(500).send('Error when adding data:');
            }
            res.status(200).send(true);
        });
    });
});

module.exports = router;
