import { Either, right } from '@/core/either'
import { PacoteRepository } from '../../repositories/pacote-repository'
import { Pacote } from '../../../enterprise/entities/pacote'

interface ListarPacoteUseCaseRequest {
  page: number
}

type ListarPacoteUseCaseResponse = Either<
  null,
  {
    pacotes: Pacote[]
  }
>

export class ListarPacoteUseCase {
  constructor(private pacoteRepository: PacoteRepository) {}

  async execute({
    page,
  }: ListarPacoteUseCaseRequest): Promise<ListarPacoteUseCaseResponse> {
    const pacotes = await this.pacoteRepository.findAll({ page })

    return right({ pacotes })
  }
}
