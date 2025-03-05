import { PaginationParams } from '@/core/repositories/pagination-params'
import { Pacote } from '../../enterprise/entities/pacote'

export abstract class PacoteRepository {
  abstract create(pacote: Pacote): Promise<void>
  abstract update(pacote: Pacote): Promise<void>
  abstract delete(pacote: Pacote): Promise<void>
  abstract findAll(params: PaginationParams): Promise<Pacote[]>
  abstract findByUsuarioId(usuarioId: string): Promise<Pacote[]>
  abstract findById(id: string): Promise<Pacote | null>
}
