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

## ⚙️ Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env` e preencha os valores:

| Variável | Descrição | Padrão |
|---|---|---|
| `PORT` | Porta em que o servidor sobe | `3333` |
| `DATABASE_URL` | String de conexão do Postgres (ex.: banco do Supabase) | — (obrigatório) |
| `JWT_SECRET` | Segredo usado para assinar os tokens JWT | — (obrigatório) |
| `JWT_EXPIRES` | Tempo de expiração do token (ex.: `1h`) | — (obrigatório) |
| `ADMIN_EMAIL` | Email do admin padrão criado automaticamente na inicialização | `admin@admin.com` |
| `ADMIN_PASSWORD` | Senha do admin padrão criado automaticamente na inicialização | `adminpass` |

```bash
cp .env.example .env
```

## Conexão com o banco

Você precisa de um Postgres com a extensão **PostGIS** habilitada (usado no campo de localização do beneficiário). Após criar o banco, abra o Query Tool (ou psql) e rode:

```bash
CREATE EXTENSION postgis;
```

Depois, atualize `DATABASE_URL` no seu `.env` apontando para esse banco.