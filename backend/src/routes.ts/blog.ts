import {Hono} from 'hono'
import {getAllBlogs,getBlogById,addBlog,updateBlog,deleteBlog,getmyBlogs, getBlogByIdForEditor}  from '../controllers/blogController';
import Auth from '../middlewares/Auth';
 
const blogRouter =new Hono();

blogRouter.get('/bulk', getAllBlogs)
blogRouter.get('/specific/:id',getBlogById)
blogRouter.get('/editor/:id',getBlogByIdForEditor)
 
blogRouter.get('/my',Auth, getmyBlogs)
blogRouter.delete('/my/:id',Auth, deleteBlog)
blogRouter.post('/my', Auth, addBlog ) 
blogRouter.put('/my', Auth, updateBlog)
export default blogRouter; 