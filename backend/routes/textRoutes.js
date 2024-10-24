const express = require('express');
const { spawn } = require('child_process');  // Import child_process to spawn Python process
const Text = require('../models/Text');

const router = express.Router();

// POST route to convert text to handwriting
router.post('/', async (req, res) => {
  const { text, handwritingStyle } = req.body;

  // Check for missing fields
  if (!text || !handwritingStyle) {
    return res.status(400).json({ success: false, message: 'Text and handwriting style are required' });
  }

  try {
    // Save text and handwriting style to the database
    const newText = new Text({
      text,
      handwritingStyle,
    });
    await newText.save();

    // Call Python script to convert the text
    const python = spawn('python', ['convert_to_handwritten.py', text, handwritingStyle]);

    // Capture the output from the Python script
    python.stdout.on('data', (data) => {
      const convertedText = data.toString().trim(); // Trim any whitespace

      res.status(200).json({
        success: true,
        message: 'Text converted successfully',
        convertedText,
      });
    });

    // Handle any errors
    python.stderr.on('data', (data) => {
      console.error(`Python error: ${data}`);
      res.status(500).json({ success: false, message: 'Error during conversion' });
    });

    // Handle process exit
    python.on('close', (code) => {
      if (code !== 0) {
        res.status(500).json({ success: false, message: 'Python process exited with code ' + code });
      }
    });

  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
