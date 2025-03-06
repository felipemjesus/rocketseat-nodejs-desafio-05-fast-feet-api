import { makeDestinatario } from 'test/factories/makeDestinatario'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { InMemoryDestinatarioRepository } from 'test/repositories/in-memory-destinatario-repository'
import { ExcluirDestinatarioUseCase } from './excluir-destinatario-use-case'

let inMemoryDestinatarioRepository: InMemoryDestinatarioRepository
let excluirDestinatario: ExcluirDestinatarioUseCase

describe('Excluir Destinatario', () => {
  beforeEach(() => {
    inMemoryDestinatarioRepository = new InMemoryDestinatarioRepository()
    excluirDestinatario = new ExcluirDestinatarioUseCase(
      inMemoryDestinatarioRepository,
    )
  })

  it('excluir destinatario', async () => {
    const destinatario = makeDestinatario()

    await inMemoryDestinatarioRepository.create(destinatario)

    const result = await excluirDestinatario.execute({
      destinatarioId: destinatario.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryDestinatarioRepository.itens).toHaveLength(0)
  })

  it('excluir destinatario inexistente', async () => {
    const result = await excluirDestinatario.execute({
      destinatarioId: 'inexistente',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
