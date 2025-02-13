# API de Envío de Correo Electrónico con Express.js

Este proyecto implementa una API sencilla utilizando Express.js para gestionar el envío de correos electrónicos.

## Tabla de Contenidos

- [Descripción General](#descripcion-general)
- [Tecnologías Utilizadas](#tecnologias-utilizadas)
- [Instalación](#instalacion)
- [Uso](#uso)
- [Endpoints](#endpoints)
- [Contribución](#contribucion)
- [Licencia](#licencia)
- [Contacto](#contacto)

## Descripción General

La API proporciona dos endpoints:

-   **GET /**: Endpoint de bienvenida que devuelve un mensaje.
-   **POST /send**: Endpoint principal para enviar correos electrónicos. Recibe datos de usuario (nombre, email, teléfono, contraseña), valida la información, y si el nombre es "franklim", envía un correo electrónico de bienvenida con los detalles proporcionados.

## Tecnologías Utilizadas

-   **Node.js**: Entorno de ejecución de JavaScript del lado del servidor.
-   **Express.js**: Marco web para Node.js.
-   **Nodemon**: Herramienta para reiniciar automáticamente el servidor durante el desarrollo.
-   **Body-parser**: Middleware para analizar los cuerpos de las solicitudes entrantes.
-   **Dotenv**: Módulo para cargar variables de entorno desde un archivo .env.
-   **Nodemailer**: Módulo para enviar correos electrónicos.

## Instalación

1.  Clona este repositorio: `git clone <URL_del_repositorio>`
2.  Instala las dependencias: `npm install express nodemon body-parser dotenv nodemailer`
3.  Crea un archivo `.env` en la raíz del proyecto y configura tus variables de entorno, como las credenciales de correo electrónico.
4.  Configura las credenciales de correo electrónico en el código.

## Uso

1.  Inicia el servidor: `nodemon index.js`
2.  Accede a la API a través de Postman o similar.

## Endpoints

-   **GET /**

    -   Respuesta:

    ```json
    {
    "mensaje": "bienvenidos"
    }
    ```

-   **POST /send**

    -   Datos de entrada (body):

    ```json
    {
    "nombre": "franklim",
    "email": "[dirección de correo electrónico eliminada]",
    "telefono": "1234567890",
    "password": "contraseña123"
    }
    ```

    -   Respuesta (éxito):

    ```json
    {
    "message": "Correo enviado con éxito",
    "result": {
    // ... detalles del envío ...
    }
    }
    ```

    -   Respuesta (error):

    ```json
    {
    "error": "Todos los campos son requeridos."
    }
    ```

## Contribución

Si deseas contribuir, por favor abre un "issue" o envía un "pull request".

## Licencia

Este proyecto se distribuye bajo la licencia [especificar licencia].

## Contacto

Franklim de Jesus Muñoz Valverde - +57 302 213 0374

**Recuerda reemplazar `<URL_del_repositorio>` y `[especificar licencia]` con la información correcta.**

Este README.md actualizado incluye las tecnologías utilizadas, los pasos de instalación con npm y tu información de contacto. ¡Espero que te sea aún más útil!
