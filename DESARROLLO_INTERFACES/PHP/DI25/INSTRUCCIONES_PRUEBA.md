# 🧪 Instrucciones para Probar la Aplicación

## 📋 Checklist de Pruebas

### 1. **Pruebas de Validación - Usuarios**

#### Crear Usuario - Validaciones Negativas
1. ✅ Abrir la aplicación y navegar a Usuarios
2. ✅ Click en "Crear Nuevo Usuario"
3. ✅ Intentar guardar sin completar campos → Debe mostrar error en pantalla
4. ✅ Ingresar email inválido (ej: "correo@") → Debe mostrar error de formato
5. ✅ Ingresar móvil inválido (ej: "123") → Debe mostrar error de formato
6. ✅ Ingresar login existente (ej: "javier") → Debe mostrar "Login ya en uso"

#### Crear Usuario - Validación Positiva
1. ✅ Completar todos los campos correctamente:
   - Nombre: "Prueba"
   - Apellido1: "Test"
   - Email: "prueba@test.com"
   - Móvil: "612345678"
   - Login: "prueba_unico_123" (uno que no exista)
   - Contraseña: "123456"
2. ✅ Click en "Guardar Usuario"
3. ✅ Debe mostrar mensaje de éxito en verde
4. ✅ La lista debe refrescarse automáticamente
5. ✅ El nuevo usuario debe aparecer en la tabla

#### Editar Usuario
1. ✅ Click en botón ✏️ de un usuario existente
2. ✅ Debe cargar los datos en el formulario
3. ✅ Modificar el email a formato inválido → Debe mostrar error
4. ✅ Modificar el login a uno existente → Debe mostrar "Login ya en uso"
5. ✅ Hacer cambios válidos y guardar
6. ✅ Debe mostrar mensaje de éxito
7. ✅ Los cambios deben reflejarse en la tabla

#### Eliminar Usuario
1. ✅ Click en botón ❌ de un usuario
2. ✅ Debe mostrar confirmación
3. ✅ Al confirmar, debe mostrar mensaje de éxito en la lista
4. ✅ El usuario debe desaparecer de la tabla

---

### 2. **Pruebas de Validación - Productos**

#### Crear Producto - Validaciones Negativas
1. ✅ Navegar a Productos
2. ✅ Click en "➕ Nuevo"
3. ✅ Intentar guardar sin nombre → Debe mostrar error
4. ✅ Intentar guardar sin precio → Debe mostrar error
5. ✅ Ingresar precio negativo → Debe mostrar error
6. ✅ Ingresar stock negativo → Debe mostrar error

#### Crear Producto - Validación Positiva
1. ✅ Completar correctamente:
   - Producto: "Producto de Prueba"
   - Descripción: "Descripción del producto"
   - Stock: "10"
   - Precio: "99.99"
2. ✅ Click en "Guardar Producto"
3. ✅ Debe mostrar mensaje de éxito
4. ✅ El producto debe aparecer en la lista

#### Editar y Eliminar Producto
1. ✅ Click en ✏️ para editar → Debe funcionar igual que usuarios
2. ✅ Click en ❌ para eliminar → Debe funcionar igual que usuarios

---

### 3. **Pruebas de UX/UI**

#### Mensajes Visuales
1. ✅ Los errores se muestran en **rojo** con icono ⚠️
2. ✅ Los éxitos se muestran en **verde** con icono ✅
3. ✅ Los mensajes tienen botón × para cerrar
4. ✅ Los mensajes de éxito desaparecen solos después de 1.5 segundos
5. ✅ La página hace scroll al mensaje automáticamente

#### Campos Obligatorios
1. ✅ Los campos obligatorios tienen asterisco rojo (*)
2. ✅ Los campos tienen textos de ayuda (form-text)
3. ✅ Los placeholders muestran ejemplos de formato

