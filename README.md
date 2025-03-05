# Desafio 05 - FastFeet

Todos os comandos foram executados utilizando o sistema operacional Ubuntu 24.04 LTS


## Introdução

Nesse desafio desenvolveremos uma API para controle de encomendas de uma transportadora fictícia, a FastFeet.
Regras da aplicação

### Regras da aplicação
- A aplicação deve ter dois tipos de usuário, entregador e/ou admin
- Deve ser possível realizar login com CPF e Senha
- Deve ser possível realizar o CRUD dos entregadores
- Deve ser possível realizar o CRUD das encomendas
- Deve ser possível realizar o CRUD dos destinatários
- Deve ser possível marcar uma encomenda como aguardando (Disponível para retirada)
- Deve ser possível retirar uma encomenda
- Deve ser possível marcar uma encomenda como entregue
- Deve ser possível marcar uma encomenda como devolvida
- Deve ser possível listar as encomendas com endereços de entrega próximo ao local do entregador
- Deve ser possível alterar a senha de um usuário
- Deve ser possível listar as entregas de um usuário
- Deve ser possível notificar o destinatário a cada alteração no status da encomenda

### Regras de negócio
- Somente usuário do tipo admin pode realizar operações de CRUD nas encomendas
- Somente usuário do tipo admin pode realizar operações de CRUD dos entregadores
- Somente usuário do tipo admin pode realizar operações de CRUD dos destinatários
- Para marcar uma encomenda como entregue é obrigatório o envio de uma foto
- Somente o entregador que retirou a encomenda pode marcar ela como entregue
- Somente o admin pode alterar a senha de um usuário
- Não deve ser possível um entregador listar as encomendas de outro entregador
- Conceitos que pode praticar
- DDD, Domain Events, Clean Architecture
- Autenticação e Autorização (RBAC)
- Testes unitários e e2e
- Integração com serviços externos

## Instalação

```bash
npm install
```

### Gerar chave privada e publica

```bash
openssl genpkey -algorithm RSA -out ./src/storage/security/private_key.pem -pkeyopt rsa_keygen_bits:2048
```

```bash
openssl rsa -in ./src/storage/security/private_key.pem -pubout -out ./src/storage/security/public_key.pem
```

## Execução

```bash
npm run start:dev
```
