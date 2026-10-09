# Cenários de Teste — Verzel Store

## Escopo

Validação da entrega de:
- Cupom de desconto
- Frete grátis
- Cálculo do carrinho
- Limite de quantidade por produto
- Regras relacionadas via interface e API

---

# 1. Cupom de desconto

## CT-001 — Aplicar cupom BEMVINDO10 com sucesso

**Critério relacionado:** CA01  
**Tipo:** Funcional / Positivo  
**Prioridade:** Alta

**Pré-condições:**
- Carrinho contendo 1 Mochila Urbana 20L (R$ 100,00).
- Nenhum cupom aplicado.

**Passos:**
1. Acessar o carrinho.
2. Informar o cupom `BEMVINDO10`.
3. Aplicar o cupom.

**Resultado esperado:**
- O cupom deve ser aplicado com sucesso.
- O subtotal deve permanecer R$ 100,00.
- O desconto deve ser R$ 10,00.
- O frete deve ser R$ 19,90.
- O total deve ser R$ 109,90.

**Resultado obtido:**
- O cupom foi aplicado com sucesso.
- O subtotal permaneceu em R$ 100,00.
- O desconto aplicado foi de R$ 10,00.
- O frete permaneceu em R$ 19,90.
- O total apresentado foi de R$ 109,90.

**Status:** PASS

**Evidência:**
[Ver evidência CT-001](evidencias/ct-001-cupom-valido.png)

---

## CT-002 — Aplicar cupom utilizando letras minúsculas

**Critério relacionado:** CA02  
**Tipo:** Funcional / Positivo  
**Prioridade:** Alta

**Pré-condições:**
- Produto adicionado ao carrinho.
- Nenhum cupom aplicado.

**Passos:**
1. Acessar o carrinho.
2. Informar `bemvindo10`.
3. Aplicar o cupom.

**Resultado esperado:**
- O cupom deve ser reconhecido como `BEMVINDO10`.
- O desconto de 10% deve ser aplicado normalmente.

**Resultado obtido:**
- O cupom informado em letras minúsculas foi reconhecido como válido.
- O desconto de 10% foi aplicado normalmente.

**Status:** PASS

**Evidência:**
[Ver evidência CT-002](evidencias/ct-002-cupom-minusculo.mp4)

---

## CT-003 — Aplicar cupom com espaços no início e no fim

**Critério relacionado:** CA02  
**Tipo:** Funcional / Positivo  
**Prioridade:** Alta

**Passos:**
1. Adicionar um produto ao carrinho.
2. Informar o cupom `  BEMVINDO10  `.
3. Aplicar.

**Resultado esperado:**
- Os espaços no início e no fim devem ser ignorados.
- O cupom deve ser aplicado.
- Deve ser concedido desconto de 10%.

**Resultado obtido:**
- Os espaços no início e no fim do código foram ignorados.
- O cupom foi reconhecido como válido.
- O desconto de 10% foi aplicado corretamente.

**Status:** PASS

**Evidência:**
[Ver evidência CT-003](evidencias/ct-003-cupom-espacos.mp4)

---

## CT-004 — Aplicar cupom combinando minúsculas e espaços

**Critério relacionado:** CA02  
**Tipo:** Funcional / Positivo  
**Prioridade:** Média

**Passos:**
1. Adicionar um produto ao carrinho.
2. Informar `  bemvindo10  `.
3. Aplicar.

**Resultado esperado:**
- Diferenças entre maiúsculas/minúsculas e espaços externos devem ser ignoradas.
- O desconto de 10% deve ser aplicado.

**Resultado obtido:**
- O sistema ignorou diferenças entre maiúsculas/minúsculas e os espaços externos.
- O cupom foi reconhecido e o desconto de 10% foi aplicado.

**Status:** PASS

**Evidência:**
[Ver evidência CT-004](evidencias/ct-004-cupom-minusculo-espacos.mp4)

---

## CT-005 — Aplicar cupom inexistente

**Critério relacionado:** CA03  
**Tipo:** Funcional / Negativo  
**Prioridade:** Alta

**Passos:**
1. Adicionar um produto ao carrinho.
2. Informar um cupom inexistente, por exemplo `TESTE123`.
3. Aplicar.

**Resultado esperado:**
- Deve ser exibida a mensagem `Cupom inválido.`
- Nenhum desconto deve ser aplicado.
- O total do pedido deve permanecer sem desconto.

