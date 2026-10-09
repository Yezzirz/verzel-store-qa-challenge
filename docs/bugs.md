# Relatório de Bugs — Verzel Store

## BUG-001 — Frete grátis não é aplicado com subtotal exatamente em R$ 200,00

**Critério relacionado:** CA06  
**Casos de teste relacionados:** CT-008 e API-005  

**Severidade:** Média  
**Prioridade:** Alta  

**Ambiente:**
- Aplicação: Verzel Store
- Plataforma: Web
- Navegador: Microsoft Edge
- Sistema Operacional: Windows 10
- API: `POST /api/carrinho/calcular`

**Pré-condições:**
- Carrinho sem cupom aplicado.
- Produto disponível para adição ao carrinho.

**Dados de teste:**
- Produto: Mochila Urbana 20L
- Preço unitário: R$ 100,00
- Quantidade: 2
- Subtotal: R$ 200,00

**Passos para reproduzir pela interface:**
1. Acessar a Verzel Store.
2. Adicionar 2 unidades da Mochila Urbana 20L ao carrinho.
3. Acessar o carrinho.
4. Conferir o resumo do pedido.

**Resultado esperado:**
- O subtotal deve ser R$ 200,00.
- O frete deve ser R$ 0,00.
- O benefício de frete grátis deve ser aplicado.
- O valor faltante para frete grátis deve ser R$ 0,00.
- O total deve ser R$ 200,00.

**Resultado obtido:**
- O subtotal apresentado foi de R$ 200,00.
- O benefício de frete grátis não foi aplicado.
- O frete de R$ 19,90 continuou sendo cobrado.
- O total apresentado foi de R$ 219,90.

### Validação adicional via API

O problema também foi reproduzido diretamente no endpoint:

`POST /api/carrinho/calcular`

Com subtotal exatamente igual a R$ 200,00, a API retornou:

- `subtotal`: `200`
- `frete`: `19.9`
- `freteGratis`: `false`
- `valorFaltanteFreteGratis`: `0`
- `total`: `219.9`

O comportamento incorreto, portanto, também está presente na regra de cálculo retornada pela API e não apenas na interface.

**Impacto:**
O cliente que atingir exatamente R$ 200,00 em produtos não recebe o benefício de frete grátis previsto no critério de aceite e acaba sendo cobrado indevidamente pelo frete.

**Status:** Aberto

**Evidências:**
[Ver evidência CT-008](evidencias/ct-008-frete-gratis-limite-200.png)
- [Ver evidência API-005](evidencias/api/api-005-frete-limite-200.png)

---

## BUG-002 — API permite quantidade superior ao limite máximo de 5 unidades

**Critério relacionado:** CA10  
**Caso de teste relacionado:** API-007  

**Severidade:** Média  
**Prioridade:** Alta  

**Endpoint:** `POST /api/carrinho/calcular`

**Pré-condições:**
- Produto `P005` disponível no ambiente de teste.

**Body utilizado:**

```json
{
  "itens": [
    { "produtoId": "P005", "quantidade": 6 }
  ]
}
```

**Passos para reproduzir:**
1. Enviar uma requisição `POST` para `/api/carrinho/calcular`.
2. Informar o produto `P005` com quantidade igual a 6.
3. Enviar a requisição.
4. Conferir o status HTTP e o corpo retornado.

**Resultado esperado:**
- A API deve rejeitar quantidades superiores a 5 unidades.
- Deve retornar HTTP `422`.
- Deve retornar o código `QUANTIDADE_MAXIMA_EXCEDIDA`.
- O carrinho não deve ser calculado utilizando quantidade superior ao limite permitido.

**Resultado obtido:**
- A API retornou HTTP `200`.
- A quantidade `6` foi aceita.
- O carrinho foi calculado utilizando as 6 unidades.
- O subtotal retornado foi `600`.
- O total retornado foi `600`.
- Nenhum erro `QUANTIDADE_MAXIMA_EXCEDIDA` foi retornado.

**Impacto:**
A API permite contornar a regra de negócio que limita cada produto a no máximo 5 unidades por pedido. Embora a interface impeça quantidades superiores a 5, uma chamada direta à API permite processar valores acima do limite estabelecido.

**Status:** Aberto

**Evidência:**
[Ver evidência API-007](evidencias/api/api-007-quantidade-acima-5.png)