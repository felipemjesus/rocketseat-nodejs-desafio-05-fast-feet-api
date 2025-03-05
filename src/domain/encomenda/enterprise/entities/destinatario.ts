import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface DestinatarioProps {
  nome: string
  cep: string
  logradouro: string
  numero: string
  bairro: string
  cidade: string
  estado: string
}

export class Destinatario extends Entity<DestinatarioProps> {
  get nome() {
    return this.props.nome
  }

  get cep() {
    return this.props.cep
  }

  get logradouro() {
    return this.props.logradouro
  }

  get numero() {
    return this.props.numero
  }

  get bairro() {
    return this.props.bairro
  }

  get cidade() {
    return this.props.cidade
  }

  get estado() {
    return this.props.estado
  }

  static create(props: DestinatarioProps, id?: UniqueEntityId) {
    const destinatario = new Destinatario(
      {
        ...props,
      },
      id,
    )

    return destinatario
  }
}
