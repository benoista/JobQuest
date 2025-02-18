//DB and ExpressJS & crypto (hash password)
const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const db = require('../db.js');
//JWT
const jwt = require('jsonwebtoken');
const {getUserId, authorizeAdmin} = require("../auth");

//Get .env
require('dotenv').config()
//HashPassword
function hashPassword(password){
    return crypto.createHash('sha256').update(password).digest('hex');
}

//const secretKey = crypto.randomBytes(64).toString('hex');
const secretKey = process.env.DB_HOST;

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


router.get('/me', (req, res) => {
    const token = req.cookies["token"];
    if (token === "" || token === undefined){return res.status(401).send("Unauthorized")}

    const id = getUserId(token);
    const query = 'SELECT * FROM people WHERE id = (?)';
    const values = [id];

    db.query(query, values, (err, results) => {
        if (err) {
            return res.status(500).send('Data recovery error');
        }
        res.json(results);
    });
});

router.get('/isadmin', (req, res) => {
    if (authorizeAdmin(req)){
        res.status(200).send("You are an admin");
    }
    else {
        res.status(401).send("You are not an admin");
    }
});


//Add new person 
router.post('/add', (req, res) => {
    const { name, firstname, email} = req.body;
    const query = 'INSERT INTO people (name, firstname, email, is_user, password) VALUES (?, ?, ?, 0, "")';
    const values = [name, firstname, email];

    db.query(query, values, (err, results) => {
        if (err) {
            console.log(err)
            return res.status(500).send('Error during adding data:');
        }
        res.status(200).send(true); 
    });
});

//Creating new account
router.post('/register', (req, res) => {
    const { name, firstname, email, password} = req.body;

    const checkEmailQuery = 'SELECT * FROM people WHERE email = ?';
    db.query(checkEmailQuery, [email], (err, results) => {
        if (err) {
            return res.status(500).send('Error checking email: ' + err.message);
        }

        if (results.length > 0) {
            return res.status(409).send('Email already exists.');
        }

        const query = 'INSERT INTO people (name, firstname, email, password, is_user) VALUES (?, ?, ?, ?, 1)';
        const values = [name, firstname, email, hashPassword(password)];

        db.query(query, values, (err, results) => {
            if (err) {
                return res.status(500).send('Error during register data: ' + err.message);
            }
            res.status(200).send(true);
        });
    });
});

//Login account
router.post('/login', (req, res) => {
    const { email, password} = req.body;    
    const query = 'SELECT id, is_admin FROM people WHERE email = ? AND password = ?';
    const values = [email, hashPassword(password)];
    db.query(query, values, (err, results) => {
        if (err) {
            return res.status(500).send('Error during register data :');
        }
        if (results.length === 0){
            return res.status(500).send('Invalid Email or Password :');
        } else{
            const token = jwt.sign({ userId: results[0].id, isAdmin: results[0].is_admin}, secretKey, {expiresIn: '1h',});
            res.status(200).json({token});
        }
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
    const { id, name, firstname, email, current, newPassword } = req.body;
    if (!current && !newPassword){
        const query = 'UPDATE people SET name = ?, firstname = ?, email = ? WHERE id = ?';
        const values = [name, firstname, email, id];
        db.query(query, values, (err, results) => {
            if (err) {
                return res.status(404).send('Error when updating data');
            }
            res.status(200).send(true);
        });
    }else {
        const test = hashPassword(current);
        const query = 'UPDATE people SET password = ? WHERE id = ? AND password = ?';
        const values = [hashPassword(newPassword), id, test];
        console.log(query);
        console.log(values);
        db.query(query, values, (err, results) => {
            if (err) {
                return res.status(404).send('Error when updating data');
            }
            if (results.affectedRows === 0) {
                return res.status(400).send('No rows updated, possibly incorrect ID');
            }
            res.status(200).send(true);
        });
    }

});

/*
const id = req.query.id;
    if (!id) {
        return res.status(400).send('ID is needed');
    }

    const { name, firstname, email, password} = req.body;
    let query = "";
    let values = [];
    if (!password){
         query = 'UPDATE people SET name = ?, firstname = ?, email = ? WHERE id = ?';
         values = [name, firstname, email, id];
    } else {
         query = 'UPDATE people SET name = ?, firstname = ?, email = ?, password = ? WHERE id = ?';
         values = [name, firstname, email, password, id];
    }

    db.query(query, values, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error when updating data');
        }
        res.status(200).send(true);
    });
   */



module.exports = router;
