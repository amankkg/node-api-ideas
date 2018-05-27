import http from 'http'

import Koa from 'koa'
import router from 'koa-route'

import {add} from './add'

const app = new Koa()

app.use(
  router.get('/', async function(ctx, next) {
    ctx.body = `1 + 2 = ${add(1, 2)}`

    await next()
  }),
)

http.createServer({}, app.callback()).listen(3000, err => {
  if (err) throw new Error(err)

  console.log('Listening on port 3000.')
})
