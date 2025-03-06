import { makeDestinatario } from 'test/factories/makeDestinatario'
import { InMemoryDestinatarioRepository } from 'test/repositories/in-memory-destinatario-repository'
import { CadastrarDestinatarioUseCase } from './cadastrar-destinatario-use-case'

let inMemoryDestinatarioRepository: InMemoryDestinatarioRepository
let cadastrarDestinatario: CadastrarDestinatarioUseCase

describe('Cadastrar Destinatario', () => {
  beforeEach(() => {
    inMemoryDestinatarioRepository = new InMemoryDestinatarioRepository()
    cadastrarDestinatario = new CadastrarDestinatarioUseCase(
      inMemoryDestinatarioRepository,
    )
  })

  it('cadastrar novo destinatario', async () => {
    const destinatario = makeDestinatario()

    const result = await cadastrarDestinatario.execute(destinatario)

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      destinatario: inMemoryDestinatarioRepository.itens[0],
    })
  })
})
