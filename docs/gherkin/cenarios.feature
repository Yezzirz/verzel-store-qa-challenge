# language: pt

Funcionalidade: Cupom de desconto e frete grátis

  Como cliente da Verzel Store
  Quero aplicar cupons de desconto e obter frete grátis quando elegível
  Para reduzir o valor das minhas compras

  Cenário: Aplicar cupom BEMVINDO10 com sucesso
    Dado que o carrinho contém 1 Mochila Urbana 20L no valor de R$ 100,00
    E nenhum cupom está aplicado
    Quando aplico o cupom "BEMVINDO10"
    Então o subtotal deve permanecer em R$ 100,00
    E o desconto deve ser de R$ 10,00
    E o frete deve ser de R$ 19,90
    E o total deve ser de R$ 109,90

  Cenário: Rejeitar cupom inexistente
    Dado que existe um produto no carrinho
    E nenhum cupom está aplicado
    Quando aplico o cupom "TESTE123"
    Então deve ser exibida a mensagem "Cupom inválido."
    E nenhum desconto deve ser aplicado

  Cenário: Aplicar frete grátis exatamente no limite de R$ 200,00
    Dado que o subtotal do carrinho é R$ 200,00
    Quando acesso o resumo do pedido
    Então o frete deve ser grátis
    E o total deve ser R$ 200,00

  Cenário: Manter frete grátis após aplicação de cupom
    Dado que o carrinho possui subtotal de R$ 209,40
    E o frete grátis está ativo
    Quando aplico o cupom "BEMVINDO10"
    Então o desconto deve ser de R$ 20,94
    E o frete deve permanecer grátis
    E o total deve ser R$ 188,46

  Cenário: Impedir quantidade superior a 5 unidades
    Dado que um produto possui 5 unidades no carrinho
    Quando tento adicionar uma sexta unidade
    Então a quantidade deve permanecer em 5
    E a interface deve impedir uma nova adição