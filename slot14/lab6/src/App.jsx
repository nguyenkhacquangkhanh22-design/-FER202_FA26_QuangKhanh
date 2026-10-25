import AxiosDemo from './AxiosDemo';
import PostList from './PostList';
import CreatePost from './CreatePost';
import UpdatePost from './UpdatePost';
import PatchPost from './PatchPost';
import DeletePost from './DeletePost';
import RequestConfig from './RequestConfig';

export default function App() {
  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif' }}>
      <h1>Exercise 27 – Phần 1 & 2 (Async/Await)</h1>
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
      <hr />
      <RequestConfig />
    </div>
  );
}
