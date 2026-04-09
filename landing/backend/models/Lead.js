const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  email:     { type: String, required: true, lowercase: true, trim: true, unique: true },
  plan:      { type: String, default: 'free', enum: ['free','silver','gold'] },
  source:    { type: String, default: 'landing' },
  ip:        { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Lead', leadSchema);
