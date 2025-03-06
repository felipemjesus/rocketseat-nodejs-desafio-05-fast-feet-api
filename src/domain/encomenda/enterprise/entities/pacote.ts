import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export type StatusPacoteEnum = 'POSTADO' | 'RETIRADO' | 'ENTREGUE' | 'DEVOLVIDO'

export interface PacoteProps {
  destinatarioId: UniqueEntityId
  nome: string
  status: StatusPacoteEnum
  postadoEm: Date
  retiradoEm?: Date | null
  entregueEm?: Date | null
  devolvidaEm?: Date | null
  entregadorId?: UniqueEntityId | null
}

export class Pacote extends Entity<PacoteProps> {
  get destinatarioId() {
    return this.props.destinatarioId
  }

  get nome() {
    return this.props.nome
  }

  set nome(nome: string) {
    this.props.nome = nome
  }

  get status() {
    return this.props.status
  }

  set status(status: StatusPacoteEnum) {
    this.props.status = status
  }

  get postadoEm() {
    return this.props.postadoEm
  }

  get retiradoEm() {
    return this.props.retiradoEm
  }

  get entregueEm() {
    return this.props.entregueEm
  }

  set entregueEm(entregueEm: Date | undefined | null) {
    if (entregueEm === undefined || entregueEm === null) {
      return
    }

    this.props.entregueEm = entregueEm
  }

  get devolvidaEm() {
    return this.props.devolvidaEm
  }

  set devolvidaEm(devolvidaEm: Date | undefined | null) {
    if (devolvidaEm === undefined || devolvidaEm === null) {
      return
    }

    this.props.devolvidaEm = devolvidaEm
  }

  get entregadorId() {
    return this.props.entregadorId
  }

  set entregadorId(entregadorId: UniqueEntityId | undefined | null) {
    if (entregadorId === undefined || entregadorId === null) {
      return
    }

    this.props.entregadorId = entregadorId

    this.props.retiradoEm = new Date()
  }

  static create(
    props: Optional<PacoteProps, 'status' | 'postadoEm'>,
    id?: UniqueEntityId,
  ) {
    const pacote = new Pacote(
      {
        ...props,
        status: props.status ?? 'POSTADO',
        postadoEm: props.postadoEm ?? new Date(),
      },
      id,
    )

    return pacote
  }
}
