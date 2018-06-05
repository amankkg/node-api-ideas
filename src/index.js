// @flow
import Koa from 'koa'
import KoaRouter from 'koa-router'
import {scopeRequest, makeInvoker} from 'awilix-koa'

import {configureContainer} from './configureContainer'

const app = new Koa()
const router = new KoaRouter()
const container = configureContainer()

app.use(scopeRequest(container))
app.use((ctx, next) => {
  ctx.state.container.registerValue({
    currentUser: ctx.state.user,
  })
  return next
})

const todosApi = ({todoSvc}) => ({
  getTodos: async ctx => {
    const todos = await todoSvc.getAll(ctx.request.query)
    ctx.body = todos
    ctx.status = 200
  },

  createTodo: async ctx => {
    const todo = await todoSvc.create(ctx.request.body)
    ctx.body = todo
    ctx.status = 201
  },

  updateTodo: async ctx => {
    await todoSvc.update(ctx.params.id, ctx.request.body)
    ctx.status = 204
  },

  deleteTodo: async ctx => {
    await todoSvc.delete(ctx.parms.id, ctx.request.body)
    ctx.status = 204
  },
})

const api = makeInvoker(todosApi)
router.get('/todos', api('getTodos'))
router.post('/todos', api('createTodo'))
router.patch('/todos', api('updateTodo'))
router.delete('/todos', api('deleteTodo'))

app.use(router.routes())
app.listen(3000)
