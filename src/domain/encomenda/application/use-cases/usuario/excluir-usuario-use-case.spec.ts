import { InMemoryUsuarioRepository } from 'test/repositories/in-memory-usuario-repository'
import { makeUsuario } from 'test/factories/makeUsuario'
import { ExcluirUsuarioUseCase } from './excluir-usuario-use-case'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

let inMemoryUsuarioRepository: InMemoryUsuarioRepository
let excluirUsuario: ExcluirUsuarioUseCase

describe('Excluir Usuario', () => {
  beforeEach(() => {
    inMemoryUsuarioRepository = new InMemoryUsuarioRepository()
    excluirUsuario = new ExcluirUsuarioUseCase(inMemoryUsuarioRepository)
  })

  it('excluir usuario', async () => {
    const usuario = makeUsuario()

    await inMemoryUsuarioRepository.create(usuario)

    const result = await excluirUsuario.execute({
      usuarioId: usuario.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryUsuarioRepository.itens).toHaveLength(0)
  })

  it('excluir usuario inexistente', async () => {
    const result = await excluirUsuario.execute({
      usuarioId: 'inexistente',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