**Resultado obtido:**
- A mensagem `Cupom inválido.` foi exibida.
- Nenhum desconto foi aplicado.
- O total permaneceu sem alteração referente a desconto.

**Status:** PASS

**Evidência:**
[Ver evidência CT-005](evidencias/ct-005-cupom-invalido.png)

---

## CT-006 — Aplicar cupom expirado

**Critério relacionado:** CA04  
**Tipo:** Funcional / Negativo  
**Prioridade:** Alta

**Dados de teste:**
- Cupom: `VERAO2026`

**Passos:**
1. Adicionar um produto ao carrinho.
2. Informar `VERAO2026`.
3. Aplicar.

**Resultado esperado:**
- Deve ser exibida a mensagem `Cupom expirado.`
- Nenhum desconto deve ser aplicado.

**Resultado obtido:**
- A mensagem `Cupom expirado.` foi exibida.
- Nenhum desconto foi aplicado ao carrinho.

**Status:** PASS

**Evidência:**
[Ver evidência CT-006](evidencias/ct-006-cupom-expirado.png)

---

## CT-007 — Remover cupom aplicado

**Critério relacionado:** CA05  
**Tipo:** Funcional / Positivo  
**Prioridade:** Alta

**Pré-condições:**
- Cupom `BEMVINDO10` aplicado ao carrinho.

**Passos:**
1. Conferir o valor com desconto.
2. Remover o cupom.

**Resultado esperado:**
- O cupom deve deixar de ser aplicado.
- O desconto deve voltar para R$ 0,00.
- O total deve ser recalculado sem desconto.
- Deve ser possível informar outro cupom.

**Resultado obtido:**
- O cupom aplicado foi removido com sucesso.
- O desconto deixou de ser aplicado.
- O valor total foi recalculado sem o desconto.
- O campo de cupom ficou disponível para uma nova aplicação.

**Status:** PASS

**Evidência:**
[Ver evidência CT-007](evidencias/ct-007-remover-cupom.mp4)

---

# 2. Frete grátis e regras de cálculo

## CT-008 — Aplicar frete grátis exatamente no limite de R$ 200,00

**Critério relacionado:** CA06  
**Tipo:** Funcional / Limite  
**Prioridade:** Alta

**Dados de teste:**
- Produto: Mochila Urbana 20L
- Preço unitário: R$ 100,00
- Quantidade: 2
- Subtotal esperado: R$ 200,00

**Passos:**
1. Adicionar 2 unidades da Mochila Urbana 20L ao carrinho.
2. Acessar o carrinho.
3. Conferir os valores apresentados.

**Resultado esperado:**
- O subtotal deve ser R$ 200,00.
- O frete deve ser R$ 0,00.
- O benefício de frete grátis deve ser aplicado.
- O valor faltante para frete grátis deve ser R$ 0,00.
- O total deve ser R$ 200,00.

**Resultado obtido:**
- O subtotal apresentado foi de R$ 200,00.
- O benefício de frete grátis não foi aplicado.
- O frete continuou sendo cobrado mesmo com o subtotal exatamente no limite definido.

**Status:** FAIL

**Bug relacionado:** BUG-001

**Evidência:**
[Ver evidência CT-008](evidencias/ct-008-frete-gratis-limite-200.png)

---

## CT-009 — Cobrar frete imediatamente abaixo do limite de R$ 200,00

**Critério relacionado:** CA07  
**Tipo:** Funcional / Limite  
**Prioridade:** Alta

**Dados de teste:**
- Camiseta Essencial: R$ 59,90
- Calça Jeans Slim: R$ 139,90
- Subtotal esperado: R$ 199,80

**Passos:**
1. Adicionar 1 Camiseta Essencial ao carrinho.
2. Adicionar 1 Calça Jeans Slim ao carrinho.
3. Acessar o carrinho.
4. Conferir os valores apresentados.

**Resultado esperado:**
- O subtotal deve ser R$ 199,80.
- O frete deve ser R$ 19,90.
- O carrinho deve informar que faltam R$ 0,20 para obter frete grátis.
- O total deve ser R$ 219,70.

**Resultado obtido:**
- O subtotal apresentado foi de R$ 199,80.
- O frete apresentado foi de R$ 19,90.
- A mensagem `Faltam R$ 0,20 para o frete grátis.` foi exibida.
- O total apresentado foi de R$ 219,70.

