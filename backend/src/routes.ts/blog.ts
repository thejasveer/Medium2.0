import {Hono} from 'hono'
import {getAllBlogs,getBlogById,addBlog,updateBlog,deleteBlog,getmyBlogs}  from '../controllers/blogController';
import Auth from '../middlewares/Auth';
 
const blogRouter =new Hono();

blogRouter.get('/bulk', getAllBlogs)
blogRouter.get('/specific/:id',getBlogById)
 
blogRouter.get('/my',Auth, getmyBlogs)
blogRouter.delete('/my/:id',Auth, deleteBlog)
blogRouter.post('/my', Auth, addBlog ) 
blogRouter.put('/my', Auth, updateBlog)
export default blogRouter; 