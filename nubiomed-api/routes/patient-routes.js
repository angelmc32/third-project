const express = require('express');               // Import express for router functionality through its Router method
const router = express.Router();                  // Execute express router and store it into router const
const Patient = require('../models/Patient');   // Require the User model to create and find users in database

// Import helpers for token verification (jwt) and cloudinary uploader (multer+cloudinary)
const { verifyToken } = require('../helpers/auth-helper');

router.get('/', (req, res, next) => {

  Patient.find()
  // .populate('consultations')
  .then( patients => {

    res.status(200).json({ patients });

  })
  .catch( error => {

    res.status(500).json({ error, msg: 'Unable to retrieve all patients from DB'});
    console.log(error);

  });

});

router.get('/:patientID', (req, res, next) => {

  const { patientID } = req.params;

  Patient.findOne({ _id: patientID })
  .populate('consultations')
  .then( patient => {

    res.status(200).json({ patient });

  })
  .catch( error => {

    res.status(500).json({ error, msg: 'Unable to retrieve patient information'});

  })
})

module.exports = router;