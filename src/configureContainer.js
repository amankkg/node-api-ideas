// @flow
import {createContainer, asClass, asFunction} from 'awilix'

import {todoService} from './todo/svc'
import {TodoRepository} from './todo/repo'

export function configureContainer() {
  const container = createContainer()

  container.register({
    todoSvc: asFunction(todoService).scoped(),
    todoRepo: asClass(TodoRepository).singleton(),
  })

  return container
}
