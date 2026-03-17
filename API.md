# 🚀 Algorithms Hub API

API backend para execução e gerenciamento de algoritmos.

Este projeto permite que usuários executem algoritmos clássicos, salvem os resultados no banco de dados e consultem suas execuções posteriormente.

---

# 🧪 Testando a API com Postman

Você pode testar os endpoints da API utilizando o Postman ou qualquer outro cliente HTTP.

---

# 🛠️ Tecnologias Utilizadas

- Node.js
- Express
- PostgreSQL
- JWT (Autenticação)
- Joi (Validação)
- Arquitetura MVC + Service Layer

---

# 🌐 Base URL

Durante desenvolvimento:


http://localhost:3000


---

# 🔐 Autenticação

A API utiliza JWT (JSON Web Token).

Após o login, um token é retornado e deve ser enviado nas rotas protegidas:


Authorization: Bearer TOKEN


### Exemplo

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...


---

# 📦 Estrutura de Resposta da API

### ✅ Sucesso
```json
{
  "success": true,
  "message": "Mensagem da operação",
  "data": {}
}
❌ Erro
{
  "success": false,
  "message": "Descrição do erro"
}

📚 Endpoints
🔐 Autenticação
🟢 Registrar usuário

POST /auth/register

📌 O que faz

Cria um novo usuário no sistema.

📌 Quando usar

Quando um usuário for acessar o sistema pela primeira vez.

📥 Body
{
  "name": "Usuario",
  "email": "usuario@email.com",
  "password": "usuario123"
}
▶️ Como usar

Envie uma requisição POST com os dados do usuário.

✅ Response
{
  "success": true,
  "message": "Usuário registrado com sucesso",
  "data": {
    "id": 1,
    "name": "usuario",
    "email": "usuario@email.com"
  }
}
🔑 Login

POST /auth/login

📌 O que faz

Autentica o usuário e retorna um token JWT.

📌 Quando usar

Sempre que precisar acessar rotas protegidas.

📥 Body
{
  "email": "usuario@email.com",
  "password": "usuario123"
}
▶️ Como usar

Envie email e senha válidos.

✅ Response
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
🧠 Algoritmos
📋 Listar algoritmos disponíveis

GET /algorithms

📌 O que faz

Retorna todos os algoritmos registrados na aplicação.

📌 Quando usar

Quando quiser saber quais algoritmos podem ser executados.

🔒 Requer autenticação

Sim

▶️ Como usar

Envie uma requisição GET com token no header.

✅ Response
{
  "success": true,
  "message": "Algoritmos listados com sucesso",
  "data": [
    {
      "name": "quick_sort",
      "displayName": "Quick Sort",
      "description": "Ordena um array de números utilizando Quick Sort"
    }
  ]
}
⚙️ Executar algoritmo

POST /algorithms/run

📌 O que faz

Executa um algoritmo, mede o tempo de execução e salva o resultado no banco.

📌 Quando usar

Quando quiser rodar um algoritmo e armazenar o resultado.

🔒 Requer autenticação

Sim

📥 Body
{
  "algorithm": "quick_sort",
  "input": {
    "arr": [5,2,8,1]
  }
}
▶️ Como usar

Faça login

Envie o token

Informe algoritmo + input

✅ Response
{
  "success": true,
  "message": "Algoritmo executado com sucesso",
  "data": {
    "sorted": [1,2,5,8]
  }
}
❌ Possíveis erros

Algoritmo inválido

Input inválido

Token ausente

📝 Executions

Executions representam execuções de algoritmos feitas por usuários.

Cada execução pertence a um usuário.

➕ Criar execution

POST /executions

📌 O que faz

Cria manualmente uma execução no banco de dados.

📌 Quando usar

Quando quiser salvar uma execução sem rodar via API.

🔒 Requer autenticação

Sim

📥 Body
{
  "algorithm": "quick_sort",
  "input": "[5,3,2]",
  "output": "[2,3,5]",
  "execution_time": 10
}
🔍 Buscar execution por ID

GET /executions/:id

📌 O que faz

Retorna uma execução específica do usuário.

📌 Quando usar

Para visualizar detalhes de uma execução.

🔒 Requer autenticação

Sim

✏️ Atualizar execution

PUT /executions/:id

📌 O que faz

Atualiza dados de uma execução existente.

📌 Quando usar

Quando precisar corrigir ou alterar uma execução.

🔒 Requer autenticação

Sim

📥 Body
{
  "algorithm": "quick_sort",
  "input": "[5,4,3]"
}
🗑️ Deletar execution

DELETE /executions/:id

📌 O que faz

Remove uma execução do banco.

📌 Quando usar

Quando quiser excluir uma execução.

🔒 Requer autenticação

Sim

📄 Listar minhas executions

GET /executions

📌 O que faz

Retorna todas as execuções do usuário autenticado.

📌 Quando usar

Para visualizar histórico de execuções.

🔒 Requer autenticação

Sim

✅ Response
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

⚠️ Erros comuns

400	Dados inválidos
401	Token inválido ou ausente
404	Recurso não encontrado
500	Erro interno do servidor

📌 Observações finais

Cada usuário acessa apenas suas próprias executions
O campo input varia de acordo com o algoritmo
Execuções são persistidas no banco
API preparada para expansão

📈 Próximas melhorias

JSONB para input/output
Swagger/OpenAPI
Métricas de performance
Novos algoritmos