**Status:** PASS

**Evidência:**
[Ver evidência CT-009](evidencias/ct-009-frete-abaixo-limite.png)

---

## CT-010 — Aplicar frete grátis para subtotal superior a R$ 200,00

**Critério relacionado:** CA06  
**Tipo:** Funcional / Positivo  
**Prioridade:** Alta

**Dados de teste:**
- Produto: Jaqueta Corta-Vento
- Preço: R$ 229,90

**Passos:**
1. Adicionar 1 Jaqueta Corta-Vento ao carrinho.
2. Acessar o carrinho.
3. Conferir os valores apresentados.

**Resultado esperado:**
- O subtotal deve ser R$ 229,90.
- O frete deve ser R$ 0,00.
- O frete grátis deve estar ativo.
- O valor faltante para frete grátis deve ser R$ 0,00.
- O total deve ser R$ 229,90.

**Resultado obtido:**
- O subtotal apresentado foi de R$ 229,90.
- O frete foi apresentado como R$ 0,00.
- O benefício de frete grátis foi aplicado corretamente.
- O total apresentado foi de R$ 229,90.

**Status:** PASS

**Evidência:**
[Ver evidência CT-010](evidencias/ct-010-frete-gratis-acima-200.png)

---

## CT-011 — Manter frete grátis quando o cupom reduz o total abaixo de R$ 200,00

**Critérios relacionados:** CA01, CA06 e CA08  
**Tipo:** Funcional / Regra de negócio  
**Prioridade:** Alta

**Dados de teste:**
- 1 Camiseta Essencial: R$ 59,90
- 5 Kits 3 Pares de Meias: R$ 149,50
- Subtotal: R$ 209,40
- Cupom: `BEMVINDO10`

**Passos:**
1. Adicionar os produtos ao carrinho.
2. Confirmar que o subtotal é superior a R$ 200,00 e o frete é grátis.
3. Aplicar o cupom `BEMVINDO10`.
4. Conferir os valores apresentados.

**Resultado esperado:**
- Subtotal: R$ 209,40.
- Desconto: R$ 20,94.
- Frete: R$ 0,00.
- O frete grátis deve permanecer ativo.
- Total: R$ 188,46.

**Resultado obtido:**
- O subtotal apresentado foi R$ 209,40.
- O desconto aplicado foi R$ 20,94.
- O frete permaneceu grátis.
- O total apresentado foi R$ 188,46.

**Status:** PASS

**Evidência:**
[Ver evidência CT-011](evidencias/ct-011-frete-gratis-com-cupom.png)

---

## CT-012 — Validar que o desconto do cupom não incide sobre o frete

**Critérios relacionados:** CA01, CA07 e CA09  
**Tipo:** Funcional / Regra de negócio  
**Prioridade:** Alta

**Dados de teste:**
- Produto: Mochila Urbana 20L
- Preço: R$ 100,00
- Cupom: `BEMVINDO10`

**Passos:**
1. Adicionar 1 Mochila Urbana 20L ao carrinho.
2. Acessar o carrinho.
3. Aplicar o cupom `BEMVINDO10`.
4. Conferir os valores apresentados.

**Resultado esperado:**
- O subtotal deve ser R$ 100,00.
- O desconto deve ser R$ 10,00.
- O frete deve permanecer integralmente em R$ 19,90.
- O total deve ser R$ 109,90.
- O desconto não deve ser aplicado sobre o valor do frete.

**Resultado obtido:**
- O subtotal apresentado foi de R$ 100,00.
- O desconto aplicado foi de R$ 10,00.
- O frete permaneceu em R$ 19,90.
- O total apresentado foi de R$ 109,90.
- O desconto não incidiu sobre o valor do frete.

**Status:** PASS

**Evidência:**
[Ver evidência CT-012](evidencias/ct-012-cupom-nao-desconta-frete.png)

---

# 3. Limite de quantidade

## CT-013 — Permitir no máximo 5 unidades por produto na interface

**Critério relacionado:** CA10  
**Tipo:** Funcional / Limite  
**Prioridade:** Alta

**Passos:**
1. Adicionar cada produto disponível ao carrinho.
2. Aumentar a quantidade de cada produto até 5 unidades.
3. Retornar à listagem de produtos.
4. Verificar o comportamento da interface.

