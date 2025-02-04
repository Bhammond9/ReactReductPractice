import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { PostsList } from './features/posts/PostsList'
import { AddPostForm } from './features/posts/AddPostForm'
import { PostsMainPage } from './features/posts/PostsMainPage'
import { SinglePostPage } from './features/posts/SinglePostPage'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
              <AddPostForm/>
              <PostsList />
              <Route path="/" element={<PostsMainPage />}></Route>
              <Route path="/posts/:postId" element={<SinglePostPage />} />
            </>
            }
          ></Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
