# Requirements Document

## Introduction

This document specifies the requirements for two main features in a PHP MVC web application:

1. **Dynamic Database-Driven Menu System**: A dynamic menu that loads from a database table, allowing administrators to manage menu items without modifying code. During development, the new dynamic menu will coexist with the current static menu for comparison purposes. The menu must maintain the exact appearance and functionality of the current Bootstrap 5.3.8-based navigation while supporting horizontal menu items (level 1) and dropdown submenus (level 2).

2. **Orders Management Module (Pedidos)**: A complete master-detail module for managing orders and their line items, following the same MVC pattern as the existing Users module. This module will allow creating, editing, viewing, and managing orders with their associated detail lines.

## Glossary

**Menu System Terms:**
- **Menu_System**: The complete navigation menu component that displays menu items to users
- **Menu_Item**: A single navigation option that can be either a top-level item or a dropdown submenu item
- **Level_1_Item**: A horizontal menu item displayed in the main navigation bar
- **Level_2_Item**: A dropdown submenu item that appears under a Level_1_Item
- **Menu_Controller**: The PHP controller responsible for handling menu-related requests
- **Menu_Model**: The PHP model responsible for database operations related to menu data
- **Menu_View**: The PHP view responsible for rendering the menu HTML
- **Static_Menu**: The current hardcoded HTML menu in index.php
- **Dynamic_Menu**: The new database-driven menu that will be rendered alongside the Static_Menu during development

**Orders Module Terms:**
- **Order**: A master record representing a purchase order (pedido) with header information
- **Order_Line**: A detail record representing a single line item within an Order
- **Orders_Controller**: The PHP controller responsible for handling order-related requests
- **Orders_Model**: The PHP model responsible for database operations related to orders
- **Orders_View**: The PHP view responsible for rendering order management interfaces
- **Master_Detail_Pattern**: A UI pattern where a master record (Order) contains multiple detail records (Order_Lines)

**Common Terms:**
- **DAO**: Data Access Object class that handles database connections and queries
- **Front_Controller**: The main controller that routes requests in the MVC application (CFrontal.php)
- **Action**: The functionality or method to execute when a menu item is clicked

## Requirements

## PART A: Dynamic Database-Driven Menu System

### Requirement 1: Database Schema for Menu Storage

**User Story:** As a system administrator, I want menu items stored in a database table, so that I can manage the menu structure without modifying code.

#### Acceptance Criteria

1. THE Menu_System SHALL store all menu data in a table named "menus"
2. THE menus table SHALL include a primary key field "idOpcion" that is auto-increment, unsigned, and size 11
3. THE menus table SHALL store both Level_1_Item and Level_2_Item records in the same table
4. THE menus table SHALL include a field to specify the parent-child relationship between menu items
5. THE menus table SHALL include a field to store the display order position of each Menu_Item
6. THE menus table SHALL include a field to store the text label displayed for each Menu_Item
7. THE menus table SHALL include a field to store the Action to execute when a Menu_Item is clicked
8. THE menus table SHALL include a field to indicate whether a Menu_Item is active or inactive

### Requirement 2: Menu Data Retrieval

**User Story:** As a developer, I want a model to fetch menu data from the database, so that the menu can be dynamically generated.

#### Acceptance Criteria

1. THE Menu_Model SHALL extend or use the existing DAO class for database operations
2. WHEN the Menu_Model retrieves menu data, THE Menu_Model SHALL return all active menu items ordered by position
3. THE Menu_Model SHALL provide a method to retrieve all Level_1_Item records
4. THE Menu_Model SHALL provide a method to retrieve Level_2_Item records for a specific parent Menu_Item
5. THE Menu_Model SHALL return menu data in a structured format that includes item ID, label, action, position, and parent relationship

### Requirement 3: MVC Controller for Menu Management

**User Story:** As a developer, I want a dedicated controller for menu operations, so that menu logic follows the MVC pattern.

#### Acceptance Criteria

1. THE Menu_System SHALL include a Menu_Controller class that extends the base Controlador class
2. THE Menu_Controller SHALL provide a method to retrieve and prepare menu data for rendering
3. WHEN the Menu_Controller prepares menu data, THE Menu_Controller SHALL organize items into a hierarchical structure with Level_1_Item and their associated Level_2_Item children
4. THE Menu_Controller SHALL pass the structured menu data to the Menu_View for rendering

### Requirement 4: Dynamic Menu Rendering

**User Story:** As a user, I want the menu to display dynamically from database content, so that I see the current menu structure without page code changes.

#### Acceptance Criteria

