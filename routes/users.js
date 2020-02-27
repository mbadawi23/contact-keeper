const express = require('express');
const router = express.Router();

// @route       POST api/users
// @desc        Register a user
// @access      Public
router.post('/', (req, res) => {
  // The slash here referes to 'api/users'. Defined by route in server.js
  res.send('Register a user.');
});

// export the router
module.exports = router;
