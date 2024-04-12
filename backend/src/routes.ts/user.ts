import {Hono} from 'hono'
import { signin, signup } from '../controllers/userController'

const userRouter =new Hono()
userRouter.post('/signup', signup)

userRouter.post('/signin', signin)
export default userRouter;