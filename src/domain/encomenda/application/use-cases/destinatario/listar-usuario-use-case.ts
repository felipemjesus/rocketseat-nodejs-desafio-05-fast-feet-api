import { Either, right } from '@/core/either'
import { DestinatarioRepository } from '../../repositories/destinatario-repository'
import { Destinatario } from '../../../enterprise/entities/destinatario'

interface ListarDestinatarioUseCaseRequest {
  page: number
}

type ListarDestinatarioUseCaseResponse = Either<
  null,
  {
    destinatarios: Destinatario[]
  }
>

export class ListarDestinatarioUseCase {
  constructor(private destinatarioRepository: DestinatarioRepository) {}

  async execute({
    page,
  }: ListarDestinatarioUseCaseRequest): Promise<ListarDestinatarioUseCaseResponse> {
    const destinatarios = await this.destinatarioRepository.findAll({ page })

    return right({ destinatarios })
  }
}
