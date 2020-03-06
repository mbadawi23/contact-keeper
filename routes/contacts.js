const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const User = require('../models/User');
const Contact = require('../models/Contact');

/**
 * This is going to be a CRUD route,
 * so it will have all four requests:
 * get, post, put, delete
 */

// @route       GET api/contacts
// @desc        Get contacts
// @access      Private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(contacts);
  } catch (error) {
    console.log('error', error);
    res.status(500).send('Server Error.');
  }
});

// @route       POST api/contacts
// @desc        Add a new contact to contacts.
// @access      Private
router.post('/', (req, res) => {
  // The slash here referes to 'api/users'. Defined by route in server.js
  res.send('Add a new contact to contacts.');
});

// @route       PUT api/contacts/:id
// @desc        Update an existing contact.
// @access      Private
router.put('/:id', (req, res) => {
  // The slash here referes to 'api/users'. Defined by route in server.js
  res.send('Update an existing contact.');
});

// @route       DELETE api/contacts/:id
// @desc        Delete an existing contact.
// @access      Private
router.delete('/:id', (req, res) => {
  // The slash here referes to 'api/users'. Defined by route in server.js
  res.send('Delete an existing contact.');
});

// export the router
module.exports = router;
