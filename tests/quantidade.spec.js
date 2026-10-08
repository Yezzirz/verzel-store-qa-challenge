import { test, expect } from '@playwright/test';
import { StorePage } from './pages/store.page.js';

test.describe('Limite de quantidade', () => {

  test('CT-013 - Permitir no máximo 5 unidades por produto', async ({ page }) => {
    const store = new StorePage(page);

    await test.step('Acessar a Verzel Store', async () => {
      await store.acessarLoja();
    });

    const produto = store.produto('Mochila Urbana 20L');

    const botaoAdicionar = produto.getByRole('button', {
      name: 'Adicionar ao carrinho',
      exact: true,
    });

    await test.step('Adicionar 5 unidades do produto', async () => {
      await expect(botaoAdicionar).toBeVisible();

      for (let i = 0; i < 5; i++) {
        await botaoAdicionar.click();
      }
    });

    await test.step('Validar limite máximo de 5 unidades', async () => {
      await expect(
        produto.getByText('Limite de 5 unidades atingido.', {
          exact: true,
        })
      ).toBeVisible();

      await expect(botaoAdicionar).toBeDisabled();
    });
  });

});