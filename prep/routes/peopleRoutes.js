//DB and ExpressJS & crypto (hash password)
const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const db = require('../db.js');

//HashPassword
function hashPassword(password){
    return crypto.createHash('sha256').update(password).digest('hex');
}

//Select ALL
router.get('/', (req, res) => { 
    const id = req.query.id;

    if (id){
        const query = 'SELECT * FROM people WHERE id = (?)';
        const values = [id];
    
        db.query(query, values, (err, results) => {
            if (err) {
                return res.status(500).send('Data recovery error');
            }
            res.json(results);
        });
    } else {
        const query = 'SELECT * FROM people';

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
    const { name, firstname, email} = req.body;
    const query = 'INSERT INTO people (name, firstname, email) VALUES (?, ?, ?)';
    const values = [name, firstname, email];

    db.query(query, values, (err, results) => {
        if (err) {
            return res.status(500).send('Error during adding data:');
        }
        res.status(200).send(true); 
    });
});

//Creating new account
router.post('/register', (req, res) => {
    const { name, firstname, email, password} = req.body;
    const query = 'INSERT INTO people (name, firstname, email, password, is_user) VALUES (?, ?, ?, ?, 1)';
    const values = [name, firstname, email, hashPassword(password)];

    db.query(query, values, (err, results) => {
        if (err) {
            return res.status(500).send('Error during register data :');
        }
        res.status(200).send(true);
    });
});

// Select Delete 1
router.delete('/remove', (req, res) => {
    const id = req.query.id;

    // Check ID
    if (!id) {
        return res.status(400).send('ID is needed');
    }

    const query = 'DELETE FROM people WHERE id = ?';
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

//Select Update 1
router.put('/update', (req, res) => {
    const id = req.query.id;
    const name = req.query.name;
    const firstname = req.query.firstname;
    const email = req.query.email;
    const password = req.query.password;

    if (!password){
        const query = 'UPDATE people SET name = ?, firstname = ?, email = ? WHERE id = ?';
        const values = [name, firstname, email, id];
    }else {
        const query = 'UPDATE people SET name = ?, firstname = ?, email = ?, password = ? WHERE id = ?';
        const values = [name, firstname, email, password, id];
    }

    db.query(query, values, (err, results) => {
        if (err) {
            return res.status(500).send('Error when updating data');
        }
        res.status(200).send(true);
    });
});



module.exports = router;
