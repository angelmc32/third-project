const express = require('express');               // Import express for router functionality through its Router method
const router = express.Router();                  // Execute express router and store it into router const
const Doctor = require('../models/Doctor');   // Require the User model to create and find users in database

// Import helpers for token verification (jwt) and cloudinary uploader (multer+cloudinary)
const { verifyToken } = require('../helpers/auth-helper');

router.get('/', (req, res, next) => {

  Doctor.find()
  .then( doctors => {

    res.status(200).json({ doctors });

  })
  .catch( error => {

    res.status(500).json({ error, msg: 'Unable to retrieve all doctors from DB'});

  });

});

router.get('/:doctorID', (req, res, next) => {

  const { doctorID } = req.params;

  Doctor.findOne({ _id: doctorID })
  .then( doctor => {

    res.status(200).json({ doctor });

  })
  .catch( error => {

    res.status(500).json({ error, msg: 'Unable to retrieve doctor information'});

  })
})

module.exports = router;