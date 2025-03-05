import { Either, left, right } from '@/core/either'
import { UsuarioRepository } from '../../repositories/usuario-repository'
import { AlreadyExistsError } from '../errors/already-exists-error'
import { Usuario } from '../../../enterprise/entities/usuario'
import { HashGenerator } from '../../cryptography/hash-generator'

interface CadastrarUsuarioUseCaseRequest {
  nome: string
  cpf: string
  senha: string
}

type CadastrarUsuarioUseCaseResponse = Either<
  AlreadyExistsError,
  {
    usuario: Usuario
  }
>

export class CadastrarUsuarioUseCase {
  constructor(
    private usuarioRepository: UsuarioRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    nome,
    cpf,
    senha,
  }: CadastrarUsuarioUseCaseRequest): Promise<CadastrarUsuarioUseCaseResponse> {
    const cpfExists = await this.usuarioRepository.findByCpf(cpf)
    if (cpfExists) {
      return left(new AlreadyExistsError(cpf))
    }

    const hashedPassword = await this.hashGenerator.hash(senha)

    const usuario = Usuario.create({
      nome,
      cpf,
      senha: hashedPassword,
    })

    await this.usuarioRepository.create(usuario)

    return right({ usuario })
  }
}
