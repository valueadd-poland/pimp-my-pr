import { getFixtures } from '../support/util';
import { ApiCallFixture } from '../resources/interfaces/api-call-fixture.interface';
import { RequestType } from '../resources/enums/request-type.enum';

describe('repositories', () => {
  const fixtures: ApiCallFixture[] = [
    { name: 'userInfo', url: 'user-info', file: 'user-info' },
    {
      name: 'authAccessToken',
      url: 'auth/access-token',
      file: 'auth-access-token',
      method: RequestType.POST
    },
    { name: 'statisticsReviewers', url: 'statistics/reviewers', file: 'statistics-reviewers' },
    { name: 'statisticsRepository', url: 'statistics/repository', file: 'statistics-repository' },
    {
      name: 'statisticsRepositoryWildcard',
      url: 'statistics/repository/**',
      file: 'statistics-repository-wildcard'
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

  it('repositories should exist in sidenav', () => {
    cy.visit('/login?platform=github&code=1234');
    cy.wait('@authAccessToken').then(xhr => {
      cy.url().should('include', '/reviewer');
      cy.get('[data-test="sidebar__repositories-item"]')
        .should('have.attr', 'href')
        .and('include', 'repositories');
      cy.get('[data-test="sidebar__repositories-item"]').click();
    });
  });

  it('repositories table should contain one row', () => {
    cy.get('[data-test="statistics-overview-table"] > mat-row')
      .its('length')
      .should('eq', 1);
  });

  it('repositories table row should display correct data', () => {
    cy.get('[data-test="statistics-overview-table"] > mat-row')
      .first()
      .within(() => {
        cy.get('[data-test="avatar-column__image"]').should(
          'have.attr',
          'src',
          'https://avatars3.githubusercontent.com/u/139426?v=4'
        );
        cy.get('[data-test="statistics-overview-table__name-col-cell"]').should(
          'contain',
          'angular'
        );
        cy.get('[data-test="statistics-overview-table__pending-pr-col-cell"]').should(
          'contain',
          '30'
        );
        cy.get('[data-test="statistics-overview-table__sum-of-hours-col-cell"]').should(
          'contain',
          '1 week'
        );
        cy.get('[data-test="statistics-overview-table__lines-of-code-col-cell"]').should(
          'contain',
          '11356'
        );
        cy.get('[data-test="statistics-overview-table__longest-pr-col-cell"]').should(
          'contain',
          '5033'
        );
        cy.get('[data-test="link-column__icon"]').should('contain', 'launch');
      });
  });

  it('redirect to details should work', () => {
    console.log('d');
    cy.get('[data-test="link-column__icon"]').click();
    cy.location('pathname').should('eq', '/repositories/123');
  });
});
