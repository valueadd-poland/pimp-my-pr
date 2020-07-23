Cypress.Commands.add('auth', () => {
  cy.server();
  cy.route('POST', '/api/auth/access-token', {
    data: { token: '123' },
    errors: {}
  });
  let fixtures;
  cy.fixture('fixtures').then(fx => {
    fixtures = fx;
  });
  cy.visit('/');
  cy.get('mat-card-title').should('contain', 'Login with an existing system');
  cy.request({
    url: `https://github.com/logout`,
    followRedirect: false
  }).then(() => {
    cy.clearCookies();
    cy.request({
      url: `https://github.com/login/oauth/authorize?client_id=${fixtures.githubClientId}&scope=read:user%20repo`,
      followRedirect: false
    }).then(resp => {
      expect(resp.status).to.eq(302);
      if (!resp.redirectedToUrl.match(/\/login\?client_id=/)) {
        cy.visit(resp.redirectedToUrl);
      } else {
        expect(resp.redirectedToUrl).to.match(/\/login\?client_id=/);
        cy.request({
          url: resp.redirectedToUrl,
          followRedirect: false
        })
          .its('body')
          .then(body => {
            const html = Cypress.$(body);
            const authenticity_token = html.find('input[name=authenticity_token]').val();
            const action = html.find('form[method=post]').attr('action');
            expect(action).to.eq('/session');
            expect(authenticity_token).to.match(/\w{15,}/);
            return cy.request({
              method: 'POST',
              url: 'https://github.com/session',
              form: true,
              followRedirect: false,
              body: {
                authenticity_token: authenticity_token,
                login: fixtures.githubLogin,
                password: fixtures.githubPassword,
                commit: 'Sign In',
                utf8: '✓'
              }
            });
          })
          .then(res => {
            expect(res.status).to.eq(302);
            return cy.request({
              url: `https://github.com/login/oauth/authorize?client_id=${fixtures.githubClientId}&scope=read%3Auser+repo`,
              followRedirect: false
            });
          })
          .then(res => {
            expect(res.status).to.eq(302);
            cy.visit(res.redirectedToUrl);
          });
      }
    });
  });
});
