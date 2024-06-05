# Controle de Pedidos e Vendas

## Descrição
Esta é uma aplicação web para gerenciamento de pedidos e vendas, com funcionalidades de registro e login de usuários, criação e visualização de pedidos, geração de relatórios e um dashboard com gráficos interativos. A aplicação foi desenvolvida utilizando Firebase, Tailwind CSS e Chart.js.

## Funcionalidades

- **Autenticação de Usuário**:
  - Registro de novos usuários.
  - Login de usuários existentes.

- **Gestão de Pedidos**:
  - Criação de pedidos com informações detalhadas: fornecedor, data do pedido, produto, quantidade, preço por unidade (custo), e preço de venda por unidade.
  - Cálculos automáticos de preço total (custo), preço total de venda, margem de lucro por unidade, margem de lucro total e porcentagem de lucro por unidade.
  - Armazenamento dos pedidos no Firestore.
  - Apagar pedidos diretamente na lista de pedidos.

- **Dashboard com Gráficos**:
  - Visualização de total de vendas, margem de lucro, pedidos por fornecedor, gastos vs lucro, e vendas semanais.
  - Gráficos interativos utilizando Chart.js.

- **Relatórios**:
  - Relatório semanal de vendas, incluindo quantidade de peças vendidas e valor total vendido.
  - Relatório mensal com quantidade total de peças vendidas e valor total vendido.

## Tecnologias Utilizadas

- **Frontend**:
  - HTML5
  - CSS3 (Tailwind CSS)
  - JavaScript (ES6)
  - Chart.js

- **Backend**:
  - Firebase Authentication
  - Firebase Firestore

## Como Executar o Projeto

### Pré-requisitos

- Conta no Firebase

### Passos para Configuração

1. **Clone o Repositório**:
    ```sh
    git clone https://github.com/seu-usuario/seu-repositorio.git
    cd seu-repositorio
    ```

2. **Configuração do Firebase**:
   - Crie um projeto no Firebase.
   - Habilite o Authentication (Email/Password).
   - Crie uma Firestore Database.
   - Configure as regras do Firestore para permitir leitura e escrita apenas para usuários autenticados.

3. **Configuração das Variáveis de Ambiente**:
   - Crie um arquivo `firebaseConfig.js` no diretório raiz do projeto e adicione suas credenciais do Firebase:
    ```javascript
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
    import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
    import { getFirestore, collection, getDocs, deleteDoc, doc, addDoc, query, where } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID"
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);

    export { auth, db, collection, getDocs, deleteDoc, doc, addDoc, query, where, onAuthStateChanged };
    ```

4. **Estrutura do Projeto**:
   - O projeto está organizado da seguinte maneira:
    ```
    controle-pedidos/
    ├── index.html
    ├── login.html
    ├── register.html
    ├── dashboard.html
    ├── simulate.html
    ├── reports.html
    ├── weekly-input.html
    ├── monthly-sales-report.html
    ├── app.js
    ├── auth.js
    ├── dashboard.js
    ├── simulate.js
    ├── reports.js
    ├── weekly-input.js
    ├── monthly-sales-report.js
    ├── tailwind.css
    └── firebaseConfig.js
    ```

## Executando a Aplicação

1. **Abra o arquivo `index.html` em um navegador**:
    - O navegador deve carregar a aplicação e permitir que você faça o registro e login, crie e visualize pedidos, e veja o dashboard e os relatórios.

## Contribuição

Se você quiser contribuir para o projeto, por favor, crie um fork do repositório, faça suas alterações e envie um pull request.

## Licença

Este projeto está licenciado sob a MIT License. Veja o arquivo `LICENSE` para mais detalhes.

## Contato

- Nome: Seu Nome
- Email: seu-email@example.com
- GitHub: [seu-usuario](https://github.com/seu-usuario)

