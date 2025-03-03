# Instalación del Proyecto

Sigue los pasos a continuación para instalar y ejecutar el proyecto correctamente.

## Instalación
1. **Clonar el repositorio**
   ```sh
   git clone <URL_DEL_REPO>
   cd <NOMBRE_DEL_REPO>
   ```

2. **Instalar dependencias**
   ```sh
   npm install
   ```
   > Si hay problemas con las dependencias, borrar las carpetas `node_modules` en la raíz y en `frontend`, luego ejecutar `npm install` de nuevo.

3. **Configurar el backend**
   - Copiar el archivo de configuración:
     ```sh
     cp backend/src/main/resources/application.example.properties backend/src/main/resources/application.properties
     ```
   - Editar `backend/src/main/resources/application.properties` y añadir tu contraseña de la base de datos.
   - Copiar el archivo `.env`:
     ```sh
     cp backend/.env.example backend/.env
     ```

---

## Ejecución del Proyecto

### Iniciar backend y frontend por separado:
#### Iniciar el backend
```sh
npm run backend
```

#### Iniciar el frontend (en otra terminal)
```sh
npm run frontend
```

- El **frontend** estará disponible en: `http://localhost:8081`
- El **backend** se ejecutará en: `http://localhost:8080`
- Para verificar si la base de datos funciona, ir a: `http://localhost:8080/usuarios` y comprobar que no da error.

#### Abrir Android Studio y correr la app en un emulador (opcional)
```sh
npm run android:studio
```

---

## Solución de Problemas
- Si hay errores con dependencias, ejecutar:
  ```sh
  rm -rf node_modules frontend/node_modules package-lock.json frontend/package-lock.json
  
  npm install
  ```
- Verificar que la base de datos esté en funcionamiento y que las credenciales sean correctas en `application.properties`.
- Si el backend no inicia, asegurarse de tener **Java 17** y **Maven** instalados.

---

¡Listo! Ahora puedes desarrollar y probar tu aplicación. 🚀
