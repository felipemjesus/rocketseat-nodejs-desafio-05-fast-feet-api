import { InMemoryPacoteRepository } from 'test/repositories/in-memory-pacote-repository'
import { CadastrarPacoteUseCase } from './cadastrar-destinatario-use-case'
import { InMemoryDestinatarioRepository } from 'test/repositories/in-memory-destinatario-repository'
import { makeDestinatario } from 'test/factories/makeDestinatario'
import { AlreadyExistsError } from '../errors/already-exists-error'

let inMemoryDestinatarioRepository: InMemoryDestinatarioRepository
let inMemoryPacoteRepository: InMemoryPacoteRepository
let cadastrarPacote: CadastrarPacoteUseCase

describe('Cadastrar Pacote', () => {
  beforeEach(() => {
    inMemoryDestinatarioRepository = new InMemoryDestinatarioRepository()
    inMemoryPacoteRepository = new InMemoryPacoteRepository()
    cadastrarPacote = new CadastrarPacoteUseCase(
      inMemoryPacoteRepository,
      inMemoryDestinatarioRepository,
    )
  })

  it('cadastrar novo pacote', async () => {
    const destinatario = makeDestinatario()

    await inMemoryDestinatarioRepository.create(destinatario)

    const result = await cadastrarPacote.execute({
      destinatarioId: destinatario.id.toString(),
      nome: 'Pacote Teste',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      pacote: inMemoryPacoteRepository.itens[0],
    })
  })

  it('cadastrar novo pacote com destinatario inexistente', async () => {
    const result = await cadastrarPacote.execute({
      destinatarioId: 'inexistente',
      nome: 'Pacote Teste',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(AlreadyExistsError)
  })
})
