const express = require('express');                             // Import express for router functionality through its Router method
const router = express.Router();                                // Execute express router and store it into router const
const Consultation = require('../models/Consultation');         // Require the Event model to perform CRUD operations
const Facility = require('../models/Facility');                 //

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
    console.log(error)

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

// Route to create consultation by Patient
router.post('/patient/:doctorID', verifyToken, (req, res, next) => {

  //const { id } = req.user;          // Destructure the user id from the request
  const { doctorID } = req.params;    // Destructure the user id from the request
  let assignedFacility;
  const { date } = req.body;

  Facility.find({ dates: { $ne: date } })
  .then( availableFacilities => {

    assignedFacility = availableFacilities[0];

    const { _id } = assignedFacility;

    Consultation.create({ ...req.body, doctor: doctorID, facility: _id })
    .then( consultation => {

      Facility.findByIdAndUpdate( _id, { $push: {consultations: consultation._id, dates: consultation.date} }, { new: true } )
      .then( facility => console.log(facility) );

      res.status(200).json({ consultation });

    })
    .catch( error => {

      res.status(500).json({ error, msg: 'Unable to create consultation' }); // Respond 500 status, error and message
      console.log(error);

    });
    

  })
  .catch( error => {

    res.status(500).json({ error, msg: 'Unable to create consultation' }); // Respond 500 status, error and message
    console.log(error);

  });

});

router.post('/doctor', verifyToken, (req, res, next) => {

  const { id } = req.user;    // Destructure the user id from the request
  let assignedFacility;
  const { date } = req.body;

  Facility.find({ dates: { $ne: date } })
  .then( availableFacilities => {

    assignedFacility = availableFacilities[0];

    const { _id } = assignedFacility;

    Consultation.create({ ...req.body, doctor: id, facility: _id })
    .then( consultation => {

      Facility.findByIdAndUpdate( _id, { $push: {consultations: consultation._id, dates: consultation.date} }, { new: true } )
      .then( facility => console.log(facility) );

      res.status(200).json({ consultation });

    })
    .catch( error => {

      res.status(500).json({ error, msg: 'Unable to create consultation' }); // Respond 500 status, error and message
      console.log(error);

    });
  })
  .catch( error => {

    res.status(500).json({ error, msg: 'Unable to create consultation' }); // Respond 500 status, error and message
    console.log(error);

  });

  

});

router.get('/:consultationID', verifyToken, (req, res, next) => {

  const { consultationID } = req.params;

  Consultation.findById(consultationID)
  .populate('patient')
  .then( consultation => {

    res.status(200).json({ consultation });

  })
  .catch( error => {

    res.status(500).json({ error, msg: 'Unable to retrieve data' }); // Respond 500 status, error and message

  });

});

router.patch('/:consultationID', verifyToken, (req, res, next) => {

  const { consultationID } = req.params;

  Consultation.findByIdAndUpdate(consultationID, { $set: { ...req.body }, isDone: true }, { new: true} )
  .populate('patient')
  .then( consultation => {

    res.status(200).json({ consultation });

  })
  .catch( error => {

    res.status(500).json({ error, msg: 'Unable to retrieve data' }); // Respond 500 status, error and message

  });

});


module.exports = router;