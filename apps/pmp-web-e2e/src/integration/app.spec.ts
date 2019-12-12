import { getRoot } from '../support/app.po';

describe('pmp', () => {
  beforeEach(() => cy.visit('/'));

  it('should have root component', () => {
    expect(getRoot()).to.exist;
  });
});
