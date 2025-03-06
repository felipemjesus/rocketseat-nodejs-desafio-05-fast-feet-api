import { Either, left, right } from '@/core/either'
import { PacoteRepository } from '../../repositories/pacote-repository'
import { Pacote } from '../../../enterprise/entities/pacote'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface EditarPacoteUseCaseRequest {
  pacoteId: string
  nome: string
}

type EditarPacoteUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    pacote: Pacote
  }
>

export class EditarPacoteUseCase {
  constructor(private pacoteRepository: PacoteRepository) {}

  async execute({
    pacoteId,
    nome,
  }: EditarPacoteUseCaseRequest): Promise<EditarPacoteUseCaseResponse> {
    const pacote = await this.pacoteRepository.findById(pacoteId)
    if (!pacote) {
      return left(new ResourceNotFoundError())
    }

    pacote.nome = nome

    await this.pacoteRepository.update(pacote)

    return right({ pacote })
  }
}
