import { Hono } from 'hono'
import mainRouter from './routes.ts/index'
const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/api/v1',mainRouter)

export default app
