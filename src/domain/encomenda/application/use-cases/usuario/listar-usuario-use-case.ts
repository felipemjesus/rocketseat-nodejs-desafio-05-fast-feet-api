import { Either, right } from '@/core/either'
import { UsuarioRepository } from '../../repositories/usuario-repository'
import { Usuario } from '../../../enterprise/entities/usuario'

interface ListarUsuarioUseCaseRequest {
  page: number
}

type ListarUsuarioUseCaseResponse = Either<
  null,
  {
    usuarios: Usuario[]
  }
>

export class ListarUsuarioUseCase {
  constructor(private usuarioRepository: UsuarioRepository) {}

  async execute({
    page,
  }: ListarUsuarioUseCaseRequest): Promise<ListarUsuarioUseCaseResponse> {
    const usuarios = await this.usuarioRepository.findAll({ page })

    return right({ usuarios })
  }
}
