# --- Etapa 1: Construcción (Builder) ---
# Usamos una imagen oficial de Maven que incluye el JDK 17. Le ponemos el alias "builder".
FROM maven:3.9-eclipse-temurin-17 AS builder

# Establecemos el directorio de trabajo dentro del contenedor.
WORKDIR /app

# Copiamos solo el `pom.xml` primero.
# Esto es una optimización clave: Docker cacheará esta capa. Mientras el `pom.xml` no cambie,
# no se volverán a descargar las dependencias, haciendo las builds futuras mucho más rápidas.
COPY pom.xml .

# Descargamos todas las dependencias definidas en el `pom.xml`.
RUN mvn dependency:go-offline

# Ahora copiamos el resto del código fuente del proyecto.
COPY src ./src

# Construimos la aplicación. Maven compilará el código y creará el JAR ejecutable en `target/`.
# `package -DskipTests` empaqueta la aplicación y salta la ejecución de tests,
# lo cual es común en entornos de CI/CD para acelerar la construcción del artefacto.
RUN mvn package -DskipTests

# --- Etapa 2: Ejecución (Runtime) ---
# Usamos una imagen base mucho más ligera que solo contiene el Java Runtime Environment (JRE).
# Esto reduce drásticamente el tamaño final de la imagen, mejorando la seguridad y la eficiencia.
FROM eclipse-temurin:17-jre-jammy

WORKDIR /app

# Copiamos únicamente el JAR ejecutable desde la etapa "builder".
# No necesitamos el código fuente, ni Maven, ni el JDK en la imagen final.
COPY --from=builder /app/target/dailyvacations-1.0.0-SNAPSHOT.jar ./app.jar

# Exponemos el puerto en el que la aplicación se ejecuta.
EXPOSE 8080

# El comando final para arrancar la aplicación cuando el contenedor se inicie.
CMD ["java", "-jar", "app.jar"]
