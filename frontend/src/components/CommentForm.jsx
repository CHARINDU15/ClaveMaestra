// frontend/src/components/CommentForm.jsx
import { useState } from 'react';
import api from '../services/api';
import PropTypes from 'prop-types';

const CommentForm = ({ resourceId }) => {
  const [text, setText] = useState('');
 
  const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting comment...', token);
    console.log('Resource ID:', resourceId);
    try {
      await api.post('/resources/comment', { resourceId, text }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setText('');
      // Refresh comments or handle in parent component
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="comment">
          Add Comment
        </label>
        <textarea
          id="comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Comment
      </button>
    </form>
  );
};
CommentForm.propTypes = {
  resourceId: PropTypes.string.isRequired,
};

export default CommentForm;
