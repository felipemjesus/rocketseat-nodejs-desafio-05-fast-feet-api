import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { UsuarioRepository } from '@/domain/encomenda/application/repositories/usuario-repository'
import { Usuario } from '@/domain/encomenda/enterprise/entities/usuario'

export class InMemoryUsuarioRepository implements UsuarioRepository {
  public itens: Usuario[] = []

  async create(usuario: Usuario): Promise<void> {
    this.itens.push(usuario)
  }

  async update(usuario: Usuario): Promise<void> {
    const index = this.itens.findIndex((item) => item.id.equals(usuario.id))

    this.itens[index] = usuario
  }

  async delete(usuario: Usuario): Promise<void> {
    const index = this.itens.findIndex((item) => item.id.equals(usuario.id))

    this.itens.splice(index, 1)
  }

  async findAll({ page }: PaginationParams): Promise<Usuario[]> {
    const usuarios = this.itens.slice((page - 1) * 10, page * 10)

    return usuarios
  }

  async findById(usuarioId: string): Promise<Usuario | null> {
    const usuario = this.itens.find((item) =>
      item.id.equals(new UniqueEntityId(usuarioId)),
    )
    if (!usuario) {
      return null
    }

    return usuario
  }

  async findByCpf(cpf: string): Promise<Usuario | null> {
    const usuario = this.itens.find((item) => item.cpf === cpf)
    if (!usuario) {
      return null
    }

    return usuario
  }
}
