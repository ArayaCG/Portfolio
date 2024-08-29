# Portfolio

Este es un portfolio personal que muestra mis proyectos y experiencia. El backend está desarrollado utilizando varias tecnologías modernas para asegurar un rendimiento eficiente y una fácil gestión.

## Tecnologías Utilizadas

- **Multer**: Middleware para manejar la carga de archivos en el backend.
- **Cloudinary**: Servicio para la gestión y almacenamiento de imágenes en la nube.
- **PostgreSQL**: Sistema de gestión de bases de datos relacional utilizado para almacenar la información de los proyectos.
- **TypeScript**: Lenguaje que añade tipado estático a JavaScript, utilizado para el desarrollo del backend.
- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express**: Framework para la creación del servidor y gestión de rutas.
- **TypeORM**: ORM para interactuar con la base de datos PostgreSQL.
- **Nodemailer**: Para el envío de correos electrónicos desde el backend.

## Instalación

1. Clona este repositorio:
   ```bash
   git clone <https://github.com/ArayaCG/Portfolio.git>
   ```

2. Navega al directorio del proyecto:
   ```bash
   cd Portfolio
   ```

3. Instala las dependencias:
   ```bash
   npm install
   ```

4. Crea un archivo `.env` basado en el archivo `.env.example` y configura tus credenciales de Cloudinary y otros parámetros necesarios.

5. Ejecuta las migraciones (si es necesario):
   ```bash
   npm run typeorm migration:run
   ```

6. Inicia el servidor:
   ```bash
   npm start
   ```

## Uso

Este backend permite manejar proyectos y mensajes de contacto a través de una API RESTful. Puedes realizar las siguientes operaciones:

### Proyectos

- **Obtener todos los proyectos**: `GET /projects`
- **Crear un nuevo proyecto**: `POST /projects`
  - **Cuerpo de la solicitud**:
    ```json
    {
      "name": "Nombre del Proyecto",
      "description": "Descripción del Proyecto",
      "url": "URL del Proyecto",
      "image_url": "URL de la Imagen (opcional)"
    }
    ```
- **Eliminar un proyecto**: `DELETE /projects/:id`

### Mensajes de Contacto

- **Obtener todos los mensajes de contacto**: `GET /contactMessage`
- **Crear un nuevo mensaje de contacto**: `POST /contactMessage`
  - **Cuerpo de la solicitud**:
    ```json
    {
      "name": "Nombre del Remitente",
      "email": "Correo Electrónico del Remitente",
      "message": "Mensaje"
    }
    ```

## Contribuciones

Si deseas contribuir a este proyecto, por favor abre un pull request o envía un issue con tus sugerencias.
