import { makePacote } from 'test/factories/makePacote'
import { InMemoryPacoteRepository } from 'test/repositories/in-memory-pacote-repository'
import { EditarPacoteUseCase } from './editar-destinatario-use-case'

let inMemoryPacoteRepository: InMemoryPacoteRepository
let editarPacote: EditarPacoteUseCase

describe('Editar Pacote', () => {
  beforeEach(() => {
    inMemoryPacoteRepository = new InMemoryPacoteRepository()
    editarPacote = new EditarPacoteUseCase(inMemoryPacoteRepository)
  })

  it('editar pacote', async () => {
    const pacote = makePacote()

    await inMemoryPacoteRepository.create(pacote)

    const result = await editarPacote.execute({
      pacoteId: pacote.id.toString(),
      nome: 'Pacote Teste',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryPacoteRepository.itens[0].nome).toEqual('Pacote Teste')
  })
})
