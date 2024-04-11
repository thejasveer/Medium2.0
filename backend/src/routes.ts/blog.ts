import {Hono} from 'hono'
import {getAllBlogs,getById}  from '../controllers/blogController';
 
const blogRouter =new Hono();

blogRouter.get('/', getAllBlogs)
blogRouter.get('/:id',getById)

blogRouter.post('/', (c) => {

	return c.text('signin route')
})

blogRouter.put('blog', (c) => {
	return c.text('signin route')
})
export default blogRouter;