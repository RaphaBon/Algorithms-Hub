# Algorithms Hub API

API backend para execução e gerenciamento de algoritmos.

Este projeto permite que usuários executem algoritmos clássicos, salvem os resultados no banco de dados e consultem suas execuções posteriormente.

---

# Testando a API com Postman

Você pode testar os endpoints da API utilizando o Postman ou qualquer outro cliente HTTP.


# Tecnologias Utilizadas

- Node.js
- Express
- PostgreSQL
- JWT (Autenticação)
- Joi (Validação)
- Arquitetura MVC + Service Layer

---

# Base URL

Durante desenvolvimento:

http://localhost:3000

---

# Autenticação

A API utiliza **JWT (JSON Web Token)** para autenticação.

Após realizar login, um token será retornado.

Esse token deve ser enviado no header das requisições protegidas.

Authorization: Bearer TOKEN

Exemplo:

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

---

# Estrutura de Resposta da API

Todas as respostas seguem o padrão:

## Sucesso

{
  "success": true,
  "message": "Mensagem da operação",
  "data": {}
}

## Erro

{
  "success": false,
  "message": "Descrição do erro"
}

---

# Endpoints

## Autenticação

## Registrar usuário

POST /auth/register

Cria um novo usuário.

### Body

{
  "name": "Usuario",
  "email": "usuario@email.com",
  "password": "usuario123"
}

### Response

{
  "success": true,
  "message": "Usuário registrado com sucesso",
  "data": {
    "id": 1,
    "name": "usuario",
    "email": "usuario@email.com"
  }
}

---

## Login

POST /auth/login

Autentica um usuário e retorna um token JWT.

### Body

{
  "email": "usuario@email.com",
  "password": "usuario123"
}

### Response

{
  "success": true,
  "message": "Login realizado com sucesso",
  "data": {
    "user": {
      "id": 1,
      "name": "Usuario",
      "email": "usuario@email.com"
    },
    "token": "JWT_TOKEN"
  }
}

---

## Algoritmos

---

## Listar algoritmos disponíveis

GET /algorithms

Retorna todos os algoritmos registrados na aplicação.

### Response

{
  "success": true,
  "message": "Algoritmos listados com sucesso",
  "data": [
    {
      "name": "quick_sort",
      "displayName": "Quick Sort",
      "description": "Ordena um array de números utilizando Quick Sort"
    },
    {
      "name": "binary_search",
      "displayName": "Binary Search",
      "description": "Busca binária em um array ordenado"
    },
    {
      "name": "bfs",
      "displayName": "Breadth-First Search",
      "description": "Busca em largura em um grafo"
    },
    {
      "name": "dijkstra",
      "displayName": "Dijkstra",
      "description": "Menor caminho em grafo com pesos positivos"
    }
  ]
}

---

## Executar algoritmo

POST /algorithms/run

Executa um algoritmo e salva o resultado.

Requer autenticação.

### Headers

Authorization: Bearer TOKEN

### Body

Exemplo com Quick Sort:

{
  "algorithm": "quick_sort",
  "input": {
    "arr": [5,2,8,1]
  }
}

### Response

{
  "success": true,
  "message": "Algoritmo executado com sucesso",
  "data": {
    "sorted": [1,2,5,8]
  }
}

---

## Executions

Executions representam execuções de algoritmos feitas por usuários.

Cada execução pertence a um usuário.

---

## Criar execution

POST /executions

Requer autenticação.

### Body

{
  "algorithm": "quick_sort",
  "input": "[5,3,2]",
  "output": "[2,3,5]",
  "execution_time": 10
}

### Response

{
  "success": true,
  "message": "Execução criada com sucesso",
  "data": {
    "id": 1,
    "algorithm": "quick_sort",
    "input": "[5,3,2]",
    "output": "[2,3,5]",
    "execution_time": 10,
    "user_id": 1
  }
}

---

## Buscar execution por ID

GET /executions/:id

Requer autenticação.

Retorna uma execução específica do usuário.

### Response

{
  "success": true,
  "message": "Execução encontrada com sucesso",
  "data": {
    "id": 1,
    "algorithm": "quick_sort",
    "input": "[5,3,2]",
    "output": "[2,3,5]",
    "execution_time": 10
  }
}

---

## Atualizar execution

PUT /executions/:id

Requer autenticação.

### Body

{
  "algorithm": "quick_sort",
  "input": "[5,4,3]"
}

### Response

{
  "success": true,
  "message": "Execução atualizada com sucesso",
  "data": {
    "id": 1,
    "algorithm": "quick_sort",
    "input": "[5,4,3]"
  }
}

---

## Deletar execution

DELETE /executions/:id

Requer autenticação.

### Response

{
  "success": true,
  "message": "Execução deletada com sucesso",
  "data": null
}

---

## Listar minhas executions

GET /executions

Requer autenticação.

Retorna todas as execuções do usuário autenticado.

### Response

{
  "success": true,
  "message": "Execuções listadas com sucesso",
  "data": [
    {
      "id": 1,
      "algorithm": "quick_sort",
      "execution_time": 10
    }
  ]
}

---

# Próximas Melhorias

Planejadas para versões futuras da API:

- Migração de input e output para JSONB
- Documentação com Swagger/OpenAPI
- Métricas de performance dos algoritmos
- Novos algoritmos