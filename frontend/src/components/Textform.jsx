import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setText, setStyle } from '../redux/actions/textActions'; // Make sure these actions are defined and imported

const TextForm = () => {
  const dispatch = useDispatch();
  const { text, style } = useSelector((state) => state.textData); // Ensure textData is correctly initialized in the Redux state

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState('');  // State to store the image URL

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/api/text', {
        text,
        handwritingStyle: style,
      });

      // Assuming response.data contains the image file name (e.g., "handwritten_text.png")
      // Append a timestamp to the image URL to avoid caching issues
      const uniqueImageUrl = `http://localhost:5000/images/${response.data.convertedText}?t=${new Date().getTime()}`;
      setImageUrl(uniqueImageUrl);
    } catch (err) {
      setError('Error submitting text. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Text to Handwriting Converter</h1>
      
      <textarea
        value={text}
        onChange={(e) => dispatch(setText(e.target.value))}  // Dispatch action to update text
        placeholder="Enter your text here"
      />

      <select
        value={style}
        onChange={(e) => dispatch(setStyle(e.target.value))}  // Dispatch action to update handwriting style
      >
        <option value="default">Default</option>
        <option value="cursive">Cursive</option>
        {/* Add more style options as needed */}
      </select>

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Converting...' : 'Convert Text'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display the image if it's generated */}
      {imageUrl && (
        <div>
          <h2>Generated Handwritten Image:</h2>
          <img src={imageUrl} alt="Handwritten Text" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
      )}
    </div>
  );
};

export default TextForm;