#### Navegación
1. ✅ No hay recargas de página
2. ✅ Todo funciona con AJAX
3. ✅ Los formularios se ocultan al cancelar
4. ✅ La lista se refresca automáticamente tras crear/editar/eliminar

---

### 4. **Pruebas de Validación de Login (Importante)**

#### Verificación en Tiempo Real
1. ✅ Crear nuevo usuario con login "test123"
2. ✅ Intentar crear otro usuario con el mismo login "test123"
3. ✅ **Antes de enviar al servidor**, debe mostrar error: "Login ya en uso"
4. ✅ Cambiar el login a "test456"
5. ✅ Ahora sí debe permitir guardar

#### Verificación en Edición
1. ✅ Editar un usuario existente
2. ✅ **Sin cambiar el login**, modificar otro campo (ej: nombre)
3. ✅ Debe guardar sin problemas (no debe verificar el login propio)
4. ✅ Cambiar el login a uno existente
5. ✅ Debe mostrar error "Login ya en uso"

---

## 🎯 Escenarios de Prueba Específicos

### Escenario 1: Flujo Completo de Usuario
```
1. Buscar usuarios (campo vacío) → Ver todos
2. Buscar por nombre "javier" → Debe filtrar
3. Limpiar búsqueda → Mensaje de "utilice los campos"
4. Crear nuevo usuario con datos válidos → Éxito
5. Editar el usuario recién creado → Éxito
6. Eliminar el usuario → Confirmación + Éxito
```

### Escenario 2: Validaciones Email/Móvil
```
Emails VÁLIDOS:
  ✅ test@example.com
  ✅ usuario.nombre@dominio.es
  ✅ user123@test.co.uk

Emails INVÁLIDOS:
  ❌ test@
  ❌ @example.com
  ❌ test.example.com
  ❌ test @example.com

Móviles VÁLIDOS:
  ✅ 612345678
  ✅ 698765432
  ✅ 712345678

Móviles INVÁLIDOS:
  ❌ 123456789 (no empieza por 6,7,8,9)
  ❌ 61234567 (solo 8 dígitos)
  ❌ 6123456789 (10 dígitos)
  ❌ abcdefghi (letras)
```

### Escenario 3: Manejo de Errores del Servidor
```
1. Apagar el servidor (detener Apache/PHP)
2. Intentar crear usuario → Debe mostrar "Error de conexión"
3. Encender el servidor nuevamente
4. Intentar de nuevo → Debe funcionar
```

---

## ✅ Checklist Final antes de Entregar

- [ ] Todos los formularios tienen validaciones
- [ ] Todos los mensajes se muestran en pantalla (no alerts)
- [ ] La verificación de login funciona correctamente
- [ ] No hay errores en la consola del navegador (F12)
- [ ] No hay errores PHP en el servidor
- [ ] El código está limpio y comentado
- [ ] Los nombres de variables/funciones son descriptivos
- [ ] La interfaz es clara y usable
- [ ] Bootstrap está aplicado correctamente
- [ ] El patrón MVC se mantiene

---

## 🐛 Solución de Problemas

### Si algo no funciona:

1. **Abrir consola del navegador (F12)**
   - Ver errores JavaScript en la pestaña "Console"
   - Ver peticiones AJAX en la pestaña "Network"

2. **Verificar errores PHP**
   - Revisar logs de Apache/PHP
   - Ver respuestas del servidor en Network

3. **Verificar que todos los archivos se guardaron**
   - index.js modificado
   - CUsuarios.php modificado

4. **Limpiar caché del navegador**
   - Ctrl + Shift + R (recarga forzada)

---

## 📞 Contacto

Si tienes dudas sobre las funcionalidades implementadas, revisa:
- `CAMBIOS_IMPLEMENTADOS.md` - Documentación completa
- Comentarios en `index.js` - Explicación de cada función
- Comentarios en `CUsuarios.php` - Explicación de métodos

**¡Buena suerte con las pruebas!** 🚀
