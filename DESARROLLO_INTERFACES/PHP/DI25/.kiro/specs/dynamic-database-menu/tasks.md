# Implementation Plan: Dynamic Database-Driven Menu and Orders Module

## Overview

This implementation plan covers two main features:
1. **Dynamic Menu System**: Database-driven menu that replaces static HTML menu
2. **Orders Module**: Complete master-detail CRUD module for managing orders with line items

Both features follow the existing MVC architecture and integrate with the Front Controller pattern. Implementation will be incremental, with testing at each step to validate functionality early.

## Tasks

- [x] 1. Set up database schema and test data
  - Create `menus` table with all required fields (idOpcion, etiqueta, idPadre, posicion, accion, activo)
  - Create `pedidos` table with all required fields (idPedido, fecha, idUsuario, estado, total, observaciones, activo)
  - Create `lineas_pedido` table with foreign key to pedidos
  - Insert sample menu data matching current static menu
  - Insert sample order and line data for testing
  - _Requirements: 1.1-1.8, 10.1-10.4, 11.1-11.9, 20.1-20.6_

- [x] 2. Implement Menu System (Part A)
  - [x] 2.1 Create MMenus model class
    - Implement obtenerMenusActivos() method
    - Implement obtenerMenusNivel1() method
    - Implement obtenerSubmenus($idPadre) method
    - _Requirements: 2.1-2.5_
  
  - [ ]* 2.2 Write property tests for MMenus model
    - **Property 1: Active menu items are ordered by position**
    - **Validates: Requirements 2.2, 7.1**
    - **Property 2: Level 1 items have no parent**
    - **Validates: Requirements 2.3**
    - **Property 3: Level 2 items belong to specified parent**
    - **Validates: Requirements 2.4**
    - **Property 4: Menu items contain required fields**
    - **Validates: Requirements 2.5**
  
  - [x] 2.3 Create CMenus controller class
    - Implement obtenerMenuDinamico() method
    - Build hierarchical menu structure from model data
    - Pass structured data to view
    - _Requirements: 3.1-3.4_
  
  - [ ]* 2.4 Write property test for menu hierarchy
    - **Property 5: Hierarchical structure groups children under parents**
    - **Validates: Requirements 3.3**
  
  - [x] 2.5 Create VMenuDinamico view
    - Implement Bootstrap 5.3.8 navbar structure
    - Render level 1 items as nav-items
    - Render level 1 items with children as dropdowns
    - Render level 2 items as dropdown-items
    - Include navbar-toggler for mobile
    - _Requirements: 4.1-4.6, 5.1-5.2, 6.1-6.4_
  
  - [ ]* 2.6 Write property tests for menu rendering
    - **Property 6: Generated HTML contains Bootstrap navbar classes**
    - **Validates: Requirements 4.1**
    - **Property 7: Level 1 items render as nav-items**
    - **Validates: Requirements 4.2**
    - **Property 8: Level 1 items with children render as dropdowns**
    - **Validates: Requirements 4.3**
    - **Property 9: Level 2 items render within dropdown-menu**
    - **Validates: Requirements 4.4**
    - **Property 10: Menu items render in position order**
    - **Validates: Requirements 4.6**
    - **Property 11: JavaScript actions render as onclick attributes**
    - **Validates: Requirements 5.1**
    - **Property 12: URL actions render as href attributes**
    - **Validates: Requirements 5.2**
  
  - [x] 2.7 Integrate dynamic menu into index.php
    - Add dynamic menu below static menu
    - Add visual distinction (border, label)
    - Test both menus work correctly
    - _Requirements: 4.7-4.8, 8.2-8.3, 8.6_
  
  - [ ]* 2.8 Write property tests for menu ordering and filtering
    - **Property 13: Menu items with same position order by ID**
    - **Validates: Requirements 7.3**
    - **Property 14: Inactive menu items are excluded**
    - **Validates: Requirements 9.3**
    - **Property 15: Inactive parents hide their children**
    - **Validates: Requirements 9.4**
  
  - [ ]* 2.9 Write unit tests for menu edge cases
    - Test empty menu (no items)
    - Test menu with only level 1 items
    - Test menu with orphaned level 2 items
    - Test menu with duplicate positions
    - Test menu with all inactive items
    - _Requirements: 2.2-2.5, 9.2-9.4_

