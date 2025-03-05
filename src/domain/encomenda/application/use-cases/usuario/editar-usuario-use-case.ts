import { Either, left, right } from '@/core/either'
import { UsuarioRepository } from '../../repositories/usuario-repository'
import { AlreadyExistsError } from '../errors/already-exists-error'
import { Usuario } from '../../../enterprise/entities/usuario'
import { HashGenerator } from '../../cryptography/hash-generator'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface EditarUsuarioUseCaseRequest {
  usuarioId: string
  senha: string
}

type EditarUsuarioUseCaseResponse = Either<
  AlreadyExistsError,
  {
    usuario: Usuario
  }
>

export class EditarUsuarioUseCase {
  constructor(
    private usuarioRepository: UsuarioRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    usuarioId,
    senha,
  }: EditarUsuarioUseCaseRequest): Promise<EditarUsuarioUseCaseResponse> {
    const usuario = await this.usuarioRepository.findById(usuarioId)
    if (!usuario) {
      return left(new ResourceNotFoundError())
    }

    const hashedPassword = await this.hashGenerator.hash(senha)

    usuario.senha = hashedPassword

    await this.usuarioRepository.update(usuario)

    return right({ usuario })
  }
}
