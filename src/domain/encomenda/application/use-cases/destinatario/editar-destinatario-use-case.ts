import { Either, left, right } from '@/core/either'
import { DestinatarioRepository } from '../../repositories/destinatario-repository'
import { AlreadyExistsError } from '../errors/already-exists-error'
import { Destinatario } from '../../../enterprise/entities/destinatario'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface EditarDestinatarioUseCaseRequest {
  destinatarioId: string
  nome: string
  cep: string
  logradouro: string
  numero: string
  bairro: string
  cidade: string
  estado: string
}

type EditarDestinatarioUseCaseResponse = Either<
  AlreadyExistsError,
  {
    destinatario: Destinatario
  }
>

export class EditarDestinatarioUseCase {
  constructor(private destinatarioRepository: DestinatarioRepository) {}

  async execute({
    destinatarioId,
    nome,
    cep,
    logradouro,
    numero,
    bairro,
    cidade,
    estado,
  }: EditarDestinatarioUseCaseRequest): Promise<EditarDestinatarioUseCaseResponse> {
    let destinatario =
      await this.destinatarioRepository.findById(destinatarioId)
    if (!destinatario) {
      return left(new ResourceNotFoundError())
    }

    destinatario = Destinatario.create(
      {
        ...destinatario,
        nome,
        cep,
        logradouro,
        numero,
        bairro,
        cidade,
        estado,
      },
      destinatario.id,
    )

    await this.destinatarioRepository.update(destinatario)

    return right({ destinatario })
  }
}
