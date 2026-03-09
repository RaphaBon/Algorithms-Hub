# Algorithms Hub

⚠️ **Este projeto foi desenvolvido com fins educacionais e de estudo**, com o objetivo de praticar conceitos de desenvolvimento backend, arquitetura de software e construção de APIs REST.


Algorithms Hub é uma API backend para execução e gerenciamento de algoritmos.

A aplicação permite que usuários executem algoritmos clássicos, armazenem os resultados das execuções no banco de dados e consultem essas execuções posteriormente.

---

# Tecnologias Utilizadas

- Node.js
- Express
- PostgreSQL
- JWT (JSON Web Token)
- Joi (Validação de dados)

---

# Arquitetura

O projeto segue arquitetura:

MVC + Service Layer

Estrutura principal do projeto:

src/

controllers/ → controlam as requisições HTTP  
services/ → regras de negócio  
models/ → acesso ao banco de dados  
routes/ → definição das rotas da API  
middlewares/ → autenticação e tratamento de erros  
validators/ → validação de dados  
algorithms/ → implementação dos algoritmos  
algorithms/runners/ → execução dos algoritmos  

---

# Funcionalidades

A API possui as seguintes funcionalidades:

- Registro de usuários
- Login com autenticação JWT
- Execução de algoritmos
- Armazenamento das execuções no banco de dados
- Listagem de algoritmos disponíveis
- CRUD completo de executions
- Ownership de dados (cada usuário acessa apenas suas executions)
- Padronização de respostas da API

---

# Algoritmos disponíveis

Atualmente a API suporta os seguintes algoritmos:

- Quick Sort
- Binary Search
- Breadth First Search (BFS)
- Dijkstra

Novos algoritmos podem ser adicionados facilmente através do sistema de registry.

---

# Como rodar o projeto

## 1. Clonar o repositório

git clone https://github.com/RaphaBon/Algorithms-Hub.git

---

## 2. Entrar na pasta do projeto

cd Algorithms-Hub/backend

---

## 3. Instalar dependências

npm install

---

## 4. Criar arquivo .env

Crie um arquivo chamado `.env` na raiz do projeto.

Exemplo:

PORT=3000

DATABASE_URL=postgres://user:password@localhost:5432/algorithms_hub

JWT_SECRET=sua_chave_secreta

---

## 5. Rodar o servidor

npm run dev

O servidor será iniciado em:

http://localhost:3000

---

# Documentação da API

A documentação completa dos endpoints pode ser encontrada no arquivo:

API.md


# Autor

Raphael Alvares Bonjardim
