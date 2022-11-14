const express = require('express');
const dotenv = require('dotenv');

dotenv.config({path: '.env-local'});

const PORT = process.env.PORT || '3001';

const app = express();


/**
 * Middleware
 */
app.use(express.json());
app.use(express.urlencoded({extended:false}));

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