1. THE Menu_View SHALL generate HTML markup compatible with Bootstrap 5.3.8 navbar structure
2. WHEN rendering Level_1_Item records, THE Menu_View SHALL create horizontal navigation items in the navbar
3. WHEN a Level_1_Item has associated Level_2_Item children, THE Menu_View SHALL render it as a dropdown menu with the "dropdown-toggle" class
4. WHEN rendering Level_2_Item records, THE Menu_View SHALL create dropdown menu items within their parent's dropdown-menu container
5. THE Menu_View SHALL apply the correct Bootstrap classes to maintain the current menu appearance
6. THE Menu_View SHALL render menu items in the order specified by their position field
7. WHILE development is in progress, THE Dynamic_Menu SHALL be rendered below the Static_Menu in index.php for comparison purposes
8. THE Dynamic_Menu SHALL be visually distinguishable from the Static_Menu during development (e.g., with a label or different background color)

### Requirement 5: Menu Item Action Execution

**User Story:** As a user, I want menu items to execute their configured actions, so that clicking menu items performs the intended functionality.

#### Acceptance Criteria

1. WHEN a Menu_Item has an Action that calls a JavaScript function, THE Menu_View SHALL render an onclick attribute with that function call
2. WHEN a Menu_Item has an Action that links to a URL, THE Menu_View SHALL render an href attribute with that URL
3. THE Menu_System SHALL support the existing obtenerVista JavaScript function pattern for AJAX content loading
4. THE Menu_System SHALL maintain compatibility with existing menu actions such as "obtenerVista('Usuarios','getVistaUsuariosPrincipal','capaContenido')"

### Requirement 6: Visual Consistency with Current Menu

**User Story:** As a user, I want the new dynamic menu to look identical to the current menu, so that the user experience remains consistent.

#### Acceptance Criteria

1. THE Menu_View SHALL render a navbar with class "navbar navbar-expand-lg bg-body-tertiary"
2. THE Menu_View SHALL include a navbar-toggler button for responsive mobile display
3. THE Menu_View SHALL render menu items with the appropriate nav-link, dropdown-toggle, and dropdown-item classes
4. THE Menu_View SHALL maintain the current navbar-brand element
5. WHEN viewed on mobile devices, THE Menu_View SHALL collapse into a hamburger menu using Bootstrap's collapse functionality

### Requirement 7: Menu Item Positioning and Ordering

**User Story:** As a system administrator, I want to control the order of menu items, so that I can organize the menu logically.

#### Acceptance Criteria

1. WHEN menu items are retrieved from the database, THE Menu_Model SHALL order them by the position field in ascending order
2. WHEN a new Menu_Item is added with a position value, THE Menu_System SHALL display it at that position in the menu sequence
3. WHEN two Menu_Item records have the same position value, THE Menu_System SHALL order them by their primary key (idOpcion)
4. THE Menu_System SHALL support position values that allow inserting items between existing items without renumbering all items

### Requirement 8: Integration with Existing MVC Application

**User Story:** As a developer, I want the menu system to integrate seamlessly with the existing application, so that it works with the current Front_Controller pattern.

#### Acceptance Criteria

1. THE Menu_Controller SHALL follow the same naming and structure conventions as existing controllers (CUsuarios, CPedidos, CProductos)
2. THE Menu_Controller SHALL be accessible through the Front_Controller (CFrontal.php) routing mechanism
3. THE Menu_View SHALL be included in the main index.php file below the current Static_Menu during development
4. THE Menu_System SHALL not require changes to existing controllers, models, or views for users, products, or orders
5. THE Menu_System SHALL use the existing DAO class for database connectivity without modification
6. WHILE development is in progress, THE Static_Menu SHALL remain functional and unchanged in index.php

### Requirement 9: Active/Inactive Menu Items

**User Story:** As a system administrator, I want to activate or deactivate menu items, so that I can control menu visibility without deleting items.

#### Acceptance Criteria

1. THE menus table SHALL include a field to mark Menu_Item records as active or inactive
2. WHEN retrieving menu data, THE Menu_Model SHALL only return Menu_Item records marked as active
3. WHEN a Menu_Item is marked as inactive, THE Menu_System SHALL not display it in the rendered menu
4. WHEN a Level_1_Item is inactive, THE Menu_System SHALL also hide all its associated Level_2_Item children

### Requirement 10: Database Table Creation

**User Story:** As a developer, I want a SQL script to create the menus table, so that I can set up the database schema correctly.

#### Acceptance Criteria

1. THE Menu_System SHALL include a SQL script to create the menus table with all required fields
2. THE SQL script SHALL define appropriate data types for each field (VARCHAR for text, INT for IDs and positions, CHAR for active flag)
3. THE SQL script SHALL set the idOpcion field as PRIMARY KEY with AUTO_INCREMENT
4. THE SQL script SHALL include sample INSERT statements to populate the menu with the current static menu items (Home, Features, Pricing, Mtto.Datos with Usuarios and Pedidos submenus)

