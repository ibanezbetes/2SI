CREATE TABLE IF NOT EXISTS pedidos (
  idPedido INT AUTO_INCREMENT PRIMARY KEY,
  idUsuario INT UNSIGNED NOT NULL,
  fecha DATE NOT NULL,
  total DECIMAL(10,2) DEFAULT 0,
  estado CHAR(1) DEFAULT 'P', -- P: Pendiente, C: Completado
  activo CHAR(1) DEFAULT 'S',
  FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS pedidos_detalles (
  idDetalle INT AUTO_INCREMENT PRIMARY KEY,
  idPedido INT NOT NULL,
  idProducto INT NOT NULL,
  cantidad INT NOT NULL,
  precioUnitario DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (idPedido) REFERENCES pedidos(idPedido),
  FOREIGN KEY (idProducto) REFERENCES productos(idProducto)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
