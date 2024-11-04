// frontend/src/pages/ResourcePage.jsx
import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import api from '../services/api';
import ResourceDetail from '../components/ResourceDetail';
import ResourceForm from '../components/ResourceForm';

const ResourcePage = () => {
  const [resources, setResources] = useState([]); // Ensure initial state is an empty array
  const [editingResource, setEditingResource] = useState(null);
  const { user } = useAuthStore();

  const fetchResources = async () => {
    try {
      const response = await api.get('/resources');
      setResources(response.data);
      console.log('Resources:', response.data);
    } catch (error) {
      console.error('Error fetching resources:', error);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleSave = () => {
    setEditingResource(null);
    fetchResources();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Resources</h1>
      {user && user.role === 'Admin' && (
        <div className="mb-4 flex items-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setEditingResource({ id: null, title: '', content: '' })}
          > 
            Add Resource
          </button>
          {user.token ? (
            <span className="ml-4 bg-gray-100 text-gray-800 font-semibold py-1 px-3 rounded-full shadow-md">
              Token: {user.token}
            </span>
          ) : (
            <span className="ml-4 text-red-500 font-semibold">
              Token is not available.
            </span>
          )}
        </div>
      )}
      {editingResource && (
        <ResourceForm resource={editingResource} onSave={handleSave} />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.isArray(resources) && resources.map((resource) => (
          <ResourceDetail
            key={resource._id}
            resource={resource}
            onEdit={() => setEditingResource(resource)}
            onDelete={() => setResources(resources.filter((r) => r.id !== resource.id))}
          />
        ))}
      </div>
    </div>
  );
};

export default ResourcePage;