import { FakeHasher } from 'test/cryptography/fake-hasher'
import { InMemoryUsuarioRepository } from 'test/repositories/in-memory-usuario-repository'
import { EditarUsuarioUseCase } from './editar-usuario-use-case'
import { makeUsuario } from 'test/factories/makeUsuario'

let inMemoryUsuarioRepository: InMemoryUsuarioRepository
let fakeHasher: FakeHasher
let editarUsuario: EditarUsuarioUseCase

describe('Editar Usuario', () => {
  beforeEach(() => {
    inMemoryUsuarioRepository = new InMemoryUsuarioRepository()
    fakeHasher = new FakeHasher()
    editarUsuario = new EditarUsuarioUseCase(
      inMemoryUsuarioRepository,
      fakeHasher,
    )
  })

  it('editar usuario', async () => {
    const usuario = makeUsuario()

    await inMemoryUsuarioRepository.create(usuario)

    const result = await editarUsuario.execute({
      usuarioId: usuario.id.toString(),
      senha: '123456',
    })

    const hashedPassword = await fakeHasher.hash('123456')

    expect(result.isRight()).toBe(true)
    expect(inMemoryUsuarioRepository.itens[0].senha).toEqual(hashedPassword)
  })
})
