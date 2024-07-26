# Back End Nest

## Descrição

O objetivo deste projeto é desenvolver uma API para criação e gerenciamento de contas e usuários, utilizando o NestJS. Este projeto foi criado com o intuito de estudo e aprimoramento de habilidades em desenvolvimento back-end.

## Tecnologias Usadas

- NestJS
- Prisma
- AWS

## Como Rodar o Projeto

### Rodando Localmente

1. **Instalar Node.js v20, Docker e Docker Compose**

   Certifique-se de ter a versão 20 do node, o docker e o docker-compose instalados em sua máquina.

2. **Clonar e acessar o Repositório**

   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd <NOME_DO_REPOSITORIO>
   ```

3. **Criar e Preencher o Arquivo `.env`**

   Crie um arquivo `.env` na raiz do projeto e preencha-o de acordo com a descrição fornecida no arquivo `.env.example`.

4. **Instalar as dependências do projeto**

   ```bash
   npm run install
   ```

5. **Startar o Docker Compose**

   ```bash
   docker-compose -f docker-compose.local.yaml up -d --build
   ```

6. **Mapear o BD**

    ```bash
    npx prisma generate
    npx prisma migrate deploy
    ```

7. **Para executar o projeto**

    ```bash
    npm run start:local
    ```

8. **Para rodar os testes**

   ```bash
   # testes unitários
   npm run test

   # testes de integração
   npm run test:e2e

   # coverage
   npm run test:cov
   ```

9. **Visualizar a Documentação**

   Com o app em execução, é possível visualizar a documentação da API localmente em: [http://localhost:3000/docs](http://localhost:3000/docs)

