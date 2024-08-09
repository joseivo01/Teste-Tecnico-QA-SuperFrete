# Teste Técnico - Analista de Testes (QA)

## Descrição

Este repositório contém o projeto desenvolvido para o Teste Técnico de Analista de Testes (QA) utilizando Cypress. O objetivo do teste é validar a tela de cálculo de frete do site [SuperFrete](https://web.superfrete.com/), cobrindo tanto o fluxo principal quanto cenários de erro.

## Proposta

### Configurações necessárias para a realização dos testes:

1. **Antes do teste iniciar:**
   - Limpar cookies e armazenamento local para garantir um estado limpo antes de cada teste.
   - Definir a resolução padrão da tela para 1366x768 para testar a aplicação de forma consistente.
   - Aguardar 10 segundos após acessar a URL para garantir que todos os serviços e elementos da página carreguem completamente.

2. **Configuração de tratamento de exceções:**
   - Implementado tratamento de exceções no Cypress para ignorar erros não tratados:

     ```javascript
     Cypress.on('uncaught:exception', (err, runnable) => {
       // Retornar false para impedir que o Cypress falhe o teste em caso de exceção não tratada
       return false;
     });
     ```

## Requisitos

1. O projeto de teste foi implementado utilizando o Cypress.
2. A entrega deve ser feita com o link do GitHub contendo o código escrito para o projeto e os comandos para a execução dos testes.
3. Para realizar o teste, é necessário acessar a página [SuperFrete](https://web.superfrete.com/) (não é necessário login).
4. O projeto valida a tela de cálculo, garantindo a cobertura dos seguintes fluxos:
   - **Fluxo principal:**
     1. Usuário informa CEP de origem.
     2. Usuário seleciona o formato "Caixa / Pacote".
     3. Usuário seleciona o peso "300g".
     4. Usuário informa a altura.
     5. Usuário informa a largura.
     6. Usuário informa o comprimento.
     7. Usuário informa o CEP de destino.
     8. Usuário seleciona a opção "CALCULAR FRETE COM DESCONTO".
     9. Usuário deve visualizar as informações de mini envios, PAC e SEDEX.

   - **Fluxos de erro:**
     1. Usuário não informa CEP de origem e deve visualizar uma mensagem de erro.
     2. Usuário não informa CEP de destino e deve visualizar uma mensagem de erro.
     3. Usuário seleciona o formato "Caixa / Pacote", peso "300g", e informa dimensões inválidas (altura < 0.4 cm, largura < 8 cm, comprimento < 13 cm) e deve visualizar três mensagens de erro.
     4. Usuário tenta calcular o envio do pacote com soma de altura, largura e comprimento inválidos, e deve visualizar uma mensagem de erro.
     5. Usuário tenta calcular o envio do pacote com valor abaixo de 12,25 da altura e deve visualizar uma mensagem de erro.
     6. Usuário tenta calcular o envio do pacote com o CEP de origem inválido e deve visualizar uma mensagem de erro.
     7. Usuário tenta calcular o envio do pacote com o CEP de destino inválido e deve visualizar uma mensagem de erro.
     8. Usuário tenta calcular o valor do frete do produto com o campo "CEP de origem" vazio e deve visualizar uma mensagem de erro.
     9. Usuário tenta calcular o valor do frete do produto com o campo "Peso" vazio e deve visualizar uma mensagem de erro.
     10. Usuário tenta calcular o valor do frete do produto com o campo "Altura" vazio e deve visualizar uma mensagem de erro.
     11. Usuário tenta calcular o valor do frete do produto com o campo "Largura" vazio e deve visualizar uma mensagem de erro.
     12. Usuário tenta calcular o valor do frete do produto com o campo "Comprimento" vazio e deve visualizar uma mensagem de erro.
     13. Usuário tenta calcular o valor do frete do produto com o campo "CEP de destino" vazio e deve visualizar uma mensagem de erro.
     14. Usuário tenta calcular o frete informando dimensões fora dos limites aceitáveis:
     15. Altura maior que 150cm.
     16. Largura maior que 150cm.
     17. Comprimento maior que 150cm.
     18. Altura menor que 0.4cm.
     19. Largura menor que 8cm.
     20. Comprimento menor que 13cm.
     21. E deve visualizar uma mensagem de erro correspondente para cada campo inválido.

## Como Executar os Testes

1. Clone o repositório:
   ```bash
   git clone https://github.com/joseivo01/Teste-Tecnico-QA-SuperFrete.git
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Execute os testes utilizando os seguintes scripts npm:

   - **Abrir Cypress com interface grafica:**
     ```bash
     npm run cypress:open
     ```

   - **Executar todos os testes em modo headless:**
     ```bash
     npm run cypress:run:all
     ```

   - **Executar em modo headless para diferentes viewports:**
     - **Mobile (375x667):**
       ```bash
       npm run cypress:run:mobile
       ```

     - **Tablet (768x1024):**
       ```bash
       npm run cypress:run:tablet
       ```

     - **Desktop (1366x768):**
       ```bash
       npm run cypress:run:desktop
       ```

## Estrutura do Projeto

- **cypress/e2e/integration:** Contém os testes automatizados.
- **cypress/support:** Contém arquivos de suporte, como comandos personalizados.
- **cypress/fixtures:** Contém arquivos JSON utilizados para alimentar os testes.

## Observações

- A resolução padrão dos testes é de 1366x768, mas o projeto inclui scripts para testar em resoluções mobile e tablet.
- O projeto implementa o tratamento de exceções para evitar falhas devido a erros inesperados.

### Resultado dos Testes

```plaintext
  Spec                                              Tests  Passing  Failing  Pending  Skipped
  ┌──────────────────────────────────────────────────────────────────────────────────────────────┐
  │ √  calculo.spec.cy.js                         03:22       22       22        -        -       │
  └──────────────────────────────────────────────────────────────────────────────────────────────┘
    √  All specs passed!                          03:22       22       22        -        -       
```

## Scripts no `package.json`

Aqui estão os scripts disponíveis no `package.json` para facilitar a execução dos testes:

```json
{
  "version": "1.0.0",
  "scripts": {
    "cypress:run": "npx cypress run --headless",
    "cypress:run:mobile": "npx cypress run --headless --config viewportWidth=375,viewportHeight=667",
    "cypress:run:tablet": "npx cypress run --headless --config viewportWidth=768,viewportHeight=1024",
    "cypress:run:desktop": "npx cypress run --headless --config viewportWidth=1366,viewportHeight=768",
    "cypress:open": "npx cypress open",
    "cypress:open:mobile": "npx cypress open --config viewportWidth=375,viewportHeight=667",
    "cypress:open:tablet": "npx cypress open --config viewportWidth=768,viewportHeight=1024",
    "cypress:open:desktop": "npx cypress open --config viewportWidth=1366,viewportHeight=768",
    "cypress:run:all": "npm run cypress:run && npm run cypress:run:mobile && npm run cypress:run:tablet && npm run cypress:run:desktop"
  },
  "devDependencies": {
    "cypress": "^13.13.2"
  }
}
```

```plaintext
Este markdown inclui toda a documentação necessária para o projeto, incluindo a descrição, proposta, requisitos,estrutura do projeto, resultado dos testes e os scripts disponíveis no `package.json`.
```
