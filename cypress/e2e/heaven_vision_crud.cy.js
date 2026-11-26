describe('Pruebas Automatizadas Heaven Vision - CRUD', () => {

  const baseUrl = 'http://127.0.0.1:5500'; 

  // ==========================================
  // BLOQUE DE AUTENTICACIÓN
  // ==========================================
  beforeEach(() => {
    cy.visit(`${baseUrl}/index.html`);
    cy.get('#txt_email').type('admin@heavenvision.com'); 
    cy.get('#txt_password').type('123456789');  
    cy.get('#btn_submit').click();
    cy.url().should('include', 'dashboard.html');
  });

  it('1. AGREGAR (Create) - Registra un nuevo cristal', () => {
    cy.visit(`${baseUrl}/inventario_cristales.html`);
    cy.contains('Añadir Lote AR').click();
    cy.get('#mc_familia').type('Cristal Multifocal de Prueba');
    cy.get('#mc_esferico').type('+1.25');
    cy.get('#mc_cantidad').clear().type('15');
    cy.get('#btnMcGuardar').click();
    cy.get('#modalCristal').should('not.be.visible');
  });

  it('2. MOSTRAR TODO (Read) - Carga el dashboard y sus tablas', () => {
    cy.get('.dashboard-table').should('exist');
    cy.get('#stat-ordenes-proceso').should('be.visible');
    cy.get('#stat-caja-total').should('be.visible');
  });

  it('3. ACTUALIZAR (Update) - Cambia el estado de una orden', () => {
    cy.visit(`${baseUrl}/buscar_orden.html`);
    cy.on('window:alert', (textoAlert) => {
        expect(textoAlert).to.contains('exitosa');
    });
    cy.get('.btn-action').first().click();
    cy.get('#m_estado').select('Listo para retiro');
    cy.get('#btnGuardarModal').click();
  });

  it('4. ELIMINAR (Delete) - Elimina un registro del inventario', () => {
    cy.visit(`${baseUrl}/inventario.html`);
    cy.on('window:confirm', () => true);
    cy.get('.btn-danger').first().click();
  });

  it('5. BUSCAR (Search) - Filtra una orden específica por RUT', () => {
    cy.visit(`${baseUrl}/buscar_orden.html`);
    cy.get('#s_rut').type('19.123.456-7'); 
    cy.contains('Buscar Órdenes').click();
    cy.get('#resultsBody').should('exist');
  });

});