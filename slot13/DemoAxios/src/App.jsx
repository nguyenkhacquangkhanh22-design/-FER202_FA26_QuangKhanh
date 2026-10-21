import React from 'react';
import AxiosDemo from './components/AxiosDemo';
import PostList from './components/PostList';
import './App.css';

function App() {
  return (
    <div className="container mt-4">
      <h1>DemoAxios</h1>
      <hr />
      <AxiosDemo />
      <hr />
      <PostList />
    </div>
  );
}

export default App;
