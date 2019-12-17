const express = require('express');               // Import express for router functionality through its Router method
const router = express.Router();                  // Execute express router and store it into router const
const Consultation = require('../models/Consultation');         // Require the Event model to perform CRUD operations

// Import helper for token verification (jwt)
const { verifyToken } = require('../helpers/auth-helper');

// Route to get user events
router.get('/doctor', verifyToken, (req, res, next) => {

  const { id } = req.user;    // Destructure the user id from the request

  Consultation.find({ doctor: id })
  .populate('patient', 'email first_name last_name1 date_of_birth')
  .then( consultations => {

    res.status(200).json({ consultations });

  })
  .catch( error => {

    res.status(500).json({ error, msg: 'Unable to retrieve data' }); // Respond 500 status, error and message

  });

});

// Route to get user events
router.get('/doctor/:patientID', verifyToken, (req, res, next) => {

  const { patientID } = req.params;    // Destructure the user id from the request

  Consultation.find({ patient: patientID })
  .then( consultations => {

    res.status(200).json({ consultations });

  })
  .catch( error => {

    res.status(500).json({ error, msg: 'Unable to retrieve data' }); // Respond 500 status, error and message

  });

});

// Route to get user events
router.get('/patient', verifyToken, (req, res, next) => {

  const { id } = req.user;    // Destructure the user id from the request

  Consultation.find({ patient: id })
  .populate('doctor', 'email first_name last_name1')
  .then( consultations => {

    res.status(200).json({ consultations });

  })
  .catch( error => {

    res.status(500).json({ error, msg: 'Unable to retrieve data' }); // Respond 500 status, error and message

  });

});

// Route to get user events
router.get('/patient/:doctorID', verifyToken, (req, res, next) => {

  const { doctorID } = req.params;    // Destructure the user id from the request

  Consultation.find({ doctor: doctorID })
  .then( consultations => {

    res.status(200).json({ consultations });

  })
  .catch( error => {

    res.status(500).json({ error, msg: 'Unable to retrieve data' }); // Respond 500 status, error and message

  });

});

router.post('/patient/:doctorID', verifyToken, (req, res, next) => {

  //const { id } = req.user;    // Destructure the user id from the request
  const { doctorID } = req.params;    // Destructure the user id from the request

  Consultation.create({ ...req.body, doctor: doctorID })
  .then( consultation => {

    res.status(200).json({ consultation });
    console.log(consultation);

  })
  .catch( error => {

    res.status(500).json({ error, msg: 'Unable to create consultation' }); // Respond 500 status, error and message
    console.log(error);

  });

});

router.post('/doctor', verifyToken, (req, res, next) => {

  const { id } = req.user;    // Destructure the user id from the request

  Consultation.create({ ...req.body, doctor: id })
  .then( consultation => {

    res.status(200).json({ consultation });
    console.log(consultation);

  })
  .catch( error => {

    res.status(500).json({ error, msg: 'Unable to create consultation' }); // Respond 500 status, error and message
    console.log(error);

  });

});

module.exports = router;