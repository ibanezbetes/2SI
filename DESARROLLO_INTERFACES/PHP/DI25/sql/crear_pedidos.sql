CREATE TABLE IF NOT EXISTS pedidos (
    idPedido INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE NOT NULL,
    idUsuario INT UNSIGNED NOT NULL,
    total DECIMAL(10,2) NOT NULL DEFAULT 0,
    estado VARCHAR(20) DEFAULT 'Pendiente',
    FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS pedidos_detalles (
    idDetalle INT AUTO_INCREMENT PRIMARY KEY,
    idPedido INT NOT NULL,
    idProducto INT NOT NULL,
    cantidad INT NOT NULL,
    precioUnitario DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (idPedido) REFERENCES pedidos(idPedido) ON DELETE CASCADE,
    FOREIGN KEY (idProducto) REFERENCES productos(idProducto)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
