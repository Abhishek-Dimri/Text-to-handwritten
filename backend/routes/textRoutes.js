const express = require('express');
const { spawn } = require('child_process');
const Text = require('../models/Text');

const router = express.Router();

// POST route to convert text to handwriting
router.post('/', async (req, res) => {
  const { text, handwritingStyle } = req.body;

  if (!text || !handwritingStyle) {
    return res.status(400).json({ success: false, message: 'Text and handwriting style are required' });
  }

  try {
    const newText = new Text({ text, handwritingStyle });
    await newText.save();

    // Call Python script
    const python = spawn('python', ['convert_to_handwritten.py', text, handwritingStyle]);

    // Capture Python script output
    python.stdout.on('data', (data) => {
      const convertedText = data.toString().trim();
      // Send response here
      res.status(200).json({
        success: true,
        message: 'Text converted successfully',
        convertedText, // Should contain the path to the handwritten image
      });
    });

    // Handle errors in Python script
    python.stderr.on('data', (data) => {
      console.error(`Python error: ${data}`);
      if (!res.headersSent) {
        res.status(500).json({ success: false, message: 'Error during conversion' });
      }
    });

    // Handle process exit (only log, don't send a new response)
    python.on('close', (code) => {
      if (code !== 0 && !res.headersSent) {
        console.error(`Python process exited with code ${code}`);
      }
    });

  } catch (err) {
    console.error('Error:', err);
    if (!res.headersSent) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
});

module.exports = router;
