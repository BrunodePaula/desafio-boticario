# desafio-boticario

### Rotas

- `POST /sessions`: A rota deve receber `email` e `password` dentro corpo para realizar o login.

- `POST /dealer`: A rota deve receber `name`, `cpf`, `email`, e `password` dentro corpo para realizar o cadastro.

- `POST /purchase`: A rota deve receber `code`, `value`, `date`, e `cpf_dealer` dentro corpo para realizar o cadastro.

- `GET /purchase/:cpf`: Rota que lista o calculo de cashback de todas as compras do usuário especificado;

- `GET /purchase-index/:code`: Rota que lista o calculo de cashback de compras a partir do `code` especificado;

- `GET /cashback`: Rota que lista o calculo de cashback a partir de uma api externa;

- `GET /cashback/:cpf`: Rota que lista o calculo de cashback do `cpf` especificado e buscando de uma api externa;

### Middlewares

- Middleware global chamado em todas requisições para a verificar se o usuário está logado;
