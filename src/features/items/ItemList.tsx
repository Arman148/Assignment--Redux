import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchItems, selectItems, selectItemsStatus } from './itemSlice';
import { AppDispatch } from '../../store/store';

export function ItemList() {
  
  const items = useSelector(selectItems);
  const status = useSelector(selectItemsStatus);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchItems());
    }
  }, [status, dispatch]);

  return (
    <div className="container mx-auto mt-5">
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
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.title}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline">Edit</button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 ml-2 rounded focus:outline-none focus:shadow-outline">Delete</button>
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




/*
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchItems, selectItems, selectItemsStatus } from './itemSlice';
import { AppDispatch } from '../../store/store';

export function ItemList() {
  const items = useSelector(selectItems);
  const status = useSelector(selectItemsStatus);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchItems());
    }
  }, [status, dispatch]);

  return (
    <div>
      {status === 'loading' ? (
        <p>Loading...</p>
      ) : (
        items.map(item => (
          <div key={item.id}>{item.title}</div>
        ))
      )}
    </div>
  );
}

*/