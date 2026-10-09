import { expect } from '@playwright/test';

export class StorePage {
  constructor(page) {
    this.page = page;

    // Interações do usuário
    this.cartAccess = page
      .getByRole('link', { name: /carrinho/i })
      .or(page.locator('a.link-carrinho[href="/carrinho"]'))
      .first();

    this.couponInput = page.getByLabel('Cupom de desconto');

    this.applyCouponButton = page.getByRole('button', {
      name: 'Aplicar cupom',
    });

    this.removeCouponButton = page.getByRole('button', {
      name: 'Remover cupom',
    });

    // Valores do resumo - atributos específicos do DOM
    this.subtotal = page.locator('[data-valor="subtotal"]');
    this.desconto = page.locator('[data-valor="desconto"]');
    this.frete = page.locator('[data-valor="frete"]');
    this.total = page.locator('[data-valor="total"]');
  }

  async acessarLoja() {
    await this.page.goto('/');
    await expect(this.page).toHaveURL(/verzel-store/);
  }

  produto(nome) {
    return this.page
      .getByRole('heading', { name: nome, exact: true })
      .locator('..');
  }

  async adicionarProduto(nome, quantidade = 1) {
    const card = this.produto(nome);

    await expect(card).toBeVisible();

    const botaoAdicionar = card.getByRole('button', {
      name: 'Adicionar ao carrinho',
    });

    await expect(botaoAdicionar).toBeVisible();

    for (let i = 0; i < quantidade; i++) {
      await botaoAdicionar.click();
    }
  }

  async acessarCarrinho() {
    await expect(this.cartAccess).toBeVisible();
    await this.cartAccess.click();

    await expect(this.page).toHaveURL(/\/carrinho/);
  }

  async aplicarCupom(codigo) {
    await expect(this.couponInput).toBeVisible();
    await this.couponInput.fill(codigo);

    await expect(this.applyCouponButton).toBeEnabled();
    await this.applyCouponButton.click();
  }

  async removerCupom() {
    await expect(this.removeCouponButton).toBeVisible();
    await this.removeCouponButton.click();
  }

  async validarSubtotal(valor) {
    await expect(this.subtotal).toHaveText(valor);
  }

  async validarDesconto(valor) {
    await expect(this.desconto).toHaveText(valor);
  }

  async validarFrete(valor) {
    await expect(this.frete).toHaveText(valor);
  }

  async validarFreteGratis() {
  await expect(this.frete).toHaveText('Grátis');
  }
  async validarTotal(valor) {
    await expect(this.total).toHaveText(valor);
  }
}