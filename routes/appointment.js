const express = require('express');
const router = express.Router();
const pool = require('../helpers/database');

// Add
router.post('/add', function(req,res){
  
  // Split the practitioner and patient names into first and last names
  const practitioner = req.body.practitioner;
  const practitionerSplit = practitioner.split(" "); 
  const practitionerLast = practitionerSplit[1]; 
  const practitionerFirst = practitionerSplit[0]; 

  const patient = req.body.patient;
  const patientSplit = patient.split(" "); 
  const patientLast = patientSplit[1]; 
  const patientFirst = patientSplit[0]; 

  // Check if the practitioner and patient names are present
  if (req.body.practitioner && req.body.patient) {
    // Get the patient_id and practitioner_id values using the first and last names
    pool.query('SELECT patient_id FROM patient WHERE name_last = ? and name_first = ?', [patientLast, patientFirst], function(err, result) {
      if (err) {
        // Handle database error
        return res.status(500).send(err.message);
      }
      
      // Check if the patient and practitioner exist
      if (result.length === 0) {
        return res.status(404).send("Patient or practitioner not found");
      }

      // Insert the new appointment into the database
      pool.query('INSERT INTO appointment(patient_id, practitioner_id) VALUES (?,?)', [result[0].patient_id, result[0].practitioner_id], function(err) {
        if (err) {
          // Handle database error
          return res.status(500).send(err.message);
        }

        console.log("New appointment has been added");
        res.send("New appointment has been added for "+patient);
      });
    });
  } else {
    // Handle missing parameters
    res.status(400).send("BAD Request");
  }
});

module.exports = router;

