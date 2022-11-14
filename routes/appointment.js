const express = require('express');
const router = express.Router();
const pool = require('../helpers/database');


//select appointment by id
router.get('/:id', async function(req,res){
    try {
        const sqlQuery = 'SELECT appointment.appointment_id,patient.name_last,patient.name_first,practitioner.name_last as practitioner_last,practitioner.name_first as practitioner_first,appointment.day,appointment.start_time,appointment.end_time,appointment.notes FROM appointment INNER JOIN patient ON appointment.patient_id=patient.patient_id INNER JOIN practitioner ON appointment.practitioner_id=practitioner.practitioner_id WHERE appointment_id=?';
        const rows = await pool.query(sqlQuery, req.params.id);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message)
    }


    res.status(200).json({id:req.params.id})
});

//add new appointment
router.post('/add', async function(req,res) {
    
    try {
        const {patient_id,practitioner_id,day,start_time,end_time,notes} = req.body;
        const sqlQuery = 'INSERT INTO appointment (patient_id,practitioner_id,day,start_time,end_time,notes) VALUES (?,?,?,?,?,?)';
        const result = await pool.query(sqlQuery, [patient_id,practitioner_id,day,start_time,end_time,notes]);

        res.status(200).json({appointmentId: result.insertId});
    } catch (error) {
        res.status(400).send(error.message)
    }

})


module.exports = router;