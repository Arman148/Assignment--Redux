import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchItems, addItem, updateItem, deleteItem, selectItems, selectItemsStatus, Item } from './itemSlice'; 
import { AppDispatch } from '../../store/store';

export function ItemList() {
  // State variables for managing new item title, editing id and editing title
  const [newTitle, setNewTitle] = useState('');
  const [editId, setEditId] = useState<number | null>(null); 
  const [editTitle, setEditTitle] = useState('');

  // Selecting items and status from Redux store
  const items = useSelector(selectItems);
  const status = useSelector(selectItemsStatus);
  
  const dispatch = useDispatch<AppDispatch>(); // Dispatch function for Redux actions


  // fetch items when status is 'idle'
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchItems());
    }
  }, [status, dispatch]);

  // handle adding a new item
  const handleAddItem = () => {
    if (newTitle) {
      dispatch(addItem({ id: items.length + 1, title: newTitle }));
      setNewTitle('');
    }
  };

  // handle editing an item
  const handleEditItem = (item: Item) => { 
    setEditId(item.id);
    setEditTitle(item.title);
  };

  // handle saving edited item
  const handleSaveEdit = (id: number) => { 
    if (editTitle) {
      dispatch(updateItem({ id, title: editTitle }));
      setEditId(null);
    }
  };

  // handle deleting an item
  const handleDeleteItem = (id: number) => { 
    dispatch(deleteItem(id));
  };

  return (
    <div className="container mx-auto mt-5">
      <div className="mb-4">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="shadow appearance-none border rounded py-2 px-3 text-grey-darker"
          placeholder="Enter new item title"
        />
        <button onClick={handleAddItem} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">
          Add Item
        </button>
      </div>
      {status === 'loading' ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.map(item => (
                <tr key={item.id}>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.id}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {editId === item.id ? (
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="shadow appearance-none border rounded py-2 px-3 text-grey-darker"
                      />
                    ) : (
                      item.title
                    )}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
                    {editId === item.id ? (
                      <button onClick={() => handleSaveEdit(item.id)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">
                        Save
                      </button>
                    ) : (
                      <button onClick={() => handleEditItem(item)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                        Edit
                      </button>
                    )}
                    <button onClick={() => handleDeleteItem(item.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 ml-2 rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

