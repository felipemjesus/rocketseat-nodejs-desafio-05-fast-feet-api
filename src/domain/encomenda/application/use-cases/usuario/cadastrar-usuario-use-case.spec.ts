import { FakeHasher } from 'test/cryptography/fake-hasher'
import { InMemoryUsuarioRepository } from 'test/repositories/in-memory-usuario-repository'
import { CadastrarUsuarioUseCase } from './cadastrar-usuario-use-case'
import { makeUsuario } from 'test/factories/makeUsuario'

let inMemoryUsuarioRepository: InMemoryUsuarioRepository
let fakeHasher: FakeHasher
let cadastrarUsuario: CadastrarUsuarioUseCase

describe('Cadastrar Usuario', () => {
  beforeEach(() => {
    inMemoryUsuarioRepository = new InMemoryUsuarioRepository()
    fakeHasher = new FakeHasher()
    cadastrarUsuario = new CadastrarUsuarioUseCase(
      inMemoryUsuarioRepository,
      fakeHasher,
    )
  })

  it('cadastrar novo usuario', async () => {
    const usuario = makeUsuario()

    const result = await cadastrarUsuario.execute(usuario)

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      usuario: inMemoryUsuarioRepository.itens[0],
    })
  })

  it('criar hash da senha ao cadastrar usuario', async () => {
    const usuario = makeUsuario({
      senha: '123456',
    })

    const result = await cadastrarUsuario.execute(usuario)

    const hashedPassword = await fakeHasher.hash('123456')

    expect(result.isRight()).toBe(true)
    expect(inMemoryUsuarioRepository.itens[0].senha).toEqual(hashedPassword)
  })
})
