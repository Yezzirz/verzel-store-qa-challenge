import { test, expect } from '@playwright/test';
import { StorePage } from './pages/store.page.js';

test.describe('Frete grátis', () => {

  test('CT-011 - Manter frete grátis quando o cupom reduz o total abaixo de R$ 200,00', async ({ page }) => {
    const store = new StorePage(page);

    await test.step('Acessar a Verzel Store', async () => {
      await store.acessarLoja();
    });

    await test.step('Adicionar produtos ao carrinho', async () => {
      await store.adicionarProduto('Camiseta Essencial', 1);
      await store.adicionarProduto('Kit 3 Pares de Meias', 5);
    });

    await test.step('Acessar o carrinho', async () => {
      await store.acessarCarrinho();
    });

    await test.step('Validar frete grátis antes da aplicação do cupom', async () => {
      await store.validarSubtotal('R$ 209,40');
      await store.validarFreteGratis();
    });

    await test.step('Aplicar o cupom BEMVINDO10', async () => {
      await store.aplicarCupom('BEMVINDO10');

      await expect(
        page.getByText('Cupom BEMVINDO10 aplicado.', { exact: true })
      ).toBeVisible();
    });

    await test.step('Validar que o frete permanece grátis após o desconto', async () => {
      await store.validarSubtotal('R$ 209,40');
      await store.validarDesconto('- R$ 20,94');
      await store.validarFreteGratis();
      await store.validarTotal('R$ 188,46');
    });
  });

});