<p align="center">
  <a href="https://github.com/Leon4rdoMonteiro">
    <img src="https://avatars0.githubusercontent.com/u/38729977?s=200&v=4" width=300 height=300 alt="Logo">
  </a>
</p>

<h1 align="center">LinkApi - Node.js Back-end Developer Test</h1>

Autor: [Leonardo Monteiro](https://github.com/Leon4rdoMonteiro)

### 🚀 API com integrações construída para teste na LinkApi.

   + 🌠 Foram utilizadas as tecnologias:
        - Node.js, Express, MongoDB.


   + 📝 Padronização de código e documentação:
        - ESlint, Prettier e Swagger. 
      
   + 🛠 Ferramentas/Libs:
        - Insomnia, Mongoose, Axios, Jest

   + 🏗️ Integrações:
        - Pipedrive
        - Bling
    
   + 🔏 Segurança: 
        - helmet: Configura cabeçalhos HTTP e protege contra vários ataques como XSS e Sniffing.
        - express-rate-limit: Criar um limiter para lidar com requisições maliciosas.  

<br>
        
 ## 🖊 Configurações:

  - PARA FACILITAR A EXECUÇÃO, AS VARIÁVEIS DE AMBIENTE JÁ FORAM SETADAS NO ARQUIVO: ```.env```.

<br>

 ## 🏁 Instalação:
  
   - 1.Instalar todas as dependências:
   
     ```bash
     $ npm install
     ```

   - 2.Rodar testes unitários:

     ```bash
     $ npm run test
     ```
   - 3.Rodar testes coletando coverage reports:

     ```bash
     $ npm run test:cov
     ```

   - 4.Executar API em ambiente de desenvolvimento:

     ```bash
     $ npm run start:dev

     ```
  - 5.Executar API em ambiente de staging/produção:

     ```bash
     $ npm run start:prod
     ```

<br>

  ## 📦 Outras informações:

   - 1.Existe um arquivo de importação de workspace criado para utilizar como cliente HTTP (Insomnia)
     - Localizado na pasta /http_client no código fonte

   - 2.Link da especificação (Documentação de API):
        - https://app.swaggerhub.com/apis-docs/Leon4rdoMonteiro/linkapi-test.api/1.0.0
   
