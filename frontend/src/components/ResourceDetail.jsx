import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuthStore } from '../store/authStore';
import api from '../services/api';
import CommentForm from './CommentForm';
import Reaction from './Reaction';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa'; // import icons from react-icons or use emojis directly



const ResourceDetail = ({ resource }) => {
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(resource.title);
  const [content, setContent] = useState(resource.content);
  
  const [hasLiked, setHasLiked] = useState(false);
  const [comments] = useState(resource.comments);
  const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
  const [likes] = useState(resource.reactions.filter(r => r.type === 'like').length);
  const [unlikes] = useState(resource.reactions.filter(r => r.type === 'unlike').length);
  useEffect(() => {
    // Check if the user has liked the resource
    if (resource.reactions.some(reaction => reaction.user === user?._id)) {
      setHasLiked(true);
      
    }
  }, [resource.reactions, user]);

  const handleDelete = async () => {
    try {
      await api.delete(`/resources/${resource._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Optionally trigger an update in the parent component here
    } catch (error) {
      console.error('Error deleting resource:', error);
      console.log(hasLiked);
    }
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/resources/${resource._id}`, { title, content }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsEditing(false);
      // Optionally trigger an update in the parent component here
    } catch (error) {
      console.error('Error updating resource:', error);
    }
  };

  // const handleLike = async () => {
  //   try {
  //     const response = await api.post(`/resources/${resource._id}/like`, {}, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     setLikes(response.data.likes); // Update the number of likes from the response
  //     setHasLiked(!hasLiked); // Toggle the like state
  //   } catch (error) {
  //     console.error('Error liking resource:', error);
  //   }
  // };

  return (
    <div className="bg-gradient-to-r from-blue-100 to-indigo-200 shadow-lg rounded-lg p-6 mb-4 resize">
      {isEditing ? (
        <>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Edit Resource</h3>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-400 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            placeholder="Resource Title"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border border-gray-400 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            rows="4"
            placeholder="Resource Content"
          />
          <div className="flex justify-between mt-4">
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-150 shadow-lg"
              onClick={handleUpdate}
            >
              Save Changes
            </button>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-150 shadow-lg"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{resource.title}</h2>
          <p className="text-gray-700 mb-4">{resource.content}</p>
          <p className="text-gray-600 mb-2">
            Posted by: <strong>{resource.createdBy.name}</strong>
          </p>
          <div className="flex items-center justify-between my-4">
               <div className="flex items-center justify-between my-4">
            <div className="flex items-center">
              {/* Display likes with emoji */}
              <span className="text-gray-800 flex items-center">
                <FaThumbsUp className="mr-1 text-green-500" />
                {likes} {likes === 1 ? 'like' : 'likes'}
              </span>
              {/* Display unlikes with emoji */}
              <span className="ml-4 text-gray-800 flex items-center">
                <FaThumbsDown className="mr-1 text-red-500" />
                {unlikes} {unlikes === 1 ? 'unlike' : 'unlikes'}
              </span>
            </div>
            </div>
            {user && user.role === 'Admin' && (
              <div className="flex space-x-2">
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-150 shadow-lg"
                  onClick={() => setIsEditing(true)}
                >
                  Modify
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-150 shadow-lg"
                  onClick={handleDelete}
                >
                  Remove
                </button>
              </div>
            )}
          </div>
          <div className="border-t border-gray-300 my-4" />
        </>
      )}
      <div className="mt-6">
        <h4 className="text-xl font-semibold text-gray-800">Comments:</h4>
        <CommentForm resourceId={resource._id} />
        <div className="mt-4">
          {comments.map(comment => (
            console.log(comment),
            <div key={comment._id} className="border border-gray-300 rounded-lg p-4 mb-2">
              <p className="text-gray-700">{comment.text}</p>
              <p className="text-gray-600 text-sm">
                comment by: <strong>{comment.user.name}</strong> on {new Date(comment.createdAt).toLocaleString()}
                
              </p>
            </div>
            
          ))}
        </div>
      </div>
      <div className="mt-4">
        <h4 className="text-xl font-semibold text-gray-800">Reactions:</h4>
        <Reaction resourceId={resource._id} />
      </div>
    </div>
  );
};

ResourceDetail.propTypes = {
  resource: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdBy: PropTypes.shape({
      name: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
    }).isRequired,
    reactions: PropTypes.arrayOf(
      PropTypes.shape({
        user: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
      })
    ).isRequired,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        user: PropTypes.shape({
          name: PropTypes.string.isRequired,
          _id: PropTypes.string.isRequired,
        }).isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default ResourceDetail;
