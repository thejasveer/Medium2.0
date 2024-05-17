import { Hono } from 'hono'
import mainRouter from './routes.ts/index'
 
import { cors } from 'hono/cors';
import { env } from 'hono/adapter'
 
const app = new Hono();
app.use(cors())
// app.use('*', cors({
//   origin: 'https://thought-trail-thejasveers-projects.vercel.app',
//   allowHeaders: ['Content-Type', 'Authorization'],
//   allowMethods: ['POST', 'GET', 'OPTIONS','PUT','DELETE'],
//   exposeHeaders: ['Content-Length'],
//   maxAge: 600,
//   credentials: true,
// }))
 
app.get('/env', (c) => {
  const { NAME } = env<{ NAME: string }>(c)
  return c.text(NAME)
})
app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/api/v1',mainRouter)

export default app
 