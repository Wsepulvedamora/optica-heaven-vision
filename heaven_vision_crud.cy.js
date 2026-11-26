describe('Pruebas Automatizadas Heaven Vision - CRUD', () => {

  // URL generada por el servidor local (ej. Live Server)
  const baseUrl = 'http://127.0.0.1:5500'; 

  it('1. AGREGAR (Create) - Registra un nuevo cristal en inventario', () => {
    cy.visit(`${baseUrl}/inventario_cristales.html`);
    
    // Abre el modal haciendo clic en el botón de añadir
    cy.contains('Añadir Lote AR').click();
    
    // Simula la escritura en los campos del formulario usando los ID exactos
    cy.get('#mc_familia').type('Cristal Multifocal de Prueba');
    cy.get('#mc_esferico').type('+1.25');
    cy.get('#mc_cantidad').clear().type('15');
    
    // Hace clic en el botón de guardar
    cy.get('#btnMcGuardar').click();
    
    // Verifica que el modal desapareció de la pantalla tras guardar exitosamente
    cy.get('#modalCristal').should('not.be.visible');
  });

  it('2. MOSTRAR TODO (Read) - Carga el dashboard y sus tablas', () => {
    cy.visit(`${baseUrl}/dashboard.html`);
    
    // Verifica que la tabla de últimas órdenes exista en el DOM
    cy.get('.dashboard-table').should('exist');
    
    // Verifica que las tarjetas de métricas analíticas se hayan renderizado
    cy.get('#stat-ordenes-proceso').should('be.visible');
    cy.get('#stat-caja-total').should('be.visible');
  });

  it('3. ACTUALIZAR (Update) - Cambia el estado de una orden de trabajo', () => {
    cy.visit(`${baseUrl}/buscar_orden.html`);
    
    // En el código HTML tienes un alert("Orden... exitosa"). Cypress lo auto-acepta, 
    // pero configuramos esta línea para verificar que el texto del alert fue correcto.
    cy.on('window:alert', (textoAlert) => {
        expect(textoAlert).to.contains('exitosa');
    });

    // Hace clic en el botón "Editar" de la primera orden de la tabla
    cy.get('.btn-action').first().click();
    
    // Cambia el valor del selector de estado
    cy.get('#m_estado').select('Listo para retiro');
    
    // Guarda los cambios del modal
    cy.get('#btnGuardarModal').click();
  });

  it('4. ELIMINAR (Delete) - Elimina un registro del inventario', () => {
    cy.visit(`${baseUrl}/inventario.html`);
    
    // En tu código HTML usas un confirm("¿Está seguro...?"). 
    // Cypress simula que el usuario hace clic en "Aceptar" automáticamente.
    cy.on('window:confirm', () => true);
    
    // Busca el primer botón rojo de basura y le hace clic
    cy.get('.btn-danger').first().click();
  });

  it('5. BUSCAR (Search) - Filtra una orden específica por RUT', () => {
    cy.visit(`${baseUrl}/buscar_orden.html`);
    
    // Escribe un RUT de prueba en el input de búsqueda
    cy.get('#s_rut').type('19.123.456-7'); 
    
    // Hace clic en el botón para enviar la búsqueda
    cy.contains('Buscar Órdenes').click();
    
    // Verifica que el cuerpo de resultados siga presente tras la búsqueda
    cy.get('#resultsBody').should('exist');
  });

});
