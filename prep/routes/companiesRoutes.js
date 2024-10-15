//DB and ExpressJS
const express = require('express');
const router = express.Router();
const db = require('../db.js');


//Select ALL
router.get('/', (req, res) => {
    const id = req.query.id;

    if (id){
        const query = 'SELECT * FROM companies WHERE id = (?)';
        const values = [id];
    
        db.query(query, values, (err, results) => {
            if (err) {
                return res.status(500).send('Data recovery error');
            }
            res.json(results);
        });
    } else {
        const query = 'SELECT * FROM companies';

        db.query(query, (err, results) => {
            if (err) {
                return res.status(500).send('Data recovery error');
            }
            res.json(results);
        });
    }
});

//Add new Companie
router.post('/add', (req, res) => {
    const { name, website } = req.body;
    const query = 'INSERT INTO companies (name, website) VALUES (?, ?)';
    const values = [name, website];

    db.query(query, values, (err, results) => {
        if (err) {
            return res.status(500).send('Error during adding data:');
        }
        res.status(200).send(true);
    });
});

//Remove Companie
router.delete('/remove', (req, res) => {
    const id = req.query.id;

    // Check ID
    if (!id) {
        return res.status(400).send('ID is needed');
    }

    const query = 'DELETE FROM companies WHERE id = ?';
    const values = [id];

    db.query(query, values, (err, results) => {
        if (err) {
            return res.status(500).send('Error when deleting data :');
        }

        // Check if ID exist
        if (results.affectedRows === 0) {
            return res.status(404).send('User ID not exist');
        }

        res.status(200).send(true);
    });
});

//Update 1
router.put('/update', (req, res) => {
    const id = req.query.id;
    const {name, website} = req.body;

    const query = 'UPDATE companies SET name = ?, website = ? WHERE id = ?';
    const values = [name, website, id];

    db.query(query, values, (err, results) => {
        if (err) {
            console.log(err)
            return res.status(500).send('Error when updating data :');
        }
        res.status(200).send(true);
    });
});

//Select 1 companie
router.get('/name', (req, res) => {
    const { name } = req.query.name;
    const query = 'SELECT * FROM companies WHERE name = (?)';
    const values = [name];
    db.query(query, values, (err, results) => {
        if (err) {
            return res.status(500).send('Data recovery error');
        }
        res.status(200).json(results);
    });
});
module.exports = router;