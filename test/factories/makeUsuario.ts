import { faker } from '@faker-js/faker'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  Usuario,
  UsuarioProps,
} from '@/domain/encomenda/enterprise/entities/usuario'

export function makeUsuario(
  override: Partial<UsuarioProps> = {},
  id?: UniqueEntityId,
) {
  const usuario = Usuario.create(
    {
      nome: faker.person.fullName(),
      cpf: faker.string.numeric(11),
      senha: faker.internet.password(),
      ...override,
    },
    id,
  )

  return usuario
}
