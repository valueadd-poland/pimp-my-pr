import { ApiCallFixture } from '../resources/interfaces/api-call-fixture.interface';
import { FixturesItem } from '../resources/interfaces/fixtures-item.interface';

export const getFixtures = (fixtures: ApiCallFixture[]): PromiseLike<FixturesItem[]> => {
  const fixturesData: FixturesItem[] = [];
  return Cypress.Promise.all(
    fixtures.map(fixture =>
      cy.fixture(fixture.file + '.response').then(fixtureData => {
        fixturesData.push({
          ...fixture,
          data: fixtureData
        });
      })
    )
  ).then(() => {
    return fixturesData;
  });
};
