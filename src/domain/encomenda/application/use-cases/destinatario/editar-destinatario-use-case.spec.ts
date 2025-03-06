import { makeDestinatario } from 'test/factories/makeDestinatario'
import { InMemoryDestinatarioRepository } from 'test/repositories/in-memory-destinatario-repository'
import { EditarDestinatarioUseCase } from './editar-destinatario-use-case'

let inMemoryDestinatarioRepository: InMemoryDestinatarioRepository
let editarDestinatario: EditarDestinatarioUseCase

describe('Editar Destinatario', () => {
  beforeEach(() => {
    inMemoryDestinatarioRepository = new InMemoryDestinatarioRepository()
    editarDestinatario = new EditarDestinatarioUseCase(
      inMemoryDestinatarioRepository,
    )
  })

  it('editar destinatario', async () => {
    const destinatario = makeDestinatario()

    await inMemoryDestinatarioRepository.create(destinatario)

    const result = await editarDestinatario.execute({
      destinatarioId: destinatario.id.toString(),
      nome: 'Destinatario Teste',
      cep: '12345678',
      logradouro: 'Rua Teste',
      numero: '123',
      bairro: 'Bairro Teste',
      cidade: 'Cidade Teste',
      estado: 'SP',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryDestinatarioRepository.itens[0].nome).toEqual(
      'Destinatario Teste',
    )
  })
})
