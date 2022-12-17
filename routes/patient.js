const express = require('express');
const router = express.Router();
const pool = require('../helpers/database');

  
// Assign route
router.use('/query', (req, res, next) => {
  const filters = req.query;
  const filteredUsers = pool.filter(patient_id => {
    let isValid = true;
    for (key in filters) {
      console.log(key, patient_id[key], filters[key]);
      isValid = isValid && user[key] == filters[key];
    }
    return isValid;
  });
  const sqlQuery = 'SELECT * FROM patient WHERE' + filteredUsers;
  const rows = pool.query(sqlQuery, req.params.id);
  res.send(rows);
});

/* 
router.get('/:id', async function(req,res){
   
        const sqlQuery = 'SELECT patient_id, name_last, name_first FROM patient WHERE name_last=?';
        const rows = await pool.query(sqlQuery, req.params.id);
        console.log(sqlQuery);
        console.log(rows);
        res.send({ status: "OK", data: sqlQuery.json, data2: rows});
    
});
*/
//get all patient    
router.get('/all', async function(req,res){

        const sqlQuery = 'SELECT * FROM patient';
        const rows = await pool.query(sqlQuery, req.params.id);
        console.log(sqlQuery);
        console.log(rows);
        res.send({rows});
 
});
//get patient by name + id       
router.get('/name', async function(req,res){
   
    const sqlQuery = 'SELECT patient_id, name_last, name_first FROM patient';
    const rows = await pool.query(sqlQuery, req.params.id);
    console.log(sqlQuery);
    console.log(rows);
    res.send({ status: "OK", data: rows});
});

//get patient by name        
router.get('/name/:id', async function(req,res){
   
        const sqlQuery = 'SELECT name_last, patient_id FROM patient WHERE name_last=?';
        const rows = await pool.query(sqlQuery, req.params.id);
        console.log(sqlQuery);
        console.log(rows);
        res.send({rows});
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