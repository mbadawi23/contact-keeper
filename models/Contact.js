const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true); // Gets rid of deprecation warning.

const ContactSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  phone: {
    type: String
  },
  type: {
    type: String,
    default: 'personal'
  },
  notes: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('contact', ContactSchema);
