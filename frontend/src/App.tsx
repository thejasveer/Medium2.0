import {BrowserRouter ,Routes, Route} from 'react-router-dom';
import {Signup} from './pages/Signup'
import {Blog} from './pages/Blog'
import {Signin} from './pages/Signin'
import { Blogs } from './pages/Blogs';
import { Appbar } from './components/Appbar';
import { RecoilRoot } from 'recoil';
import { Publish } from './pages/Publish';
import './App.css'
import { Dashboard } from './pages/Dashboard';
import { NotFound } from './components/NotFound';
function App() {
  
  return (
    <>
    <RecoilRoot>
    <BrowserRouter>
        <Appbar></Appbar>
        <Routes>
        <Route path="*" element={<NotFound />} />
          <Route path="/signup" element={<Signup/> }></Route>
          <Route path="/signin" element={<Signin /> }></Route>
          <Route path="/" element={<Blogs /> }></Route>
          <Route path="/blogs" element={<Blogs /> }></Route>
          <Route path="/blog/:id" element={<Blog/> }></Route>
          <Route path="/publish" element={<Publish/> }></Route>
          <Route path="/:username/*" element={<Dashboard/> }></Route>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  
    </>
  )
}

export default App
