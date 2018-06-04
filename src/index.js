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

const todosApi = ({todosService}) => ({
  getTodos: async ctx => {
    // some logic
  },
  createTodo: async ctx => {
    // some logic
  },
  updateTodo: async ctx => {
    // some logic
  },
  deleteTodo: async ctx => {
    // some logic
  },
})

const api = makeInvoker(todosApi)
router.get('/todos', api('getTodos'))
router.post('/todos', api('createTodos'))
router.patch('/todos', api('updateTodo'))
router.delete('/todos', api('deleteTodo'))

app.use(router.routes())
app.listen(3000)
