import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Post from './components/post';
import Login from './components/login'
import Layout from './components/Layout';
import Register from './components/register';
import CreatePost from './components/CreatePost';

import IndexPage from './components/IndexPage';
import PostPage from './components/PostPage';
import EditPage from './components/EditPage';
import DeletePost from './components/DeletePost';
import MyPosts from './components/MyPosts';
import AuthorPage from './components/AuthorPage';

function App() {

  return (
    

    <Routes>
      <Route path='/' element={<Layout/>}>
       <Route
        path="/"
        element={
          <IndexPage/>
        }
      />
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/create' element={<CreatePost/>}/>
      <Route path='/post/:id' element={<PostPage/>}/>
      <Route path='/edit/:id' element={<EditPage/>}/>
      <Route path='/delete/:id' element={<DeletePost/>}/>
      <Route path='/myposts' element={<MyPosts/>}/>
      <Route path='/author/:username' element={<AuthorPage/>}/>
      </Route>
     
    </Routes>
    
  );
}
  

export default App;
