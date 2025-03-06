import { makePacote } from 'test/factories/makePacote'
import { InMemoryPacoteRepository } from 'test/repositories/in-memory-pacote-repository'
import { ListarPacoteUseCase } from './listar-usuario-use-case'

let inMemoryPacoteRepository: InMemoryPacoteRepository
let listarPacote: ListarPacoteUseCase

describe('Listar Pacote', () => {
  beforeEach(() => {
    inMemoryPacoteRepository = new InMemoryPacoteRepository()
    listarPacote = new ListarPacoteUseCase(inMemoryPacoteRepository)
  })

  it('listar pacote', async () => {
    await inMemoryPacoteRepository.create(makePacote())
    await inMemoryPacoteRepository.create(makePacote())
    await inMemoryPacoteRepository.create(makePacote())

    const result = await listarPacote.execute({
      page: 1,
    })

    expect(result.value?.pacotes).toHaveLength(3)
  })

  it('listar pacote com paginação', async () => {
    for (let i = 1; i <= 12; i++) {
      await inMemoryPacoteRepository.create(makePacote())
    }

    const result = await listarPacote.execute({
      page: 2,
    })

    expect(result.value?.pacotes).toHaveLength(2)
  })
})
