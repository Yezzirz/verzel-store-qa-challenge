import { test, expect } from '@playwright/test';
import { StorePage } from './pages/store.page.js';

test.describe('Cupom de desconto', () => {

  test('CT-001 - Aplicar cupom BEMVINDO10 com sucesso', async ({ page }) => {
    const store = new StorePage(page);

    await test.step('Acessar a Verzel Store', async () => {
      await store.acessarLoja();
    });

    await test.step('Adicionar Mochila Urbana 20L ao carrinho', async () => {
      await store.adicionarProduto('Mochila Urbana 20L');
    });

    await test.step('Acessar o carrinho', async () => {
      await store.acessarCarrinho();
    });

    await test.step('Aplicar o cupom BEMVINDO10', async () => {
      await store.aplicarCupom('BEMVINDO10');
    });

    await test.step('Validar aplicação do cupom', async () => {
      await expect(
        page.getByText('Cupom BEMVINDO10 aplicado.', { exact: true })
      ).toBeVisible();
    });

    await test.step('Validar valores do pedido', async () => {
      await store.validarSubtotal('R$ 100,00');
      await store.validarDesconto('- R$ 10,00');
      await store.validarFrete('R$ 19,90');
      await store.validarTotal('R$ 109,90');
    });
  });

});