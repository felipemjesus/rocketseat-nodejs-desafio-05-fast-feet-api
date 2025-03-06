import { faker } from '@faker-js/faker'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  Pacote,
  PacoteProps,
} from '@/domain/encomenda/enterprise/entities/pacote'

export function makePacote(
  override: Partial<PacoteProps> = {},
  id?: UniqueEntityId,
) {
  const pacote = Pacote.create(
    {
      destinatarioId: new UniqueEntityId(),
      nome: faker.person.fullName(),
      ...override,
    },
    id,
  )

  return pacote
}