## PART B: Orders Management Module (Pedidos)

### Requirement 11: Database Schema for Orders

**User Story:** As a system administrator, I want orders stored in a database with master-detail structure, so that I can manage order information and their line items.

#### Acceptance Criteria

1. THE Orders_Module SHALL store order header data in a table named "pedidos"
2. THE pedidos table SHALL include a primary key field "idPedido" that is auto-increment
3. THE pedidos table SHALL include fields for order date, customer information, total amount, and status
4. THE pedidos table SHALL include an "activo" field to mark orders as active or inactive
5. THE Orders_Module SHALL store order line items in a table named "lineas_pedido"
6. THE lineas_pedido table SHALL include a primary key field "idLinea" that is auto-increment
7. THE lineas_pedido table SHALL include a foreign key field "idPedido" referencing the pedidos table
8. THE lineas_pedido table SHALL include fields for product reference, quantity, unit price, and line total
9. THE SQL script SHALL define appropriate foreign key constraints between pedidos and lineas_pedido tables

### Requirement 12: Orders Model for Data Access

**User Story:** As a developer, I want a model to handle order data operations, so that I can perform CRUD operations on orders and their lines.

#### Acceptance Criteria

1. THE Orders_Model SHALL extend or use the existing DAO class for database operations
2. THE Orders_Model SHALL provide a method to retrieve all orders with pagination support
3. THE Orders_Model SHALL provide a method to retrieve a single order by its idPedido
4. THE Orders_Model SHALL provide a method to retrieve all Order_Line records for a specific Order
5. THE Orders_Model SHALL provide a method to insert a new Order with its associated Order_Line records
6. THE Orders_Model SHALL provide a method to update an existing Order and its Order_Line records
7. THE Orders_Model SHALL provide a method to delete (mark as inactive) an Order
8. WHEN retrieving orders, THE Orders_Model SHALL support filtering by date range, customer, or status
9. WHEN retrieving orders, THE Orders_Model SHALL return the total count of records for pagination

### Requirement 13: Orders Controller Following MVC Pattern

**User Story:** As a developer, I want a controller for order operations, so that order logic follows the same MVC pattern as the Users module.

#### Acceptance Criteria

1. THE Orders_Controller SHALL be implemented in a file named "CPedidos.php" in the controladores directory
2. THE Orders_Controller SHALL extend the base Controlador class
3. THE Orders_Controller SHALL provide a method "getVistaPedidosPrincipal" to display the main orders view
4. THE Orders_Controller SHALL provide a method "getVistaListadoPedidos" to display paginated order listings
5. THE Orders_Controller SHALL provide a method "getVistaFormularioPedido" to display the order creation/edit form
6. THE Orders_Controller SHALL provide a method "insertarPedido" to handle order creation with line items
7. THE Orders_Controller SHALL provide a method "actualizarPedido" to handle order updates with line items
8. THE Orders_Controller SHALL provide a method "borrarPedido" to handle order deletion (mark as inactive)
9. THE Orders_Controller SHALL follow the same naming conventions and structure as CUsuarios

### Requirement 14: Orders Principal View

**User Story:** As a user, I want a main orders interface, so that I can search, view, and manage orders.

#### Acceptance Criteria

1. THE Orders_View SHALL include a file "VPedidosPrincipal.php" in the vistas/Pedidos directory
2. THE VPedidosPrincipal view SHALL display a search form with filters for date range, customer, and status
3. THE VPedidosPrincipal view SHALL display a button to create new orders
4. THE VPedidosPrincipal view SHALL include a container div where the order listing will be loaded via AJAX
5. THE VPedidosPrincipal view SHALL follow the same layout and styling as VUsuariosPrincipal
6. THE VPedidosPrincipal view SHALL use Bootstrap 5.3.8 classes for consistent styling

### Requirement 15: Orders Listing View

**User Story:** As a user, I want to see a paginated list of orders, so that I can browse and select orders to view or edit.

#### Acceptance Criteria

1. THE Orders_View SHALL include a file "VListadoPedidos.php" in the vistas/Pedidos directory
2. THE VListadoPedidos view SHALL display orders in a table with columns for order ID, date, customer, total amount, and status
3. THE VListadoPedidos view SHALL include action buttons for each order to view details, edit, and delete
4. THE VListadoPedidos view SHALL display pagination controls at the bottom of the table
5. THE VListadoPedidos view SHALL support configurable page sizes (15, 30, 50 records per page)
6. WHEN no orders match the search criteria, THE VListadoPedidos view SHALL display a "No results found" message
7. THE VListadoPedidos view SHALL follow the same structure and styling as VListadoUsuarios