**Resultado esperado:**
- Cada produto deve permitir no máximo 5 unidades.
- Ao atingir 5 unidades, a interface deve indicar que o limite foi atingido.
- Não deve ser possível adicionar uma sexta unidade do mesmo produto.

**Resultado obtido:**
- Todos os produtos permitiram até 5 unidades.
- A mensagem `Limite de 5 unidades atingido.` foi exibida para todos os produtos.
- A interface deixou de permitir novas adições após atingir o limite.

**Status:** PASS

**Evidência:**
[Ver evidência CT-013](evidencias/ct-013-limite-5-unidades.png)

---

## CT-014 — Impedir quantidade superior a 5 unidades pela interface

**Critério relacionado:** CA10  
**Tipo:** Funcional / Negativo / Limite  
**Prioridade:** Alta

**Pré-condições:**
-  Carrinho inicialmente vazio.

**Passos:**
1. Acessar a listagem de produtos.
2. Adicionar 5 unidades de cada produto ao carrinho.
3. Acessar o carrinho.
4. Tentar aumentar novamente a quantidade utilizando o botão `+`.
5. Verificar se as quantidades e os valores permanecem inalterados.

**Resultado esperado:**
- Nenhum produto deve ultrapassar 5 unidades.
- Os botões + devem ficar desabilitados ao atingir o limite.
- Os valores do carrinho não devem ser calculados considerando uma sexta unidade.

**Resultado obtido:**
- O produto permaneceu com quantidade igual a 5.
- Não foi possível adicionar uma sexta unidade.
- O botão `+` não permitiu ultrapassar o limite estabelecido.
- Os valores do carrinho permaneceram calculados considerando apenas 5 unidades.

**Status:** PASS

**Evidência:**
[Ver evidência CT-014](evidencias/ct-014-bloqueio-acima-5-unidades.mp4)

---

# 4. Arredondamento de valores

## CT-015 — Validar arredondamento monetário para duas casas decimais

**Critério relacionado:** CA11  
**Tipo:** Funcional / Cálculo  
**Prioridade:** Alta

**Dados de teste:**
- Produto: Camiseta Essencial
- Preço: R$ 59,90
- Cupom: `BEMVINDO10`

**Passos:**
1. Adicionar 1 Camiseta Essencial ao carrinho.
2. Acessar o carrinho.
3. Aplicar o cupom `BEMVINDO10`.
4. Conferir os valores apresentados.

**Resultado esperado:**
- O subtotal deve ser R$ 59,90.
- O desconto de 10% deve ser R$ 5,99.
- O frete deve ser R$ 19,90.
- O total deve ser R$ 73,81.
- Todos os valores monetários devem ser apresentados com duas casas decimais.

**Resultado obtido:**
- O subtotal apresentado foi de R$ 59,90.
- O desconto apresentado foi de R$ 5,99.
- O frete apresentado foi de R$ 19,90.
- O total apresentado foi de R$ 73,81.
- Todos os valores monetários foram exibidos com duas casas decimais.

**Status:** PASS

**Evidência:**
[Ver evidência CT-015](evidencias/ct-015-arredondamento-valores.png)

# 5. Testes de API

## API-001 — Listar produtos cadastrados

**Endpoint:** `GET /api/produtos`  
**Tipo:** API / Funcional / Positivo  
**Prioridade:** Média

**Passos:**
1. Enviar uma requisição `GET` para `/api/produtos`.
2. Conferir o status HTTP.
3. Conferir o corpo da resposta.

**Resultado esperado:**
- HTTP `200`.
- Resposta em formato JSON.
- Deve ser retornada a lista de produtos cadastrados.
- Os produtos devem possuir informações como `id`, `nome`, `descricao`, `categoria` e `preco`.

**Resultado obtido:**
- A API retornou HTTP `200`.
- A resposta foi retornada em formato JSON.
- Foram retornados os 8 produtos cadastrados.
- Os produtos apresentaram os campos `id`, `nome`, `descricao`, `categoria` e `preco`.
- Os dados retornados correspondem aos produtos documentados para o ambiente de teste.

**Status:** PASS

**Evidência:**
[Ver evidência API-001](evidencias/api/api-001-listar-produtos.png)

---

## API-002 — Consultar produto existente por ID

**Endpoint:** `GET /api/produtos/P001`  
**Tipo:** API / Funcional / Positivo  
**Prioridade:** Média

