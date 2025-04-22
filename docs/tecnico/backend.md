# Documentação Técnica - Backend

## Visão Geral da API

O backend do Gestão DriverPro será desenvolvido como uma API RESTful moderna e escalável, seguindo as melhores práticas de desenvolvimento e segurança.

## Tecnologias Principais

- **Node.js com NestJS**: Framework escolhido para o desenvolvimento do backend
- **TypeScript**: Linguagem principal, garantindo type safety
- **PostgreSQL**: Banco de dados relacional
- **JWT**: Autenticação e autorização
- **Swagger/OpenAPI**: Documentação da API

## Endpoints Principais

### Autenticação
- POST `/auth/login`
- POST `/auth/register`
- POST `/auth/refresh-token`
- POST `/auth/forgot-password`

### Lançamentos
- GET `/lancamentos`
- POST `/lancamentos`
- PUT `/lancamentos/:id`
- DELETE `/lancamentos/:id`

[Saiba mais sobre a Infraestrutura](/tecnico/infraestrutura)