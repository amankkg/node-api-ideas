// @flow
export function todoService({todoRepo, currentUser}) {
  return {
    getAll: async query => {
      const result = await todoRepo.find({
        filter: query.filter,
        userId: currentUser.id,
      })

      return result
    },

    create: async data => {
      const created = await todoRepo.create({
        text: data.text,
        userId: currentUser.id,
        completed: false,
      })

      return created
    },

    update: async (id, data) => {
      const existing = await todoRepo.get(id)

      if (existing == null) throw new Error('Not Found!')
      if (existing.userId !== currentUser.id)
        throw new Error('Forbidden!')

      await todoRepo.update(id, {
        text: data.text,
        completed: data.completed,
      })
    },

    delete: async id => {
      const existing = await todoRepo.get(id)

      if (existing == null) throw new Error('Not Found!')
      if (existing.userId !== currentUser.id)
        throw new Error('Forbidden!')

      await todoRepo.delete(id)
    },
  }
}
