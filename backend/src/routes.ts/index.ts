import {Hono} from 'hono'
import blogRouter from './blog';
import userRouter from './user';

const mainRouter = new Hono()

mainRouter.route('/user',userRouter)
mainRouter.route('/blog',blogRouter)

export default mainRouter;