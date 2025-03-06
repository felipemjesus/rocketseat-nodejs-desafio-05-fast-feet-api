import { Either, right } from '@/core/either'
import { DestinatarioRepository } from '../../repositories/destinatario-repository'
import { Destinatario } from '../../../enterprise/entities/destinatario'

interface CadastrarDestinatarioUseCaseRequest {
  nome: string
  cep: string
  logradouro: string
  numero: string
  bairro: string
  cidade: string
  estado: string
}

type CadastrarDestinatarioUseCaseResponse = Either<
  null,
  {
    destinatario: Destinatario
  }
>

export class CadastrarDestinatarioUseCase {
  constructor(private destinatarioRepository: DestinatarioRepository) {}

  async execute({
    nome,
    cep,
    logradouro,
    numero,
    bairro,
    cidade,
    estado,
  }: CadastrarDestinatarioUseCaseRequest): Promise<CadastrarDestinatarioUseCaseResponse> {
    const destinatario = Destinatario.create({
      nome,
      cep,
      logradouro,
      numero,
      bairro,
      cidade,
      estado,
    })

    await this.destinatarioRepository.create(destinatario)

    return right({ destinatario })
  }
}