**Passos:**
1. Enviar uma requisição `GET` para `/api/produtos/P001`.
2. Conferir o status HTTP.
3. Conferir os dados retornados.

**Resultado esperado:**
- HTTP `200`.
- O produto retornado deve possuir ID `P001`.
- Os dados retornados devem corresponder à Camiseta Essencial.

**Resultado obtido:**
- A API retornou HTTP `200`.
- O produto retornado possui ID `P001`.
- Foram retornados os dados da Camiseta Essencial.
- Os campos `nome`, `descricao`, `categoria` e `preco` foram retornados corretamente.

**Status:** PASS

**Evidência:**
[Ver evidência API-002](evidencias/api/api-002-produto-por-id.png)

---

## API-003 — Consultar produto inexistente

**Endpoint:** `GET /api/produtos/XYZ123`  
**Tipo:** API / Funcional / Negativo  
**Prioridade:** Média

**Passos:**
1. Enviar uma requisição `GET` para um ID de produto inexistente.
2. Conferir o status HTTP.
3. Conferir o corpo da resposta.

**Resultado esperado:**
- HTTP `404`.
- Deve ser retornado o código `PRODUTO_NAO_ENCONTRADO`.

**Resultado obtido:**
- A API retornou HTTP `404`.
- O código `PRODUTO_NAO_ENCONTRADO` foi retornado.
- A mensagem informou que o produto `XYZ123` não foi encontrado.

**Status:** PASS

**Evidência:**
[Ver evidência API-003](evidencias/api/api-003-produto-inexistente.png)

---

## API-004 — Calcular carrinho com cupom válido

**Endpoint:** `POST /api/carrinho/calcular`  
**Tipo:** API / Funcional / Positivo  
**Prioridade:** Alta

**Body:**

```json
{
  "itens": [
    { "produtoId": "P005", "quantidade": 1 }
  ],
  "cupom": "BEMVINDO10"
}
```

**Passos:**
1. Enviar a requisição com um produto válido.
2. Informar o cupom `BEMVINDO10`.
3. Conferir o status HTTP.
4. Conferir os valores retornados.

**Resultado esperado:**
- HTTP `200`.
- `subtotal` = `100`.
- `desconto` = `10`.
- `frete` = `19.9`.
- `freteGratis` = `false`.
- `valorFaltanteFreteGratis` = `100`.
- `total` = `109.9`.
- `cupom.aplicado` = `true`.

**Resultado obtido:**
- A API retornou HTTP `200`.
- O `subtotal` retornado foi `100`.
- O `desconto` aplicado foi `10`.
- O `frete` retornado foi `19.9`.
- `freteGratis` retornou `false`.
- `valorFaltanteFreteGratis` retornou `100`.
- O `total` retornado foi `109.9`.
- O cupom `BEMVINDO10` foi aplicado com sucesso.
- `cupom.aplicado` retornou `true`.

**Status:** PASS

**Evidência:**
[Ver evidência API-004](evidencias/api/api-004-cupom-valido.png)

---

## API-005 — Aplicar frete grátis exatamente em R$ 200,00

**Endpoint:** `POST /api/carrinho/calcular`  
**Tipo:** API / Funcional / Limite  
**Prioridade:** Alta

**Body:**

```json
{
  "itens": [
    { "produtoId": "P005", "quantidade": 2 }    
  ]
}
```

**Passos:**
1. Enviar uma requisição com 2 unidades do produto `P005`, totalizando subtotal de R$ 200,00.
2. Conferir o status HTTP.
3. Conferir os valores retornados.

**Resultado esperado:**
- HTTP `200`.
- `subtotal` = `200`.
- `desconto` = `0`.
- `frete` = `0`.
- `freteGratis` = `true`.
- `valorFaltanteFreteGratis` = `0`.
- `total` = `200`.

**Resultado obtido:**
- A API retornou HTTP `200`.
- O `subtotal` retornado foi `200`.
- O `desconto` retornado foi `0`.
- O `frete` retornado foi `19.9`.
- `freteGratis` retornou `false`.
- `valorFaltanteFreteGratis` retornou `0`.
- O `total` retornado foi `219.9`.
- O frete grátis não foi aplicado mesmo com o subtotal exatamente em R$ 200,00.

**Status:** FAIL

