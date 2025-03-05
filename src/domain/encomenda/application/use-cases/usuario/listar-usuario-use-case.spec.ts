import { InMemoryUsuarioRepository } from 'test/repositories/in-memory-usuario-repository'
import { makeUsuario } from 'test/factories/makeUsuario'
import { ListarUsuarioUseCase } from './listar-usuario-use-case'

let inMemoryUsuarioRepository: InMemoryUsuarioRepository
let listarUsuario: ListarUsuarioUseCase

describe('Listar Usuario', () => {
  beforeEach(() => {
    inMemoryUsuarioRepository = new InMemoryUsuarioRepository()
    listarUsuario = new ListarUsuarioUseCase(inMemoryUsuarioRepository)
  })

  it('listar usuario', async () => {
    await inMemoryUsuarioRepository.create(makeUsuario())
    await inMemoryUsuarioRepository.create(makeUsuario())
    await inMemoryUsuarioRepository.create(makeUsuario())

    const result = await listarUsuario.execute({
      page: 1,
    })

    expect(result.value?.usuarios).toHaveLength(3)
  })

  it('listar usuario com paginação', async () => {
    for (let i = 1; i <= 12; i++) {
      await inMemoryUsuarioRepository.create(makeUsuario())
    }

    const result = await listarUsuario.execute({
      page: 2,
    })

    expect(result.value?.usuarios).toHaveLength(2)
  })
})
