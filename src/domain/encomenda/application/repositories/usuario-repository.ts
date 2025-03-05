import { PaginationParams } from '@/core/repositories/pagination-params'
import { Usuario } from '../../enterprise/entities/usuario'

export abstract class UsuarioRepository {
  abstract create(usuario: Usuario): Promise<void>
  abstract update(usuario: Usuario): Promise<void>
  abstract delete(usuario: Usuario): Promise<void>
  abstract findAll(params: PaginationParams): Promise<Usuario[]>
  abstract findById(usuarioId: string): Promise<Usuario | null>
  abstract findByCpf(cpf: string): Promise<Usuario | null>
}
