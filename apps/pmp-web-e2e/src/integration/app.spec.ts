import { getGreeting } from '../support/app.po';

describe('pmp', () => {
  beforeEach(() => cy.visit('/'));

  it('should display repository users with table', () => {
    getGreeting().contains('<pimp-my-pr-table>');
  });
});