**Bug relacionado:** BUG-001

**Evidência:**
[Ver evidência API-005](evidencias/api/api-005-frete-limite-200.png)

---

## API-006 — Manter frete grátis após aplicação de cupom

**Endpoint:** `POST /api/carrinho/calcular`  
**Tipo:** API / Regra de negócio  
**Prioridade:** Alta

**Body:**

```json
{
  "itens": [
    { "produtoId": "P001", "quantidade": 1 },
    { "produtoId": "P006", "quantidade": 5 }
  ],
  "cupom": "BEMVINDO10"
}
```

**Passos:**
1. Enviar uma requisição contendo produtos com subtotal superior a R$ 200,00.
2. Informar o cupom `BEMVINDO10`.
3. Conferir o status HTTP.
4. Conferir os valores retornados.

**Resultado esperado:**
- HTTP `200`.
- `subtotal` = `209.4`.
- `desconto` = `20.94`.
- `frete` = `0`.
- `freteGratis` = `true`.
- `valorFaltanteFreteGratis` = `0`.
- `total` = `188.46`.
- O frete deve permanecer grátis mesmo após o desconto reduzir o total final para menos de R$ 200,00.

**Resultado obtido:**
- A API retornou HTTP `200`.
- O `subtotal` retornado foi `209.4`.
- O `desconto` aplicado foi `20.94`.
- O `frete` retornado foi `0`.
- `freteGratis` retornou `true`.
- `valorFaltanteFreteGratis` retornou `0`.
- O `total` retornado foi `188.46`.
- O cupom `BEMVINDO10` foi aplicado com sucesso.
- O frete permaneceu grátis mesmo após o total final ficar abaixo de R$ 200,00.

**Status:** PASS

**Evidência:**
[Ver evidência API-006](evidencias/api/api-006-frete-gratis-com-cupom.png)

---

## API-007 — Rejeitar quantidade superior a 5 unidades

**Endpoint:** `POST /api/carrinho/calcular`  
**Tipo:** API / Negativo / Limite  
**Prioridade:** Alta

**Body:**

```json
{
  "itens": [
    { "produtoId": "P005", "quantidade": 6 }
  ]
}
```

**Passos:**
1. Enviar uma requisição contendo o produto `P005` com quantidade igual a 6.
2. Conferir o status HTTP.
3. Conferir o corpo da resposta.

**Resultado esperado:**
- HTTP `422`.
- Deve ser retornado o código `QUANTIDADE_MAXIMA_EXCEDIDA`.
- A API não deve calcular o carrinho utilizando quantidade superior a 5 unidades.

**Resultado obtido:**
- A API retornou HTTP `200`.
- A quantidade `6` foi aceita.
- O subtotal foi calculado utilizando as 6 unidades.
- O `subtotal` retornado foi `600`.
- O `total` retornado foi `600`.
- Nenhum erro `QUANTIDADE_MAXIMA_EXCEDIDA` foi retornado.

**Status:** FAIL

**Bug relacionado:** BUG-002

**Evidência:**
[Ver evidência API-007](evidencias/api/api-007-quantidade-acima-5.png)

---

## API-008 — Rejeitar quantidade zero

**Endpoint:** `POST /api/carrinho/calcular`  
**Tipo:** API / Negativo  
**Prioridade:** Alta

**Body:**

```json
{
  "itens": [
    { "produtoId": "P005", "quantidade": 0 }
  ]
}
```

**Passos:**
1. Enviar uma requisição contendo o produto `P005` com quantidade igual a 0.
2. Conferir o status HTTP.
3. Conferir o código e a mensagem de erro retornados.

**Resultado esperado:**
- HTTP `422`.
- Deve ser retornado o código `QUANTIDADE_INVALIDA`.

**Resultado obtido:**
- A API retornou HTTP `422`.
- O código `QUANTIDADE_INVALIDA` foi retornado.
- A mensagem informou que a quantidade deve ser um número inteiro maior ou igual a 1.
- O campo indicado no erro foi `itens[0].quantidade`.

**Status:** PASS

**Evidência:**
[Ver evidência API-008](evidencias/api/api-008-quantidade-zero.png)

---

## API-009 — Rejeitar lista de itens vazia

**Endpoint:** `POST /api/carrinho/calcular`  
**Tipo:** API / Negativo  
**Prioridade:** Alta

**Body:**

