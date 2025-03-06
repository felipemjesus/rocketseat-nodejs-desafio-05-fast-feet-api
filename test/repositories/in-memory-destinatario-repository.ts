import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { DestinatarioRepository } from '@/domain/encomenda/application/repositories/destinatario-repository'
import { Destinatario } from '@/domain/encomenda/enterprise/entities/destinatario'

export class InMemoryDestinatarioRepository implements DestinatarioRepository {
  public itens: Destinatario[] = []

  async create(destinatario: Destinatario): Promise<void> {
    this.itens.push(destinatario)
  }

  async update(destinatario: Destinatario): Promise<void> {
    const index = this.itens.findIndex((item) =>
      item.id.equals(destinatario.id),
    )

    this.itens[index] = destinatario
  }

  async delete(destinatario: Destinatario): Promise<void> {
    const index = this.itens.findIndex((item) =>
      item.id.equals(destinatario.id),
    )

    this.itens.splice(index, 1)
  }

  async findAll({ page }: PaginationParams): Promise<Destinatario[]> {
    const destinatarios = this.itens.slice((page - 1) * 10, page * 10)

    return destinatarios
  }

  async findById(destinatarioId: string): Promise<Destinatario | null> {
    const destinatario = this.itens.find((item) =>
      item.id.equals(new UniqueEntityId(destinatarioId)),
    )
    if (!destinatario) {
      return null
    }

    return destinatario
  }
}
