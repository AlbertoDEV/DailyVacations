# 📜 Presentación del Proyecto: DailyVacations

## 💡 Concepto General

**DailyVacations** es una **aplicación web para la creación de álbumes de fotos online**, diseñada para ser una plataforma segura y robusta donde los usuarios pueden guardar y organizar los recuerdos de sus viajes.

La aplicación permite a cada usuario registrarse, crear álbumes personalizados para cada una de sus vacaciones y subir fotos organizadas por días. Su arquitectura backend está construida con tecnologías modernas y fiables, garantizando la escalabilidad y la correcta gestión de los datos.

---

## ⚙️ Características Técnicas y Dependencias

| Componente | Tecnologías/Archivos Principales | Descripción |
| :--- | :--- | :--- |
| **Backend** | `Java 17`, `Spring Boot`, `Spring Security`, `Maven` | Construido sobre el ecosistema de Spring, proporciona un API RESTful seguro para la gestión de usuarios, álbumes y fotos. |
| **Frontend** | `HTML`, `CSS`, `JavaScript`, `Thymeleaf` | La interfaz de usuario es una aplicación web clásica renderizada en el servidor, utilizando Thymeleaf para integrar dinámicamente los datos del backend. |
| **Base de Datos** | `PostgreSQL` | Utiliza una base de datos PostgreSQL. La aplicación está configurada para operar en un **esquema dedicado** (`dailyvacations`), asegurando el aislamiento de los datos. |
| **Persistencia**| `Spring Data JPA`, `Hibernate` | Gestiona el acceso a los datos y el mapeo objeto-relacional, simplificando las operaciones con la base de datos. |
| **Internacionalización** | `i18n/messages_es.properties`, `i18n/messages_en.properties` | La aplicación soporta múltiples idiomas (Español e Inglés) para la interfaz de usuario. |

---

## 🖥️ Estructura de la Aplicación

La aplicación se organiza en varias vistas clave que permiten un flujo de usuario lógico e intuitivo.

### 1. Página de Inicio y Autenticación

*   **Propósito:** Dar la bienvenida a los usuarios y gestionar el acceso.
*   **Contenido:** Muestra una página de inicio pública y proporciona formularios para el **registro de nuevos usuarios** y el **inicio de sesión** de usuarios existentes. El acceso a las funcionalidades principales está protegido por `Spring Security`.

### 2. Vista Principal del Usuario (Dashboard)

*   **Propósito:** El centro de operaciones del usuario una vez que ha iniciado sesión.
*   **Visualización:** Muestra una lista de todos los álbumes creados por el usuario. Desde aquí, se puede acceder a cada álbum individual o crear uno nuevo.

### 3. Vista de Álbum

*   **Propósito:** Permite visualizar y gestionar el contenido de un álbum específico.
*   **Organización:** Las fotos dentro de un álbum están organizadas por días. Los usuarios pueden añadir nuevos días y subir fotos a cada uno de ellos.
*   **Navegación:** La interfaz simula un álbum físico, permitiendo al usuario "pasar las páginas" para ver los diferentes días.

### 4. Formulario de Creación y Edición

*   **Propósito:** Permite la inserción y modificación de datos.
*   **Formularios:** Existen formularios dedicados para crear nuevos álbumes, añadir días y subir fotos con sus respectivas descripciones.
*   **Funcionamiento:** Toda la información enviada a través de estos formularios se persiste de forma segura en la base de datos PostgreSQL.

---

## 🚀 Flujo de Trabajo del Usuario

El uso de la aplicación sigue un proceso sencillo:

1.  **Registro/Inicio de Sesión:** Un nuevo usuario se registra o un usuario existente inicia sesión.
2.  **Creación de un Álbum:** Desde el panel principal, el usuario crea un nuevo álbum para sus vacaciones, asignándole un nombre y una descripción.
3.  **Añadir Días y Fotos:** Dentro del álbum, el usuario añade un "día" y sube las fotos correspondientes a ese día, junto con descripciones opcionales.
4.  **Visualización:** El usuario puede navegar por su álbum, viendo las fotos y textos organizados cronológicamente.
5.  **Cierre de Sesión:** El usuario cierra la sesión de forma segura.

---

# ⚙️ Instalación y Ejecución

## 🧩 Explicación

Para ejecutar este proyecto, necesitas un entorno de desarrollo con Java y Maven, así como una instancia de PostgreSQL. La aplicación se conectará a la base de datos y creará automáticamente el esquema y las tablas necesarias en el primer arranque.

## 🚀 Instalación

Sigue estos pasos para poner en marcha el proyecto en tu máquina local:

1.  **Requisitos Previos**
    *   Java Development Kit (JDK) 17 o superior.
    *   Apache Maven.
    *   Una base de datos PostgreSQL en funcionamiento.

2.  **Clonar el Repositorio**

    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd dailyvacations
    ```

3.  **Configurar la Conexión a la Base de Datos**

    La aplicación está diseñada para recibir las credenciales de la base de datos a través de variables de entorno. Para un desarrollo local, puedes añadirlas directamente al final del archivo `src/main/resources/application.properties`:

    ```properties
    # Ejemplo de configuración para base de datos local
    spring.datasource.url=jdbc:postgresql://localhost:5432/nombre_tu_db
    spring.datasource.username=tu_usuario
    spring.datasource.password=tu_contraseña
    ```

4.  **Compilar el Proyecto**

    Usa Maven para compilar el proyecto. Este comando descargará las dependencias y empaquetará la aplicación.

    ```bash
    mvn clean install
    ```

5.  **Ejecutar la Aplicación**

    Una vez compilado, puedes iniciar el servidor de Spring Boot:

    ```bash
    java -jar target/dailyvacations-1.0.0-SNAPSHOT.jar
    ```

    La aplicación se iniciará en `http://localhost:8080`.

---

## 💾 Cómo se guardan los datos

Esta aplicación utiliza una base de datos PostgreSQL para la persistencia de datos.

- **Creación Automática:** En el primer arranque, la aplicación ejecutará un script (`schema.sql`) para crear el esquema `dailyvacations`.
- **Gestión de Tablas:** Inmediatamente después, `Hibernate` creará automáticamente todas las tablas necesarias (`users`, `albums`, `days`, `photos`) dentro de ese esquema.
- **Aislamiento:** Todas las operaciones de la base de datos están contenidas dentro del esquema `dailyvacations`, evitando conflictos con otras aplicaciones.
