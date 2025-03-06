import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { PacoteRepository } from '@/domain/encomenda/application/repositories/pacote-repository'
import { Pacote } from '@/domain/encomenda/enterprise/entities/pacote'

export class InMemoryPacoteRepository implements PacoteRepository {
  public itens: Pacote[] = []

  async create(pacote: Pacote): Promise<void> {
    this.itens.push(pacote)
  }

  async update(pacote: Pacote): Promise<void> {
    const index = this.itens.findIndex((item) => item.id.equals(pacote.id))

    this.itens[index] = pacote
  }

  async delete(pacote: Pacote): Promise<void> {
    const index = this.itens.findIndex((item) => item.id.equals(pacote.id))

    this.itens.splice(index, 1)
  }

  async findAll({ page }: PaginationParams): Promise<Pacote[]> {
    const pacotes = this.itens.slice((page - 1) * 10, page * 10)

    return pacotes
  }

  async findByUsuarioId(usuarioId: string): Promise<Pacote[]> {
    const pacotes = this.itens.filter((item) =>
      item.entregadorId?.equals(new UniqueEntityId(usuarioId)),
    )

    return pacotes
  }

  async findById(pacoteId: string): Promise<Pacote | null> {
    const pacote = this.itens.find((item) =>
      item.id.equals(new UniqueEntityId(pacoteId)),
    )
    if (!pacote) {
      return null
    }

    return pacote
  }
}
