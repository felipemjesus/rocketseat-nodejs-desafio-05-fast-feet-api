import { Either, left, right } from '@/core/either'
import { PacoteRepository } from '../../repositories/pacote-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface ExcluirPacoteUseCaseRequest {
  pacoteId: string
}

type ExcluirPacoteUseCaseResponse = Either<ResourceNotFoundError, null>

export class ExcluirPacoteUseCase {
  constructor(private pacoteRepository: PacoteRepository) {}

  async execute({
    pacoteId,
  }: ExcluirPacoteUseCaseRequest): Promise<ExcluirPacoteUseCaseResponse> {
    const pacote = await this.pacoteRepository.findById(pacoteId)
    if (!pacote) {
      return left(new ResourceNotFoundError())
    }

    await this.pacoteRepository.delete(pacote)

    return right(null)
  }
}
