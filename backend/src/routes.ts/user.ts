import {Hono} from 'hono'

const userRouter =new Hono()
userRouter.post('/signup', (c) => {
	return c.text('signup route')
})

userRouter.post('/signin', (c) => {
	return c.text('signin route')
})
export default userRouter;