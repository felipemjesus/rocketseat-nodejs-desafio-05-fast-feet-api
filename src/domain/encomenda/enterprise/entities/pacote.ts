import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface PacoteProps {
  destinatarioId: UniqueEntityId
  status: string
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

  get status() {
    return this.props.status
  }

  set status(status: string) {
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

  static create(props: PacoteProps, id?: UniqueEntityId) {
    const pacote = new Pacote(
      {
        ...props,
        postadoEm: props.postadoEm ?? new Date(),
      },
      id,
    )

    return pacote
  }
}
