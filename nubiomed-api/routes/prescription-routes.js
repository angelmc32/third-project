const express = require('express');                             // Import express for router functionality through its Router method
const router = express.Router();                                // Execute express router and store it into router const
const Prescription = require('../models/Prescription');         //

// Import helper for token verification (jwt)
const { verifyToken } = require('../helpers/auth-helper');

router.get('/', verifyToken, (req, res, next) => {

  const { id, usertype } = req.user;

  if ( usertype === 'Doctor' ) {

    Prescription.find({ doctor: id })
    .populate('patient')
    .then( prescriptions => {

      res.status(200).json({ prescriptions });

    })
    .catch( error => {

      res.status(500).json({ error, msg: 'Unable to retrieve data' }); // Respond 500 status, error and message

    });

  } else {

    Prescription.find({ patient: id })
    .populate('doctor')
    .then( prescriptions => {

      res.status(200).json({ prescriptions });

    })
    .catch( error => {

      res.status(500).json({ error, msg: 'Unable to retrieve data' }); // Respond 500 status, error and message

    });

  }

});

router.post('/', verifyToken, (req, res, next) => {

  const { id } = req.user;

  Prescription.create({ ...req.body, doctor: id })
  .then( prescription => {

    res.status(200).json({ prescription });

  })
  .catch( error => {

    res.status(500).json({ error, msg: 'Unable to create prescription' }); // Respond 500 status, error and message

  });

});

module.exports = router;