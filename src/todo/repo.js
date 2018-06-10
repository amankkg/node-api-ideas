// @flow

type Todo = {|
  id: number,
  userId: string,
  completed: boolean,
  text: string,
|}

type Query = {|
  userId: string,
  filter: 'completed' | 'incompleted',
|}

export class TodoRepository {
  #todos: Array<Todo> = []

  async find(query: Query) {
    const filtered: Array<Todo> = this.#todos.filter(todo =>
      todo.userId === query.userId &&
      (todo.completed
        ? query.filter === 'completed'
        : query.filter === 'incompleted'))

    return filtered
  }

  async get(id: number) {
    const todo = this.#todos.find(todo => todo.id === id)

    return todo
  }

  async create(data: {| text: string, userId: string, completed: boolean |}) {
    const created = {
      id: Date.now(),
      text: data.text,
      userId: data.userId,
      completed: data.completed,
    }

    this.#todos.push(created)

    return created
  }

  async update(id: number, data: Todo) {
    const existing = await this.get(id)

    if (existing != null) Object.assign(existing, data)
  }
}
