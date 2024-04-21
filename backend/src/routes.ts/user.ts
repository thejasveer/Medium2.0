import {Hono} from 'hono'
import { signin, signup ,currentUser} from '../controllers/userController'
import Auth from '../middlewares/Auth'

const userRouter =new Hono()
userRouter.post('/signup', signup)

userRouter.post('/signin', signin)
userRouter.get('/me',Auth, currentUser)
export default userRouter;