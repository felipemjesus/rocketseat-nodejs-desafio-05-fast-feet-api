import { faker } from '@faker-js/faker'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  Destinatario,
  DestinatarioProps,
} from '@/domain/encomenda/enterprise/entities/destinatario'

export function makeDestinatario(
  override: Partial<DestinatarioProps> = {},
  id?: UniqueEntityId,
) {
  const destinatario = Destinatario.create(
    {
      nome: faker.person.fullName(),
      cep: faker.location.zipCode(),
      logradouro: faker.location.street(),
      numero: faker.location.buildingNumber(),
      bairro: faker.location.street(),
      cidade: faker.location.city(),
      estado: faker.location.state({ abbreviated: true }),
      ...override,
    },
    id,
  )

  return destinatario
}
