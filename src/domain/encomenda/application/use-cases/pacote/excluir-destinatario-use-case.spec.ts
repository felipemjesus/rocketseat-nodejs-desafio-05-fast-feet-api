import { makePacote } from 'test/factories/makePacote'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { InMemoryPacoteRepository } from 'test/repositories/in-memory-pacote-repository'
import { ExcluirPacoteUseCase } from './excluir-destinatario-use-case'

let inMemoryPacoteRepository: InMemoryPacoteRepository
let excluirPacote: ExcluirPacoteUseCase

describe('Excluir Pacote', () => {
  beforeEach(() => {
    inMemoryPacoteRepository = new InMemoryPacoteRepository()
    excluirPacote = new ExcluirPacoteUseCase(inMemoryPacoteRepository)
  })

  it('excluir pacote', async () => {
    const pacote = makePacote()

    await inMemoryPacoteRepository.create(pacote)

    const result = await excluirPacote.execute({
      pacoteId: pacote.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryPacoteRepository.itens).toHaveLength(0)
  })

  it('excluir pacote inexistente', async () => {
    const result = await excluirPacote.execute({
      pacoteId: 'inexistente',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
