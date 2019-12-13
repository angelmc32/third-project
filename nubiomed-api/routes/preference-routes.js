const express = require('express');                 // Import express for router functionality through its Router method
const router = express.Router();                    // Execute express router and store it into router const
const Preference =require('../models/Preference')   // Require the Preference model to perform CRUD operations
const Doctor = require('../models/Doctor');         // Require the Doctor model to create and find users in database

// Import helper for token verification (jwt)
const { verifyToken } = require('../helpers/auth-helper');

router.get('/', verifyToken, (req, res, next) => {

  const { id } = req.user;    // Destructure the user id from the request

  Preference.findOne({ doctor: id })
  .then( preferences => {

    res.status(200).json({ preferences });
    console.log(preferences);

  })
  .catch( error => {

    res.status(500).json({ error, msg: 'Unable to retrieve data' }); // Respond 500 status, error and message

  });
  
});

router.post('/', verifyToken, (req, res, next) => {

  const { id } = req.user;    // Destructure the user id from the request

  Preference.create({ ...req.body, doctor: id })
  .then( preferences => {

    res.status(200).json({ preferences });

  })
  .catch( error => {

    res.status(500).json({ error, msg: 'Unable to create preferences' }); // Respond 500 status, error and message

  });

});

router.patch('/', verifyToken, (req, res, next) => {

  const { id } = req.user;    // Destructure the user id from the request
  console.log(req.body)
  const { key } = req.body;

  if ( key === 'facilities' ) {

    const { facilityID } =  req.body;
    console.log(`adding this facility to favs: ${facilityID}`);

    Preference.findOneAndUpdate( id, { $push: {facilities: facilityID}, doctor: id }, { new: true}  )
    .then( preferences => {

      res.status(200).json({ preferences });
      console.log(preferences);

    })
    .catch( error => {

      res.status(500).json({ error, msg: 'Unable to update preferences' }); // Respond 500 status, error and message

    });

  } else {

    Preference.findOneAndUpdate( {doctor: id}, { $set: { ...req.body }, doctor: id }, { new: true}  )
    .then( preferences => {

      res.status(200).json({ preferences });
      console.log(preferences);

    })
    .catch( error => {

      res.status(500).json({ error, msg: 'Unable to update preferences' }); // Respond 500 status, error and message

    });
  };

});

module.exports = router;