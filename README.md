# 📝 README - Projeto PW1

## 📌 Visão Geral

Bem-vindo ao projeto para a disciplina de PW1. Este projeto consiste em uma API robusta desenvolvida em Node.js com TypeScript e Express, utilizando TSX para execução em desenvolvimento.

## 🚀 Tecnologias Utilizadas

-   **Node.js** (v18+ recomendado)
-   **TypeScript** (v5+)
-   **Express** (Framework web)
-   **TSX** (Runtime para TypeScript)
-   **CORS** (Middleware para Cross-Origin Resource Sharing)

## 🛠️ Pré-requisitos

-   Node.js (v16 ou superior)
-   npm (v8 ou superior) ou yarn
-   Git (para clonar o repositório)

## ⚙️ Configuração do Ambiente

1. **Clone o repositório**:

    ```bash
    git clone https://github.com/ron010-1/criancaFeliz-pw1.git
    ```

2. **Acesse o diretório do projeto**:

    ```bash
    cd criancaFeliz-pw1
    ```

3. **Instale as dependências**:
    ```bash
    npm install
    ```

## 🏃 Executando o Projeto

### Modo Desenvolvimento (com hot-reload)

```bash
npm run dev
```

## 🌐 Acessando a API

O servidor estará disponível em:

```
http://localhost:3333/
```

## Conexão com Docker

Você precisa estar rodando o postgres e o pgadmin4, crie um banco com nome ao seu critério, quando criar o banco abra o
query tool e rode :

```bash
CREATE EXTENSION postgis;
```

Após isso atualize suas envs de acordo com o .env.example

Ou utilize o docker-compose, com o comando:

```bash
docker-compose up -d
```

Habilite a extensão PostGIS
Acesse o pgAdmin pelo navegador: http://localhost:8080

Login:

Email: admin@admin.com

Senha: admin

Conecte-se ao banco projectpw (usuário: postgres, senha: postgres).

Abra o Query Tool e rode:

```bash
CREATE EXTENSION postgis;
```