describe('service is available', function () {
    beforeEach(() => {
        cy.viewport(1920, 1000);
        cy.intercept("GET", "api/auth/user", {fixture: "user.json"});
        cy.intercept("POST", "api/orders", {fixture: "order.json"}).as("postOrder");

        cy.setCookie('accessToken', 'test-accessToken')
        cy.setCookie('token', 'test-refreshToken')
    });

    // afterEach(function () {
    //     cy.clearLocalStorage();
    //     cy.clearCookies();
    // });

    it('should be available on localhost:3000', function () {
        cy.visit('http://localhost:3000');
    });

    it('drag-and-drop', function () {
        cy.get('.link').contains("Флюоресцентная булка R2-D3").trigger('dragstart');
        cy.get('.constructor_test').trigger('drop');
        cy.get('.link').contains("Плоды Фалленианского дерева").trigger('dragstart');
        cy.get('.constructor_test').trigger('drop');
    });

    it('order-modal', function () {
        cy.get('Button').contains("Оформить заказ").click();
        cy.get('Button').contains("Оформить заказ").click();
        cy.get('.order_num').contains("123");
        cy.get('.modal_close').click();
    });

    it('open-close ingredient-modal', function () {
        cy.get('.link').contains('Краторная булка N-200i').click();
        cy.get('.title_modal').contains("Детали ингредиента");
        cy.get('.modal_close').click()
    });

});