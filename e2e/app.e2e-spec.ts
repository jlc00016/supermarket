import { SupermarketPage } from './app.po';

describe('supermarket App', () => {
  let page: SupermarketPage;

  beforeEach(() => {
    page = new SupermarketPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
