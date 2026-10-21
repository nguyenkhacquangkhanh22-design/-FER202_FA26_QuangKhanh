import React from 'react';
import AxiosDemo from './components/AxiosDemo';
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';
import UpdatePost from './components/UpdatePost';
import PatchPost from './components/PatchPost';
import DeletePost from './components/DeletePost';
import './App.css';

function App() {
  return (
    <div className="container mt-4">
      <h1>DemoAxios</h1>
      <hr />
      <AxiosDemo />
      <hr />
      <PostList />
      <hr />
      <CreatePost />
      <hr />
      <UpdatePost />
      <hr />
      <PatchPost />
      <hr />
      <DeletePost />
    </div>
  );
}

export default App;
