import { getFixtures } from '../support/util';
import { ApiCallFixture } from '../resources/interfaces/api-call-fixture.interface';
import { RequestType } from '../resources/enums/request-type.enum';

describe('repository-settings', () => {
  const fixtures: ApiCallFixture[] = [
    { name: 'userInfo', url: 'user-info', file: 'user-info' },
    {
      name: 'authAccessToken',
      url: 'auth/access-token',
      file: 'auth-access-token',
      method: RequestType.POST
    },
    { name: 'statisticsReviewers', url: 'statistics/reviewers', file: 'statistics-reviewers' },
    { name: 'repository', url: 'repository', file: 'repository' },
    {
      name: 'repositoryWildcardPut',
      url: 'repository/**',
      file: 'repository-wildcard',
      method: RequestType.PUT
    },
    {
      name: 'repositoryWildcardDelete',
      url: 'repository/**',
      file: 'repository-wildcard',
      method: RequestType.DELETE
    },
    {
      name: 'repositoryPost',
      url: 'repository',
      file: 'repository-created',
      method: RequestType.POST
    }
  ];

  beforeEach(() => {
    cy.server();

    getFixtures(fixtures).then(response => {
      response.forEach(fixture => {
        cy.route(fixture.method || 'GET', 'api/' + fixture.url, fixture.data).as(fixture.name);
      });
    });
  });

  it('repository settings should exist in sidenav', () => {
    cy.visit('/login?platform=github&code=1234');
    cy.wait('@authAccessToken').then(() => {
      cy.url().should('include', '/reviewer');
      cy.get('[data-test="sidebar__repository-settings-item"]')
        .should('have.attr', 'href')
        .and('include', 'repository-settings');
      cy.get('[data-test="sidebar__repository-settings-item"]').click();
    });
  });

  it('should be able to add repositories', () => {
    cy.get('[data-test="repository-settings__table-action"]')
      .should('be.visible')
      .click();
    cy.get('[data-test="repository-dialog"]').should('be.visible');
    cy.get('[data-test="repository-dialog__submit-button"]').should('be.disabled');

    cy.get('pmp-add-repository-dialog').within(() => {
      cy.get('[data-test="repository-dialog__repository-url-input"]')
        .should('exist')
        .type('https://github.com/angular/angular');
      cy.get('[data-test="repository-dialog__max-lines-input"]')
        .should('exist')
        .type('150');
      cy.get('[data-test="repository-dialog__max-waiting-input"]')
        .should('exist')
        .type('24');
      cy.get('[data-test="repository-dialog__submit-button"]')
        .should('not.be.disabled')
        .click();
    });

    cy.get('pmp-add-repository-dialog').should('not.exist');

    const snackbar = cy.get('snack-bar-container');
    snackbar.should('be.visible');
    cy.wait(2000);
    snackbar.should('not.be.visible');

    cy.url().should('include', '/repositories/1');
  });

  it('should be able to modify repositories', () => {
    cy.visit('/login?platform=github&code=1234');
    cy.wait('@authAccessToken').then(() => {
      cy.get('[data-test="sidebar__repository-settings-item"]').click();
    });
    cy.get('[data-test="repo-settings-table__edit-button"]').click();
    cy.get('[data-test="repository-dialog__submit-button"]').should('be.disabled');

    cy.get('[data-test="repository-dialog__max-lines-input"]')
      .should('exist')
      .invoke('val')
      .then(value => {
        expect(value).to.eq('10');
      });

    cy.get('[data-test="repository-dialog__max-waiting-input"]')
      .should('exist')
      .invoke('val')
      .then(value => {
        expect(value).to.eq('3');
      });

    cy.get('[data-test="repository-dialog__max-lines-input"]').type('{home}1');
    cy.get('[data-test="repository-dialog__submit-button"]')
      .should('not.be.disabled')
      .click();

    const snackbar = cy.get('snack-bar-container');
    snackbar.should('be.visible');
    cy.wait(2000);
    snackbar.should('not.be.visible');
  });

  it('should be able to remove repositories', () => {
    cy.get('[data-test="repo-settings-table__delete-button"]').click();
    cy.get('[data-test="generic-dialog__yes-opt"]').click();
  });
});
