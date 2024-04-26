import React from 'react';
import logo from './logo.svg';
import './App.css';
import './tailwind.css';
import { ItemComponent } from './features/items/ItemComponent';

function App() {
  return (
    <div className="App">
      <h1>Item Management</h1>
      <ItemComponent />
    </div>
  );
}

export default App;
