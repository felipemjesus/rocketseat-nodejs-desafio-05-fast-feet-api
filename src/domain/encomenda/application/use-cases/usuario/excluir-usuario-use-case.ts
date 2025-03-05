import { Either, left, right } from '@/core/either'
import { UsuarioRepository } from '../../repositories/usuario-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface ExcluirUsuarioUseCaseRequest {
  usuarioId: string
}

type ExcluirUsuarioUseCaseResponse = Either<ResourceNotFoundError, null>

export class ExcluirUsuarioUseCase {
  constructor(private usuarioRepository: UsuarioRepository) {}

  async execute({
    usuarioId,
  }: ExcluirUsuarioUseCaseRequest): Promise<ExcluirUsuarioUseCaseResponse> {
    const usuario = await this.usuarioRepository.findById(usuarioId)
    if (!usuario) {
      return left(new ResourceNotFoundError())
    }

    await this.usuarioRepository.delete(usuario)

    return right(null)
  }
}
