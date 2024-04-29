# Aplicativo Web de Gerenciamento de Usuários

Este é um aplicativo da web desenvolvido para interagir com a minha [API de Gerenciamento de Usuários](https://github.com/felipemariano29/api-user-management). Ele permite que os usuários se registrem, façam login, visualizem e editem informações de usuários, sob a autenticação de administradores.

## Funcionalidades

- **Registro de Usuário:** Permite que novos usuários se registrem fornecendo nome, email e senha.
- **Login de Usuário:** Permite que os usuários façam login no aplicativo usando email e senha.
- **Listagem de Usuários:** Exibe uma lista de usuários cadastrados no sistema.
- **Edição de Usuários:** Permite que os administradores editem informações de usuários existentes.
- **Exclusão de Usuários:** Permite que os administradores excluam usuários do sistema.

## Configuração do Projeto

Antes de usar o aplicativo, é necessário configurar o ambiente. Certifique-se de ter o Node.js instalado em sua máquina. Em seguida, instale as dependências do projeto executando o comando `npm install`. Após a instalação, você pode iniciar o servidor de desenvolvimento usando o comando `npm run serve`.

## Rotas

- **/register:** Rota para registro de novos usuários.
- **/login:** Rota para login de usuários existentes.
- **/admin/users:** Rota para visualizar todos os usuários (exclusivo para administradores).
- **/admin/users/edit/:id:** Rota para editar informações de um usuário específico (exclusivo para administradores).

## Tecnologias Utilizadas

- **Vue.js:** Framework JavaScript para construção de interfaces de usuário.
- **Vue Router:** Roteador oficial para aplicativos Vue.js.
- **Axios:** Cliente HTTP baseado em Promises para fazer requisições AJAX.
- **Bulma:** Framework CSS baseado em flexbox para criar interfaces responsivas.