- [ ] 3. Checkpoint - Verify Menu System
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Implement Orders Module - Model Layer (Part B)
  - [x] 4.1 Create MPedidos model class
    - Implement obtenerPedidos($filtros, $pagina, $tamPag) method
    - Implement contarPedidos($filtros) method
    - Implement obtenerPedidoPorId($idPedido) method
    - Implement insertarPedido($datosPedido) method
    - Implement actualizarPedido($idPedido, $datosPedido) method
    - Implement borrarPedido($idPedido) method (soft delete)
    - _Requirements: 12.1-12.3, 12.5-12.7_
  
  - [x] 4.2 Implement order lines methods in MPedidos
    - Implement obtenerLineasPedido($idPedido) method
    - Implement insertarLineaPedido($datosLinea) method
    - Implement borrarLineasPedido($idPedido) method
    - Implement calcularTotalPedido($idPedido) method
    - _Requirements: 12.4-12.6_
  
  - [x] 4.3 Implement helper methods in MPedidos
    - Implement obtenerUsuarios() method
    - Implement obtenerProductos() method
    - _Requirements: 12.2_
  
  - [ ]* 4.4 Write property tests for MPedidos CRUD operations
    - **Property 16: Retrieve order by ID returns correct order**
    - **Validates: Requirements 12.3**
    - **Property 17: Order lines belong to specified order**
    - **Validates: Requirements 12.4**
    - **Property 18: Insert then retrieve preserves order data**
    - **Validates: Requirements 12.5**
    - **Property 19: Update then retrieve reflects changes**
    - **Validates: Requirements 12.6**
    - **Property 20: Deleted orders are excluded from active queries**
    - **Validates: Requirements 12.7**
  
  - [ ]* 4.5 Write property tests for filtering and pagination
    - **Property 21: Filtered orders match filter criteria**
    - **Validates: Requirements 12.8**
    - **Property 22: Order count matches filtered results**
    - **Validates: Requirements 12.9**

- [ ] 5. Implement Orders Module - Controller Layer
  - [ ] 5.1 Create CPedidos controller class
    - Implement getVistaPedidosPrincipal() method
    - Implement getVistaListadoPedidos() method with pagination
    - Implement getVistaFormularioPedido() method
    - _Requirements: 13.1-13.5_
  
  - [ ] 5.2 Implement order CRUD methods in CPedidos
    - Implement obtenerPedido() method (JSON response)
    - Implement crearPedido() method with validation
    - Implement actualizarPedido() method with validation
    - Implement eliminarPedido() method
    - _Requirements: 13.6-13.8, 18.1-18.7_
  
  - [ ]* 5.3 Write unit tests for validation logic
    - Test empty required fields validation
    - Test invalid date validation
    - Test zero lines validation
    - Test missing product validation
    - Test non-positive quantity validation
    - Test non-positive price validation
    - _Requirements: 18.1-18.7_
  
  - [ ]* 5.4 Write property tests for validation
    - **Property 34: Empty required fields trigger validation error**
    - **Validates: Requirements 18.1**
    - **Property 35: Invalid date triggers validation error**
    - **Validates: Requirements 18.2**
    - **Property 36: Missing product in line triggers validation error**
    - **Validates: Requirements 18.4**
    - **Property 37: Non-positive quantity triggers validation error**
    - **Validates: Requirements 18.5**
    - **Property 38: Non-positive price triggers validation error**
    - **Validates: Requirements 18.6**

- [ ] 6. Checkpoint - Verify Model and Controller
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 7. Implement Orders Module - View Layer
  - [ ] 7.1 Create VPedidosPrincipal view
    - Implement search form with filters (usuario, fecha, estado)
    - Add "Nuevo Pedido" button
    - Add container div for order listing
    - Add JavaScript to load initial listing
    - _Requirements: 14.1-14.4_
  
  - [ ] 7.2 Create VListadoPedidos view
    - Implement orders table with required columns
    - Add action buttons (view, edit, delete) for each order
    - Implement pagination controls
    - Add page size selector
    - Add empty state message
    - Implement status badge color coding
    - _Requirements: 15.1-15.6_
  
  - [ ]* 7.3 Write property tests for listing view
    - **Property 23: Order listing table contains required columns**
    - **Validates: Requirements 15.2**
    - **Property 24: Each order row has action buttons**
    - **Validates: Requirements 15.3**
    - **Property 25: Pagination controls appear for multiple pages**
    - **Validates: Requirements 15.4**
  
  - [ ] 7.4 Create VFormularioPedido view - Header section
    - Implement order header form fields (fecha, idUsuario, estado, observaciones)
    - Add hidden idPedido field for edit mode
    - Populate dropdowns with users and products
    - _Requirements: 16.1-16.2_
  
  - [ ] 7.5 Create VFormularioPedido view - Lines section
    - Implement lines table with product, cantidad, precio, subtotal columns
    - Add "Agregar Línea" button
    - Add delete button for each line
    - Add total row in table footer
    - Create hidden template element for cloning new lines
    - Load existing lines when editing
    - _Requirements: 16.3-16.6, 16.9_
  
  - [ ] 7.6 Add form actions to VFormularioPedido
    - Add Save button with form submit handler
    - Add Cancel button
    - Add validation warning message div
    - _Requirements: 16.7-16.8_
  
  - [ ]* 7.7 Write property tests for form view
    - **Property 26: Order form contains header fields**
    - **Validates: Requirements 16.2**
    - **Property 27: Order line rows contain required fields**
    - **Validates: Requirements 16.5**
    - **Property 28: Each line row has delete button**
    - **Validates: Requirements 16.6**
    - **Property 29: Editing order loads all existing lines**
    - **Validates: Requirements 16.9**

