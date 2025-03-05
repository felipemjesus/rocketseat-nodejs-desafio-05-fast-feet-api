import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface UsuarioProps {
  nome: string
  cpf: string
  senha: string
  tipo?: string
}

export class Usuario extends Entity<UsuarioProps> {
  get nome() {
    return this.props.nome
  }

  get cpf() {
    return this.props.cpf
  }

  get senha() {
    return this.props.senha
  }

  set senha(senha: string) {
    this.props.senha = senha
  }

  static create(props: UsuarioProps, id?: UniqueEntityId) {
    const usuario = new Usuario(
      {
        ...props,
        tipo: props.tipo ?? 'ENTREGADOR',
      },
      id,
    )

    return usuario
  }
}
