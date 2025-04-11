import React from 'react';

const Header = ({ isEditing, onEdit, onSave, onCancel }) => {
  return (
    <header className="bg-white shadow rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <button
                onClick={onCancel}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={onSave}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </>
          ) : (
            <button
              onClick={onEdit}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Edit Dashboard
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 