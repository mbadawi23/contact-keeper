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
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Please provide a name.')
        .not()
        .isEmpty(),
      check('email', 'A valid email is required.').isEmail()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, phone, address, type, notes } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        address,
        type,
        notes,
        user: req.user.id
      });

      const contact = await newContact.save();
      res.json(contact);
    } catch (error) {
      console.log('error', error);
      res.status(400).send('Server Error');
    }
  }
);

// @route       PUT api/contacts/:id
// @desc        Update an existing contact.
// @access      Private
router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, address, type, notes } = req.body;

  const contactFields = {};

  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (address) contactFields.address = address;
  if (type) contactFields.type = type;
  if (notes) contactFields.notes = notes;

  try {
    let contact = await Contact.findById(req.params.id);
    console.log('contact', contact);

    if (!contact) return res.status(404).json({ msg: 'Contact not found.' });

    // Make sure that the user is the owner of the contact.
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized.' });
    }

    console.log('req.params.id', req.params.id);
    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true } // Update options: if field doesn't exist, create new.
    );

    console.log('contact', contact);

    res.json(contact);
  } catch (error) {
    console.log('error', error);
    res.status(400).send('Server Error');
  }
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
