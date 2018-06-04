// @flow
import {createContainer, asClass, asFunction} from 'awilix'
import {todosService} from './todos-service'
import {TodosRepository} from './todos-repository'

export function configureContainer() {
  const container = createContainer()

  container.register({
    todosService: asFunction(todosService).scoped(),
    todosRepository: asClass(TodosRepository).singleton(),
  })

  return container
}
