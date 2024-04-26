import React from 'react';
import logo from './logo.svg';
import './App.css';
import './tailwind.css';
import { ItemList } from './features/items/ItemList';

function App() {
  return (
    <div className="App">
      <h1>Item Management</h1>
        <ItemList/>
    </div>
  );
}

export default App;
