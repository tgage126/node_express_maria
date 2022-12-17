const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser'); // Import the body-parser package
var cors = require('cors')

dotenv.config({path: '.env-local'});

const PORT = process.env.PORT || '3001';

const app = express();
app.use(cors()) // Use this after the variable declaration

/**
 * Middleware
 */

// Use the body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

/**
 * Routes
 */

app.get('/', (request, response) => {
    response.status(200).send("This is not why you're here. Head to /user/:id and replace :id with your user id")
})

const practitionerRouter = require('./routes/practitioner');
app.use('/practitioner',practitionerRouter);
const patientRouter = require('./routes/patient');
app.use('/patient',patientRouter);
const appointmentRouter = require('./routes/appointment');
app.use('/appointment',appointmentRouter);

/**Start listening */
app.listen(PORT, () => {
    console.log(`Listening for requests on port ${PORT}`)
})