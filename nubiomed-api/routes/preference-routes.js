const express = require('express');                 // Import express for router functionality through its Router method
const router = express.Router();                    // Execute express router and store it into router const
const Preference =require('../models/Preference')   // Require the Preference model to perform CRUD operations
const Doctor = require('../models/Doctor');         // Require the Doctor model to find users references in database
const Curriculum = require('../models/Curriculum'); // Require the Curriculum model to perform CRUD operations

// Import helper for token verification (jwt)
const { verifyToken } = require('../helpers/auth-helper');

router.get('/', verifyToken, (req, res, next) => {

  const { id } = req.user;    // Destructure the user id from the request

  Preference.findOne({ doctor: id })
  .then( preferences => {

    res.status(200).json({ preferences });

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

    Preference.findOneAndUpdate( id, { $push: {facilities: facilityID}, doctor: id }, { new: true}  )
    .then( preferences => {

      res.status(200).json({ preferences });

    })
    .catch( error => {

      res.status(500).json({ error, msg: 'Unable to update preferences' }); // Respond 500 status, error and message

    });

  } else {

    Preference.findOneAndUpdate( {doctor: id}, { $set: { ...req.body }, doctor: id }, { new: true}  )
    .then( preferences => {

      res.status(200).json({ preferences });

    })
    .catch( error => {

      res.status(500).json({ error, msg: 'Unable to update preferences' }); // Respond 500 status, error and message

    });
  };

});

router.get('/cv', verifyToken, (req, res, next) => {

  const { id, usertype } = req.user;    // Destructure the user id from the request
  let { doctorID } = req.body;

  Curriculum.findOne({ doctor: id })
  .then( curriculum => {

    res.status(200).json({ curriculum });

  })
  .catch( error => {

    res.status(500).json({ error, msg: 'Unable to retrieve data' }); // Respond 500 status, error and message

  });
  
});

router.get('/cv/:doctorID', verifyToken, (req, res, next) => {

  let { doctorID } = req.params;

  Curriculum.findOne({ doctor: doctorID })
  .then( curriculum => {

    res.status(200).json({ curriculum });

  })
  .catch( error => {

    res.status(500).json({ error, msg: 'Unable to retrieve data' }); // Respond 500 status, error and message

  });
  
});

router.post('/cv', verifyToken, (req, res, next) => {

  const { id } = req.user;    // Destructure the user id from the request

  Curriculum.create({ ...req.body, doctor: id })
  .then( preferences => {

    res.status(200).json({ preferences });

  })
  .catch( error => {

    res.status(500).json({ error, msg: 'Unable to create curriculum' }); // Respond 500 status, error and message

  });

});

module.exports = router;