```json
{
  "itens": []
}
```

**Passos:**
1. Enviar uma requisição com a lista de itens vazia.
2. Conferir o status HTTP.
3. Conferir o código e a mensagem de erro retornados.

**Resultado esperado:**
- HTTP `422`.
- Deve ser retornado o código `ITENS_OBRIGATORIOS`.

**Resultado obtido:**
- A API retornou HTTP `422`.
- O código `ITENS_OBRIGATORIOS` foi retornado.
- A mensagem `Informe ao menos um item.` foi exibida.
- O campo indicado no erro foi `itens`.

**Status:** PASS

**Evidência:**
[Ver evidência API-009](evidencias/api/api-009-lista-vazia.png)

---

## API-010 — Rejeitar produto duplicado na lista

**Endpoint:** `POST /api/carrinho/calcular`  
**Tipo:** API / Negativo  
**Prioridade:** Média

**Body:**

```json
{
  "itens": [
    { "produtoId": "P005", "quantidade": 1 },
    { "produtoId": "P005", "quantidade": 2 }
  ]
}
```

**Passos:**
1. Enviar uma requisição contendo o mesmo produto mais de uma vez na lista de itens.
2. Conferir o status HTTP.
3. Conferir o código e a mensagem de erro retornados.

**Resultado esperado:**
- HTTP `422`.
- Deve ser retornado o código `ITEM_DUPLICADO`.
- A API deve impedir que o mesmo produto apareça mais de uma vez na lista.

**Resultado obtido:**
- A API retornou HTTP `422`.
- O código `ITEM_DUPLICADO` foi retornado.
- A mensagem informou que o produto `P005` aparece mais de uma vez.
- O campo indicado no erro foi `itens[1].produtoId`.

**Status:** PASS

**Evidência:**
[Ver evidência API-010](evidencias/api/api-010-produto-duplicado.png)

---

## API-011 — Calcular carrinho com cupom inválido

**Endpoint:** `POST /api/carrinho/calcular`  
**Tipo:** API / Negativo  
**Prioridade:** Alta

**Body:**

```json
{
  "itens": [
    { "produtoId": "P005", "quantidade": 1 }
  ],
  "cupom": "TESTE123"
}
```

**Passos:**
1. Enviar uma requisição contendo um produto válido.
2. Informar o cupom inexistente `TESTE123`.
3. Conferir o status HTTP.
4. Conferir os valores e informações do cupom retornados.

**Resultado esperado:**
- HTTP `200`.
- Nenhum desconto deve ser aplicado.
- O cupom deve constar como não aplicado.
- O motivo deve ser informado em `cupom.mensagem`.

**Resultado obtido:**
- A API retornou HTTP `200`.
- O `subtotal` retornado foi `100`.
- O `desconto` retornado foi `0`.
- O `frete` retornado foi `19.9`.
- `freteGratis` retornou `false`.
- O `total` retornado foi `119.9`.
- O cupom `TESTE123` retornou com `aplicado: false`.
- A mensagem retornada foi `Cupom inválido.`

**Status:** PASS

**Evidência:**
[Ver evidência API-011](evidencias/api/api-011-cupom-invalido.png)

---

## API-012 — Calcular carrinho com cupom expirado

**Endpoint:** `POST /api/carrinho/calcular`  
**Tipo:** API / Negativo  
**Prioridade:** Alta

**Body:**

```json
{
  "itens": [
    { "produtoId": "P005", "quantidade": 1 }
  ],
  "cupom": "VERAO2026"
}
```

**Passos:**
1. Enviar uma requisição contendo um produto válido.
2. Informar o cupom expirado `VERAO2026`.
3. Conferir o status HTTP.
4. Conferir os valores e informações do cupom retornados.

**Resultado esperado:**
- HTTP `200`.
- Nenhum desconto deve ser aplicado.
- O cupom deve constar como não aplicado.
- A resposta deve informar que o cupom está expirado.

**Resultado obtido:**
- A API retornou HTTP `200`.
- O `subtotal` retornado foi `100`.
- O `desconto` retornado foi `0`.
- O `frete` retornado foi `19.9`.
- `freteGratis` retornou `false`.
- O `total` retornado foi `119.9`.
- O cupom `VERAO2026` retornou com `aplicado: false`.
- A mensagem retornada foi `Cupom expirado.`

**Status:** PASS

