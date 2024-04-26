import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, selectItems } from './itemSlice';

export function ItemComponent() {
  const items = useSelector(selectItems);
  const dispatch = useDispatch();

  return (
    <div>
      {items.map(item => (
        <div key={item.id}>{item.title}</div>
      ))}
      <button onClick={() => dispatch(addItem({id: items.length + 1, title: "New Item"}))}>
        Add Item
      </button>
    </div>
  );
}
