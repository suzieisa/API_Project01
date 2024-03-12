import { postRequestBody, putRequestBody } from '../../fixtures/testData.json';

describe('API Project01', () => {

    let user;

    it('Create a New User', () => {
        cy.request({
            method:'POST',
            url: Cypress.env('baseUrl'),
            body: postRequestBody,
        }).then((response) => {
            user = response.body.id
            expect(response.status).to.equal(200);
            expect(response.duration).to.be.below(200)
            cy.validateResponse(response, postRequestBody)
        })
    })

    it('Retrieve a Specific User-Created', () => {
        cy.request({
          method: 'GET',
          url: `${Cypress.env('baseUrl')}/${user}`,
        }).then((response) => {
          expect(response.status).to.equal(200);
          expect(response.duration).to.be.below(200)
          cy.validateResponse(response, postRequestBody)
        });
      });

      it('Update an Exisiting User', () => {
        cy.request({
            method: 'PUT',
            url: `${Cypress.env('baseUrl')}/${user}`,
            body: putRequestBody,
          }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.duration).to.be.below(200)
            cy.validateResponse(response, putRequestBody);
          })
      });

      it('Retrieve a specific user created to confirm the update', () => {
        cy.request({
            method: 'GET',
            url: `${Cypress.env('baseUrl')}/${user}`,
          }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.duration).to.be.below(200)
            cy.validateResponse(response, putRequestBody);
          });
      });
        
      it('Delete the user that you created', () => {
        cy.request({
        method: 'DELETE',
        url: `${Cypress.env('baseUrl')}/${user}`,
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.duration).to.be.below(200)
        expect(response.body.id).to.equal(undefined)
      });
  });
});

    







