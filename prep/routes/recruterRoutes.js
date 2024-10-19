//DB and ExpressJS & crypto (hash password)
const express = require('express');
const router = express.Router();
const db = require('../db.js');
const {getUserId} = require("../auth");


//Get .env
require('dotenv').config()


//Select ALL
router.get('/getCompanyByRecruter', (req, res) => {

    const token = req.cookies["token"];
    if (token === "" || token === undefined) {
        return res.status(401).send("Unauthorized")
    }
    const userId = getUserId(token);

    //response get only 1 result
    const query = 'SELECT companies.name FROM recruter JOIN companies ON companies.id = id_comp WHERE id_people = (?)';
    const values = [userId];

    db.query(query, values, (err, results) => {
        if (err) {
            return res.status(500).send('Data recovery error');
        }
        if (results.length === 0) {
            return res.status(404).send('No company found for the given recruiter.');
        }
        res.json(results[0]);
    });
});



module.exports = router;
