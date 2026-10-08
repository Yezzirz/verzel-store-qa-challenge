# Teste Técnico QA Júnior — Verzel Store

Projeto desenvolvido como parte do processo seletivo para a vaga de **QA Júnior na Verzel**.

O objetivo foi validar a entrega relacionada à aplicação de **cupons de desconto**, **frete grátis**, **limite de quantidade por produto** e regras de cálculo da Verzel Store, utilizando testes manuais, testes de API e automação com Playwright.

---

## Aplicação testada

**Verzel Store**

https://verzel-store.qa-test-verzel-store.workers.dev/

Documentação:

https://verzel-store.qa-test-verzel-store.workers.dev/documentacao

API:

```text
https://verzel-store.qa-test-verzel-store.workers.dev/api
```

---

## Escopo dos testes

Foram validados os seguintes comportamentos:

- Aplicação de cupom válido.
- Tratamento de letras maiúsculas e minúsculas no cupom.
- Tratamento de espaços antes e depois do código do cupom.
- Cupom inexistente.
- Cupom expirado.
- Remoção de cupom.
- Regra de frete grátis.
- Limite de R$ 200,00 para obtenção de frete grátis.
- Cálculo do valor faltante para o frete grátis.
- Aplicação do desconto sobre o subtotal.
- Validação de que o desconto não incide sobre o frete.
- Regra de frete grátis antes da aplicação do desconto.
- Limite máximo de 5 unidades por produto.
- Arredondamento de valores monetários.
- Endpoints de produtos.
- Cálculo do carrinho via API.
- Validações negativas da API.
- Criação de pedidos via API.

---

## Estratégia de testes

A validação foi dividida em diferentes camadas.

### Testes manuais

Os fluxos da interface foram executados manualmente utilizando **Microsoft Edge**.

Foram documentados:

- cenário;
- critério de aceite relacionado;
- pré-condições;
- dados de teste;
- passos;
- resultado esperado;
- resultado obtido;
- status `PASS` ou `FAIL`;
- evidência da execução.

Os cenários estão disponíveis em:

```text
docs/cenarios-de-testes.md
```

As evidências estão disponíveis em:

```text
docs/evidencias/
```

---

## Testes de API

Os testes de API foram executados manualmente utilizando **Postman**.

Foram validados os endpoints:

```text
GET /api/produtos
GET /api/produtos/{id}

POST /api/carrinho/calcular
POST /api/pedidos
```

Foram executados cenários positivos, negativos e de limite, incluindo:

- produto existente;
- produto inexistente;
- cupom válido;
- cupom inválido;
- cupom expirado;
- quantidade zero;
- quantidade superior ao limite;
- lista de itens vazia;
- produto duplicado;
- frete grátis;
- criação de pedido.

Os resultados também estão documentados em:

```text
docs/cenarios-de-testes.md
```

As evidências das requisições estão em:

```text
docs/evidencias/api/
```

---

## Bugs encontrados

Durante a execução foram encontrados dois defeitos.

### BUG-001 — Frete grátis não é aplicado com subtotal exatamente em R$ 200,00

O critério de aceite determina que compras com subtotal **igual ou superior a R$ 200,00** devem receber frete grátis.

Entretanto, com subtotal exatamente igual a R$ 200,00, o sistema continua cobrando R$ 19,90 de frete.

O problema foi reproduzido tanto pela interface quanto pela API.

Casos relacionados:

```text
CT-008
API-005
```

---

### BUG-002 — API permite quantidade superior ao limite máximo de 5 unidades

A interface impede corretamente que um produto ultrapasse 5 unidades.

Entretanto, uma requisição direta para:

```text
POST /api/carrinho/calcular
```

com quantidade igual a 6 é aceita pela API e o carrinho é calculado normalmente.

Caso relacionado:

```text
API-007
```

O relatório completo dos defeitos está disponível em:

```text
docs/bugs.md
```

---

## Automação de testes

Foram automatizados cenários utilizando **Playwright com JavaScript**.

Cenários automatizados:

```text
CT-001 — Aplicar cupom BEMVINDO10 com sucesso

CT-011 — Manter frete grátis quando o cupom reduz o total abaixo de R$ 200,00

CT-013 — Permitir no máximo 5 unidades por produto
```

A automação utiliza algumas práticas para facilitar manutenção e leitura:

- Page Object;
- locators semânticos do Playwright;
- uso de atributos estáveis do DOM quando apropriado;
- `test.describe`;
- `test.step`;
- assertions com `expect`;
- testes independentes;
- ausência de esperas fixas com `waitForTimeout`;
- captura de evidências em caso de falha.

Estrutura:

```text
tests/
├── pages/
│   └── store.page.js
├── cupom.spec.js
├── frete.spec.js
└── quantidade.spec.js
```

---

## Tecnologias utilizadas

- Playwright
- JavaScript
- Node.js
- Postman
- Git
- GitHub
- Microsoft Edge
- Markdown
- Gherkin / BDD

---

## Pré-requisitos

Para executar a automação é necessário possuir:

```text
Node.js
npm
```

Após clonar o projeto, instale as dependências:

```bash
npm install
```

Caso os navegadores do Playwright ainda não estejam instalados:

```bash
npx playwright install
```

---

## Executando os testes automatizados

Executar todos os testes no Chromium:

```bash
npx playwright test --project=chromium
```

Executar mostrando o navegador:

```bash
npx playwright test --project=chromium --headed
```

Executar apenas o cenário de cupom:

```bash
npx playwright test tests/cupom.spec.js --project=chromium
```

Executar apenas o cenário de frete:

```bash
npx playwright test tests/frete.spec.js --project=chromium
```

Executar apenas o cenário de quantidade:

```bash
npx playwright test tests/quantidade.spec.js --project=chromium
```

Executar toda a suíte configurada:

```bash
npx playwright test
```

---

## Relatório do Playwright

Após executar os testes, o relatório HTML pode ser aberto com:

```bash
npx playwright show-report
```

O Playwright também está configurado para gerar evidências em caso de falha, como screenshot, vídeo e trace.

---

## BDD / Gherkin

Alguns cenários críticos também foram descritos utilizando **Gherkin em português**, com o objetivo de representar as regras de negócio de maneira legível e orientada ao comportamento.

Arquivo:

```text
docs/gherkin/cenarios.feature
```

Exemplo:

```gherkin
# language: pt

Funcionalidade: Cupom de desconto e frete grátis

  Cenário: Aplicar cupom BEMVINDO10 com sucesso
    Dado que o carrinho contém 1 Mochila Urbana 20L no valor de R$ 100,00
    E nenhum cupom está aplicado
    Quando aplico o cupom "BEMVINDO10"
    Então o subtotal deve permanecer em R$ 100,00
    E o desconto deve ser de R$ 10,00
    E o frete deve ser de R$ 19,90
    E o total deve ser de R$ 109,90
```

O Gherkin foi utilizado para especificação dos comportamentos.

A execução automatizada foi implementada diretamente com Playwright, sem adicionar dependência de Cucumber.

---

## Estrutura do projeto

```text
VERZEL-TESTE/
│
├── docs/
│   ├── evidencias/
│   │   └── api/
│   ├── gherkin/
│   │   └── cenarios.feature
│   ├── bugs.md
│   └── cenarios-de-testes.md
│
├── tests/
│   ├── pages/
│   │   └── store.page.js
│   ├── cupom.spec.js
│   ├── frete.spec.js
│   └── quantidade.spec.js
│
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.js
└── README.md
```

---

## Uso de Inteligência Artificial

Ferramentas de Inteligência Artificial foram utilizadas como apoio durante o desenvolvimento do teste técnico.

A IA foi utilizada principalmente para:

- auxiliar na organização inicial dos cenários;
- revisar a estrutura da documentação;
- apoiar a criação inicial da estrutura dos testes Playwright;
- auxiliar na interpretação de erros apresentados pelo Playwright;

Todos os cenários foram analisados com base na documentação disponibilizada pela Verzel.

Os testes manuais e de API foram executados por mim, e os resultados obtidos foram conferidos antes de serem documentados.

Na automação, os locators e assertions foram ajustados de acordo com o comportamento e o DOM reais da aplicação durante a execução dos testes.

A IA foi utilizada como ferramenta de apoio, e não como substituição da análise e execução dos testes.

---

## Considerações finais

A execução dos testes permitiu validar os principais critérios de aceite da entrega e identificar comportamentos inconsistentes entre as regras documentadas e a implementação.

Os cenários que apresentaram falha foram documentados e relacionados aos respectivos bugs, mantendo rastreabilidade entre:

```text
Critério de aceite
        ↓
Caso de teste
        ↓
Execução
        ↓
Evidência
        ↓
Bug
```

Também foram automatizados cenários críticos utilizando Playwright com o objetivo de permitir futuras execuções de regressão.