- [ ] 8. Implement Orders Module - JavaScript Layer
  - [ ] 8.1 Create pedidos.js - Search and navigation functions
    - Implement buscarPedidos() function
    - Implement cambiarPagina() function
    - Implement cambiarTamanioPagina() function
    - Implement nuevoPedido() function
    - Implement verPedido() function
    - Implement editarPedido() function
    - _Requirements: 17.1-17.2_
  
  - [ ] 8.2 Implement line management functions in pedidos.js
    - Implement agregarLinea() function (clone template)
    - Implement eliminarLinea() function
    - Add event listener for product selection (auto-fill price)
    - _Requirements: 17.3-17.4_
  
  - [ ] 8.3 Implement calculation functions in pedidos.js
    - Implement calcularSubtotal() function
    - Implement calcularTotalPedido() function
    - Add onchange handlers for cantidad and precio inputs
    - _Requirements: 17.5-17.6_
  
  - [ ]* 8.4 Write property tests for JavaScript calculations
    - **Property 32: Line subtotal equals quantity times price**
    - **Validates: Requirements 17.5**
    - **Property 33: Order total equals sum of line subtotals**
    - **Validates: Requirements 17.6**
  
  - [ ] 8.5 Implement form submission in pedidos.js
    - Implement guardarPedido() function with validation
    - Build lineas JSON array from form
    - Submit via AJAX to crearPedido or actualizarPedido
    - Handle success and error responses
    - _Requirements: 17.7, 18.8_
  
  - [ ] 8.6 Implement delete and utility functions in pedidos.js
    - Implement eliminarPedido() function with confirmation
    - Implement cancelarFormulario() function
    - Implement mostrarMensaje() function for alerts
    - _Requirements: 17.8-17.9_
  
  - [ ]* 8.7 Write unit tests for DOM manipulation
    - Test agregarLinea() increases row count
    - Test eliminarLinea() decreases row count
    - Test removing last line shows warning
    - Test product selection auto-fills price
    - Test form validation prevents submission
    - _Requirements: 17.3-17.4_
  
  - [ ]* 8.8 Write property tests for DOM operations
    - **Property 30: Adding line increases row count**
    - **Validates: Requirements 17.3**
    - **Property 31: Removing line decreases row count**
    - **Validates: Requirements 17.4**

- [ ] 9. Integration and Error Handling
  - [ ] 9.1 Add error handling to all model methods
    - Add try-catch blocks for database operations
    - Log errors to server error log
    - Return descriptive error messages
    - _Requirements: Error Handling section_
  
  - [ ] 9.2 Add error handling to all controller methods
    - Validate input parameters
    - Handle model errors gracefully
    - Return appropriate HTTP status codes
    - Return user-friendly error messages
    - _Requirements: Error Handling section_
  
  - [ ] 9.3 Add error handling to JavaScript functions
    - Add try-catch blocks for calculations
    - Handle AJAX errors with retry logic
    - Display error messages in appAlert div
    - Preserve form data on errors
    - _Requirements: Error Handling section_
  
  - [ ]* 9.4 Write integration tests for error scenarios
    - Test database connection failure
    - Test validation error handling
    - Test AJAX request failure
    - Test foreign key constraint errors
    - Test empty state handling
    - _Requirements: Error Handling section_

- [ ] 10. Final Integration and Testing
  - [ ] 10.1 Wire all components together
    - Verify menu system works with CFrontal routing
    - Verify orders module accessible from dynamic menu
    - Test complete order CRUD flow
    - Test pagination and filtering
    - _Requirements: 8.1-8.6, 13.1-13.9_
  
  - [ ]* 10.2 Run full test suite
    - Run all unit tests
    - Run all property tests (minimum 100 iterations each)
    - Verify code coverage meets goals (80% models, 70% controllers, 60% views)
    - _Requirements: Testing Strategy section_
  
  - [ ]* 10.3 Perform manual testing
    - Complete manual testing checklist for menu system
    - Complete manual testing checklist for orders module
    - Test on different browsers (Chrome, Firefox, Safari)
    - Test responsive behavior on mobile devices
    - _Requirements: Testing Strategy section_

- [ ] 11. Final Checkpoint - Complete System Verification
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties with minimum 100 iterations
- Unit tests validate specific examples and edge cases
- Implementation follows existing MVC patterns (CUsuarios, VUsuariosPrincipal, usuarios.js)
- Dynamic menu will coexist with static menu during development for comparison
- Orders module follows master-detail pattern with transactional integrity