### Requirement 16: Order Form View (Master-Detail)

**User Story:** As a user, I want a form to create and edit orders with their line items, so that I can manage complete order information.

#### Acceptance Criteria

1. THE Orders_View SHALL include a file "VFormularioPedido.php" in the vistas/Pedidos directory
2. THE VFormularioPedido view SHALL display a form with fields for order header information (date, customer, status)
3. THE VFormularioPedido view SHALL display a section for managing Order_Line records (detail lines)
4. THE VFormularioPedido view SHALL include a button to add new Order_Line records to the order
5. THE VFormularioPedido view SHALL display each Order_Line with fields for product, quantity, unit price, and line total
6. THE VFormularioPedido view SHALL include a delete button for each Order_Line
7. THE VFormularioPedido view SHALL calculate and display the order total amount automatically when line items change
8. THE VFormularioPedido view SHALL include Save and Cancel buttons
9. WHEN editing an existing order, THE VFormularioPedido view SHALL load and display all existing Order_Line records
10. THE VFormularioPedido view SHALL use Bootstrap 5.3.8 form classes for consistent styling

### Requirement 17: Orders JavaScript Functionality

**User Story:** As a user, I want interactive order management, so that I can perform operations without full page reloads.

#### Acceptance Criteria

1. THE Orders_Module SHALL include a JavaScript file "pedidos.js" in the js directory
2. THE pedidos.js file SHALL provide functions to load order views via AJAX using the obtenerVista pattern
3. THE pedidos.js file SHALL provide a function to add new Order_Line rows dynamically to the form
4. THE pedidos.js file SHALL provide a function to remove Order_Line rows from the form
5. THE pedidos.js file SHALL provide a function to calculate line totals when quantity or price changes
6. THE pedidos.js file SHALL provide a function to calculate and update the order total amount
7. THE pedidos.js file SHALL provide a function to submit the order form via AJAX
8. THE pedidos.js file SHALL provide a function to handle order deletion with confirmation dialog
9. THE pedidos.js file SHALL display success or error messages using the appAlert div
10. THE pedidos.js file SHALL follow the same patterns and conventions as usuarios.js

### Requirement 18: Orders Data Validation

**User Story:** As a user, I want order data to be validated, so that I cannot save incomplete or invalid orders.

#### Acceptance Criteria

1. WHEN submitting an order form, THE Orders_Controller SHALL validate that required fields are not empty
2. WHEN submitting an order form, THE Orders_Controller SHALL validate that the order date is a valid date
3. WHEN submitting an order form, THE Orders_Controller SHALL validate that at least one Order_Line exists
4. WHEN submitting an order form, THE Orders_Controller SHALL validate that each Order_Line has a product reference
5. WHEN submitting an order form, THE Orders_Controller SHALL validate that quantities are positive numbers
6. WHEN submitting an order form, THE Orders_Controller SHALL validate that prices are positive numbers
7. IF validation fails, THEN THE Orders_Controller SHALL return an error message to display to the user
8. THE pedidos.js file SHALL perform client-side validation before submitting the form

### Requirement 19: Orders Pagination

**User Story:** As a user, I want paginated order listings, so that I can navigate through large numbers of orders efficiently.

#### Acceptance Criteria

1. THE Orders_Controller SHALL implement pagination using the same pattern as CUsuarios
2. THE Orders_Controller SHALL accept parameters for page number and page size
3. THE Orders_Controller SHALL return the total count of orders matching the search criteria
4. THE VListadoPedidos view SHALL display pagination controls showing current page, total pages, and navigation buttons
5. THE pedidos.js file SHALL handle pagination navigation via AJAX without full page reloads
6. THE pagination controls SHALL follow the same styling and behavior as the Users module pagination

### Requirement 20: Orders SQL Script

**User Story:** As a developer, I want SQL scripts to create the orders tables, so that I can set up the database schema correctly.

#### Acceptance Criteria

1. THE Orders_Module SHALL include a SQL script to create the pedidos table with all required fields
2. THE Orders_Module SHALL include a SQL script to create the lineas_pedido table with all required fields
3. THE SQL script SHALL define appropriate data types for each field
4. THE SQL script SHALL set primary keys with AUTO_INCREMENT for idPedido and idLinea
5. THE SQL script SHALL define a foreign key constraint from lineas_pedido.idPedido to pedidos.idPedido
6. THE SQL script SHALL include sample INSERT statements to populate test orders with line items for development purposes
