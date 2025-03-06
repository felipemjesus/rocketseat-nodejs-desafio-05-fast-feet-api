import { makeDestinatario } from 'test/factories/makeDestinatario'
import { InMemoryDestinatarioRepository } from 'test/repositories/in-memory-destinatario-repository'
import { ListarDestinatarioUseCase } from './listar-usuario-use-case'

let inMemoryDestinatarioRepository: InMemoryDestinatarioRepository
let listarDestinatario: ListarDestinatarioUseCase

describe('Listar Destinatario', () => {
  beforeEach(() => {
    inMemoryDestinatarioRepository = new InMemoryDestinatarioRepository()
    listarDestinatario = new ListarDestinatarioUseCase(
      inMemoryDestinatarioRepository,
    )
  })

  it('listar destinatario', async () => {
    await inMemoryDestinatarioRepository.create(makeDestinatario())
    await inMemoryDestinatarioRepository.create(makeDestinatario())
    await inMemoryDestinatarioRepository.create(makeDestinatario())

    const result = await listarDestinatario.execute({
      page: 1,
    })

    expect(result.value?.destinatarios).toHaveLength(3)
  })

  it('listar destinatario com paginação', async () => {
    for (let i = 1; i <= 12; i++) {
      await inMemoryDestinatarioRepository.create(makeDestinatario())
    }

    const result = await listarDestinatario.execute({
      page: 2,
    })

    expect(result.value?.destinatarios).toHaveLength(2)
  })
})
