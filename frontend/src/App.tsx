import {BrowserRouter ,Routes, Route} from 'react-router-dom';
import {Signup} from './pages/Signup'
import {Blog} from './pages/Blog'
import {Signin} from './pages/Signin'
import { Blogs } from './pages/Blogs';
import { Appbar } from './components/Appbar';
import { RecoilRoot } from 'recoil';
function App() {
  
  return (
    <>
    <RecoilRoot>
    <BrowserRouter>
        <Appbar></Appbar>
        <Routes>
          <Route path="/signup" element={<Signup/> }></Route>
          <Route path="/signin" element={<Signin /> }></Route>
          <Route path="/blogs" element={<Blogs /> }></Route>
          <Route path="/blog/:id" element={<Blog/> }></Route>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  
    </>
  )
}

export default App
