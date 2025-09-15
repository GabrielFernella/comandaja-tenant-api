# Tenant Service

This project is the `tenant-service`, a microservice within the Sabor Carioca API ecosystem. Its primary responsibility is to manage tenants and their stores.

## Building and Running with Docker

This service is configured to run in different environments using Docker Compose.

### Environment Setup

Configuration is managed through `.env` files:

- `.env.dev`: Variables for the development environment.
- `.env.prod`: Variables for the production environment.

### Running in Development

For development, the setup uses `docker-compose.override.yml` to enable hot-reloading.

1.  **Build the images:**
    ```bash
    docker-compose --env-file .env.dev build
    ```

2.  **Start the services:**
    ```bash
    docker-compose --env-file .env.dev up
    ```

    The service will be available at `http://localhost:3005` (or the `PORT` specified in `.env.dev`).

### Running in Production

For production, a `docker-compose.prod.yml` file is used to run the application with production settings.

1.  **Build the images:**
    ```bash
    docker-compose --env-file .env.prod -f docker-compose.yml -f docker-compose.prod.yml build
    ```

2.  **Start the services in detached mode:**
    ```bash
    docker-compose --env-file .env.prod -f docker-compose.yml -f docker-compose.prod.yml up -d
    ```

### Managing the Database

To run database migrations, you can execute the `typeorm` command inside the running `app` container.

**Example (Development):**

```bash
# Generate a new migration
docker-compose --env-file .env.dev exec app npm run typeorm -- migration:generate src/shared/typeorm/migrations/MyNewMigration -d src/config/database.ts

# Run all pending migrations
docker-compose --env-file .env.dev exec app npm run typeorm -- migration:run -d src/config/database.ts
```

1. Refatoração dos Arquivos Docker:
       * docker-compose.yml: Agora é um arquivo base limpo, usando variáveis de ambiente para todas as configurações.
       * docker-compose.override.yml: Simplificado para conter apenas as configurações de desenvolvimento (hot-reload, portas, etc.).
       * docker-compose.prod.yml: Novo arquivo criado para as configurações específicas de produção.

   2. Criação dos Arquivos de Ambiente:
       * .env.dev: Contém as variáveis para o ambiente de desenvolvimento.
       * .env.prod: Contém as variáveis para o ambiente de produção (lembre-se de alterar as senhas marcadas como CHANGE_ME_IN_PRODUCTION).

Deligar todos os Containers
    docker stop $(docker ps -q)

Limpeza de containers
  1. Parar e Remover os Contêineres
  Este comando para e remove os contêineres, mas mantém os dados do banco de dados (o volume).
   1 docker-compose --env-file .env.dev down

  2. Limpar o Banco de Dados
  Para recriar o banco de dados do zero, você precisa usar a flag --volumes. Isso irá parar e remover os contêineres e deletar o volume do banco de dados.
   1 # Para o ambiente de desenvolvimento
   2 docker-compose --env-file .env.dev down --volumes