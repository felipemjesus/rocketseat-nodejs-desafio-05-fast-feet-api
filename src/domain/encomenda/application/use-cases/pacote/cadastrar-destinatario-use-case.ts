import { Either, left, right } from '@/core/either'
import { PacoteRepository } from '../../repositories/pacote-repository'
import { Pacote } from '../../../enterprise/entities/pacote'
import { DestinatarioRepository } from '../../repositories/destinatario-repository'
import { AlreadyExistsError } from '../errors/already-exists-error'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface CadastrarPacoteUseCaseRequest {
  destinatarioId: string
  nome: string
}

type CadastrarPacoteUseCaseResponse = Either<
  AlreadyExistsError,
  {
    pacote: Pacote
  }
>

export class CadastrarPacoteUseCase {
  constructor(
    private pacoteRepository: PacoteRepository,
    private destinatarioRepository: DestinatarioRepository,
  ) {}

  async execute({
    destinatarioId,
    nome,
  }: CadastrarPacoteUseCaseRequest): Promise<CadastrarPacoteUseCaseResponse> {
    const destinatario =
      await this.destinatarioRepository.findById(destinatarioId)
    if (!destinatario) {
      return left(new AlreadyExistsError(destinatarioId))
    }

    const pacote = Pacote.create({
      destinatarioId: new UniqueEntityId(destinatarioId),
      nome,
    })

    await this.pacoteRepository.create(pacote)

    return right({ pacote })
  }
}
