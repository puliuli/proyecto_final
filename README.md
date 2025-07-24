
# Proyecto final 2025 / Talento Tech - API NODE

## Descripción
    Proyecto final Talento Tech- 2025
    Docente Jean Paul Ferreira
    Alumna Monteagudo Maria Paula

## Instalación

1. Clonar el repositorio
2. Instalar dependencias:

```bash
npm install
```

3. Configurar variables de entorno:

```bash
# Copiar el archivo de ejemplo y completar los datos requeridos
cp .env-example .env
```

Luego editar el archivo `.env` con los valores correspondientes para tu entorno.

4. Ejecutar en modo desarrollo:

```bash
npm run dev
```

## Documentación de la API

### Obtener todos los productos

- **GET** `/products`
- **Descripción:** Devuelve la lista de todos los productos.
- **Respuesta ejemplo:**

```json
[
  { "id": 1, "name": "producto 1", "price": 10, "category": "categoria 1" },
  { "id": 2, "name": "producto 2", "price": 30, "category": "categoria 2" },
  { "id": 3, "name": "producto 3", "price": 20, "category": "categoria 1" },]
```

### Obtener producto por ID

- **GET** `/products/:id`
- **Descripción:** Devuelve un producto específico por su ID.
- **Parámetros:**
  - `id` (path, requerido): ID del producto.
- **Ejemplo de uso:** `/products/1`
- **Respuesta ejemplo:**

```json
{ "id": 1, "name": "producto 1", "price": 10, "category": "categoria 1"}
```

### Crear un producto

- **POST** `/products`
- **Descripción:** Crea un nuevo producto.
- **Body (JSON):**

```json
{ "name": "Nuevo Producto", "price": 999, "category": "categoria 1" }
```

- **Respuesta ejemplo:**

```json
{ "id": 4, "name": "Nuevo Producto", "price": 999, "category": "categoria 1" }
```

### Actualizar un producto (PUT)

- **PUT** `/products/:id`
- **Descripción:** Actualiza completamente un producto existente.
- **Parámetros:**
  - `id` (path, requerido): ID del producto a actualizar.
- **Body (JSON):**

```json
{ "name": "Producto Actualizado", "price": 500 }
```

- **Respuesta ejemplo:**

```json
{ "id": 1, "name": "Producto Actualizado", "price": 500 }
```

### Actualizar parcialmente un producto (PATCH)

- **PATCH** `/products/:id`
- **Descripción:** Actualiza parcialmente un producto existente.
- **Parámetros:**
  - `id` (path, requerido): ID del producto a actualizar.
- **Body (JSON):** Solo los campos que se desean actualizar

```json
{ "price": 600 }
```

- **Respuesta ejemplo:**

```json
{ "id": 1, "name": "Camiseta Deportiva", "price": 600 }
```

### Eliminar un producto

- **DELETE** `/products/:id`
- **Descripción:** Elimina un producto por su ID.
- **Parámetros:**
  - `id` (path, requerido): ID del producto a eliminar.
- **Respuesta:** 204 No Content

## Códigos de estado

- `200` - OK: Operación exitosa
- `201` - Created: Recurso creado exitosamente
- `204` - No Content: Recurso eliminado exitosamente
- `400` - Bad Request: Datos de entrada inválidos
- `404` - Not Found: Recurso no encontrado

## Estructura del proyecto

```
src/
├── Controllers/
│   └── products.controller.js
├── Models/
│   └── Product.js
└── Routes/
    └── products.router.js
```

## Tecnologías utilizadas

- Node.js
- Express.js
- ES6 Modules