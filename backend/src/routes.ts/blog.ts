import {Hono} from 'hono'
import {getAllBlogs,getBlogById,addBlog,updateBlog,manageImage,deleteBlog,getmyBlogs, getBlogByIdForEditor, updateClaps}  from '../controllers/blogController';
import Auth from '../middlewares/Auth';

const blogRouter =new Hono();
 

blogRouter.get('/bulk', getAllBlogs)
blogRouter.get('/specific/:id',getBlogById)
blogRouter.get('/editor/:id',getBlogByIdForEditor)
 
blogRouter.get('/my',Auth, getmyBlogs)
blogRouter.delete('/my/:id',Auth, deleteBlog)
blogRouter.post('/my', Auth, addBlog ) 
blogRouter.put('/my', Auth, updateBlog)
blogRouter.put('/img', Auth, manageImage)
blogRouter.put('/clap', Auth, updateClaps)
export default blogRouter; 