**Evidência:**
[Ver evidência API-012](evidencias/api/api-012-cupom-expirado.png)

---

## API-013 — Criar pedido válido

**Endpoint:** `POST /api/pedidos`  
**Tipo:** API / Funcional / Positivo  
**Prioridade:** Alta

**Body:**

```json
{
  "cliente": {
    "nome": "Maria Silva",
    "email": "maria@exemplo.com",
    "cep": "01310-100"
  },
  "itens": [
    { "produtoId": "P005", "quantidade": 1 }
  ],
  "cupom": "BEMVINDO10"
}
```

**Passos:**
1. Enviar uma requisição de criação de pedido com dados válidos.
2. Conferir o status HTTP.
3. Conferir o número do pedido retornado.
4. Conferir os dados do cliente e os itens.
5. Conferir os valores calculados e a aplicação do cupom.

**Resultado esperado:**
- HTTP `201`.
- Deve ser retornado um número de pedido no formato `VZ-000000`.
- Deve ser retornado o resumo dos valores do pedido.
- O cupom `BEMVINDO10` deve estar aplicado.
- Os dados do cliente e dos itens devem ser retornados corretamente.

**Resultado obtido:**
- A API retornou HTTP `201 Created`.
- Foi retornado um número de pedido no formato esperado.
- Os dados do cliente foram retornados corretamente.
- O produto `P005` foi retornado com quantidade `1`.
- O `subtotal` retornado foi `100`.
- O `desconto` aplicado foi `10`.
- O `frete` retornado foi `19.9`.
- `freteGratis` retornou `false`.
- `valorFaltanteFreteGratis` retornou `100`.
- O `total` retornado foi `109.9`.
- O cupom `BEMVINDO10` retornou com `aplicado: true`.

**Status:** PASS

**Evidência:**
[Ver evidência API-013](evidencias/api/api-013-pedido-valido.png)

---

## API-014 — Rejeitar criação de pedido com cupom inválido

**Endpoint:** `POST /api/pedidos`  
**Tipo:** API / Negativo  
**Prioridade:** Alta

**Body:**

```json
{
  "cliente": {
    "nome": "Maria Silva",
    "email": "maria@exemplo.com",
    "cep": "01310-100"
  },
  "itens": [
    { "produtoId": "P005", "quantidade": 1 }
  ],
  "cupom": "TESTE123"
}
```

**Passos:**
1. Enviar uma requisição de criação de pedido utilizando um cupom inexistente.
2. Conferir o status HTTP.
3. Conferir o código e a mensagem de erro retornados.

**Resultado esperado:**
- HTTP `422`.
- Deve ser retornado o código `CUPOM_INVALIDO`.
- O pedido não deve ser criado.

**Resultado obtido:**
- A API retornou HTTP `422`.
- O código `CUPOM_INVALIDO` foi retornado.
- A mensagem retornada foi `Cupom inválido.`.
- O campo indicado no erro foi `cupom`.
- O pedido não foi criado.

**Status:** PASS

**Evidência:**
[Ver evidência API-014](evidencias/api/api-014-pedido-cupom-invalido.png)

---

## API-015 — Rejeitar criação de pedido com cupom expirado

**Endpoint:** `POST /api/pedidos`  
**Tipo:** API / Negativo  
**Prioridade:** Alta

**Body:**

```json
{
  "cliente": {
    "nome": "Maria Silva",
    "email": "maria@exemplo.com",
    "cep": "01310-100"
  },
  "itens": [
    { "produtoId": "P005", "quantidade": 1 }
  ],
  "cupom": "VERAO2026"
}
```

**Passos:**
1. Enviar uma requisição de criação de pedido utilizando o cupom expirado `VERAO2026`.
2. Conferir o status HTTP.
3. Conferir o código e a mensagem de erro retornados.

**Resultado esperado:**
- HTTP `422`.
- Deve ser retornado o código `CUPOM_EXPIRADO`.
- O pedido não deve ser criado.

**Resultado obtido:**
- A API retornou HTTP `422`.
- O código `CUPOM_EXPIRADO` foi retornado.
- A mensagem retornada foi `Cupom expirado.`.
- O campo indicado no erro foi `cupom`.
- O pedido não foi criado.

**Status:** PASS

**Evidência:**
[Ver evidência API-015](evidencias/api/api-015-pedido-cupom-expirado.png)