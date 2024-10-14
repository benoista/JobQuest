
const express = require('express');
const router = express.Router();
const db = require('../db.js');
const {authorizeAdmin, getUserId} = require("../auth");

/**
 * Select ALL applications in the database
 * this route is reserved for administrators
 */

router.get('/', (req, res) => {

    if (!authorizeAdmin(req)){return res.status(401).send("Unauthorized")} // Check if the user is an administrator

    const query = 'SELECT * FROM applications';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send('Data recovery error');
        }
        res.status(200).json(results);
    });
});


/**
 * Select all applications for a specific advertisement
 * this route is reserved for administrators
 */
router.get('/advertisement', (req, res) => {
    if (!authorizeAdmin(req)){return res.status(401).send("Unauthorized")} // Check if the user is an administrator
    const id = req.query.id;
    if (!id) {
        return res.status(400).send('ID is needed');
    }
    const query = 'SELECT * FROM applications WHERE id_ads = (?)';
    const values = [id];
    db.query(query, values, (err, results) => {
        if (err) {
            return res.status(500).send('Data recovery error');
        }
        res.status(200).json(results);
    });
});

/**
 * Select all applications for a specific person
 * this route is reserved for user who is the owner of the application
 *
 * STEPS:
 * get the token from the cookie
 * then select the person_id from the token
 * then select all applications for the person_id
 */
router.get('/myApplications', (req, res) => {

    const token = req.cookies["token"];
    if (token === "" || token === undefined) {
        return res.status(401).send("Unauthorized")
    }
    const id = getUserId(token);

    const query = 'SELECT id_ads, (SELECT title FROM advertisements WHERE advertisements.id = applications.id_ads) as ads, message FROM applications WHERE id_people = (?)';
    const values = [id];

    db.query(query, values, (err, results) => {
        if (err) {
            return res.status(500).send('Data recovery error');
        }
        res.json(results);
    });
});

/**
 * Add a new application
 * if the user is not an administrator, he can only add an application for himself
 */
router.post('/add', (req, res) => {

    // get the user id from the token and check if the user is connected
    const token = req.cookies["token"];
    console.log(token);
    if (token === "" || token === undefined) {
        return res.status(401).send("Unauthorized")
    }
    const userId = getUserId(token);


    const { advertId, message } = req.body;
    const query = 'INSERT INTO applications (id_ads, id_people, message) VALUES (?, ?, ?)';
    const values = [advertId, userId, message];

    db.query(query, values, (err, results) => {
        if (err) {
            return res.status(500).send('Error during adding data:');
        }
        res.status(200).send(true);
    });
});

/**
 * Add a new application for any user
 * this route is reserved for administrators
 */
router.post('/admin/add', (req, res) => {


    if (!authorizeAdmin(req)){return res.status(401).send("Unauthorized")}


    const { advertId, userId, message } = req.body;
    const query = 'INSERT INTO applications (id_ads, id_people, message) VALUES (?, ?, ?)';
    const values = [advertId, userId, message];

    db.query(query, values, (err, results) => {
        if (err) {
            return res.status(500).send('Error during adding data:');
        }
        res.status(200).send(true);
    });
});


/**
 * Remove an application
 * if the user is not an administrator, he can only remove an application for himself
 */
router.delete('/remove', (req, res) => {
    // get the user id from the token and check if the user is connected
    const token = req.cookies["token"];
    if (token === "" || token === undefined) {
        return res.status(401).send("Unauthorized")
    }
    const userId = getUserId(token);

    // in Delete the id is passed in query params
    const advertId = req.query.advertId;

    const query = 'DELETE FROM applications WHERE (id_ads,id_people) = (?, ?)';
    const values = [advertId, userId];

    db.query(query, values, (err, results) => {
        console.log(query);
        console.log(values);
        if (err) {
            return res.status(500).send('Error when deleting data :');
        }
        res.status(200).send("Application deleted");
    });
});


/**
 * Remove an application
 * if the user is not an administrator, he can only remove an application for himself
 */
router.delete('/admin/remove', (req, res) => {

    if (!authorizeAdmin(req)){return res.status(401).send("Unauthorized")}

    // in Delete the id is passed in query params
    const advertId = req.query.advertId;
    const userId = req.query.userId;

    const query = 'DELETE FROM applications WHERE (id_ads,id_people) = (?, ?)';
    const values = [advertId, userId];

    db.query(query, values, (err, results) => {
        if (err) {
            return res.status(500).send('Error when deleting data :');
        }
        res.status(200).send("Application deleted");
    });
});


/**
 * Update an application
 * if the user is not an administrator, he can only update an application for himself
 */
router.put('/update', (req, res) => {
    // get the user id from the token and check if the user is connected
    const token = req.cookies["token"];
    if (token === "" || token === undefined) {
        return res.status(401).send("Unauthorized")
    }
    const userId = getUserId(token);

    const {advertId, message} = req.body;
    const query = 'UPDATE applications SET message = ? WHERE (id_ads, id_people) = (?, ?)';
    const values = [message, advertId, userId];

    db.query(query, values, (err, results) => {
        if (err) {
            return res.status(500).send('Error during updating data:');
        }
        res.status(200).send("Message updated");
    });
});

/**
 * Update any application given the advertId and userId
 * this route is reserved for administrators
 */
router.put('/admin/update', (req, res) => {

    if (!authorizeAdmin(req)){return res.status(401).send("Unauthorized")}

    const {advertId, userId, message} = req.body;
    const query = 'UPDATE applications SET message = ? WHERE (id_ads, id_people) = (?, ?)';
    const values = [message, advertId, userId];

    db.query(query, values, (err, results) => {
        if (err) {
            return res.status(500).send('Error during updating data:');
        }
        res.status(200).send("Message updated");
    });
});





module.exports = router;