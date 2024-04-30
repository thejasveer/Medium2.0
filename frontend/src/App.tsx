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
import { SweetErrors } from './components/SweetErrors';
function App() {
  
  return (
    <div className=' h-svh'>
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
          <Route path="/new-story" element={<Publish/> }></Route>
          <Route path="/p/:id/edit" element={<Publish/> }></Route>
          <Route path="/:username/*" element={<Dashboard/> }></Route>
        </Routes>
      </BrowserRouter>
      <SweetErrors/>
    </RecoilRoot>
  
    </div>
  )
}

export default App
