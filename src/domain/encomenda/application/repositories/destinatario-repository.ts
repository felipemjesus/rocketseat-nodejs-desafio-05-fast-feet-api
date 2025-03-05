import { PaginationParams } from '@/core/repositories/pagination-params'
import { Destinatario } from '../../enterprise/entities/destinatario'

export abstract class DestinatarioRepository {
  abstract create(destinatario: Destinatario): Promise<void>
  abstract update(destinatario: Destinatario): Promise<void>
  abstract delete(destinatario: Destinatario): Promise<void>
  abstract findAll(params: PaginationParams): Promise<Destinatario[]>
}
