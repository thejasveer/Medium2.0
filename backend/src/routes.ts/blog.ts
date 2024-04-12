import {Hono} from 'hono'
import {getAllBlogs,getBlogById,addBlog,updateBlog,deleteBlog,getmyBlog}  from '../controllers/blogController';
import Auth from '../middlewares/Auth';
 
const blogRouter =new Hono();

blogRouter.get('/bulk', getAllBlogs)
blogRouter.get('/:id',getBlogById)
 
blogRouter.get('/user/:id',Auth, getmyBlog)
blogRouter.delete('/user/:id',Auth, deleteBlog)
blogRouter.post('/sss', Auth, addBlog ) 
blogRouter.put('/user/:id', Auth, updateBlog)
export default blogRouter; 