const express = require('express');
const router = express.Router();
const pool = require('../helpers/database');


//get practitioner by id
router.get('/:id', async function(req,res){
    try {
        const sqlQuery = 'SELECT id, name_last, name_first FROM practitioners WHERE id=?';
        const rows = await pool.query(sqlQuery, req.params.id);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message)
    }


    res.status(200).json({id:req.params.id})
});

//get all practitioners         
router.get('/all/:id', async function(req,res){
    try {
        const sqlQuery = 'SELECT * FROM practitioners';
        const rows = await pool.query(sqlQuery, req.params.id);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message)
    }


    res.status(200).json({id:req.params.id})
});

/*
router.post('/addpractitioner', async function(req,res) {
    
    try {
        const {name_last,name_first} = req.body;
        const sqlQuery = 'INSERT INTO practitioners (name_last, name_first) VALUES (?,?)';
        const result = await pool.query(sqlQuery, [name_last, name_first]);

        res.status(200).json({practitionerId: result.insertId});
    } catch (error) {
        res.status(400).send(error.message)
    }

})
*/

module.exports = router;