import { Either, left, right } from '@/core/either'
import { DestinatarioRepository } from '../../repositories/destinatario-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface ExcluirDestinatarioUseCaseRequest {
  destinatarioId: string
}

type ExcluirDestinatarioUseCaseResponse = Either<ResourceNotFoundError, null>

export class ExcluirDestinatarioUseCase {
  constructor(private destinatarioRepository: DestinatarioRepository) {}

  async execute({
    destinatarioId,
  }: ExcluirDestinatarioUseCaseRequest): Promise<ExcluirDestinatarioUseCaseResponse> {
    const destinatario =
      await this.destinatarioRepository.findById(destinatarioId)
    if (!destinatario) {
      return left(new ResourceNotFoundError())
    }

    await this.destinatarioRepository.delete(destinatario)

    return right(null)
  }
}
