const mongoose = require('mongoose');

const textSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  handwritingStyle: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Text = mongoose.model('Text', textSchema);
module.exports = Text;
