Clase 2.
  - `yarn init`
  - Habilitando ES6 en Node con @babel/register
  - Creando server
  - Crear Script:
    ```
      "scripts": {
        "start:dev": "nodemon src/server/index.js --exec babel-node --plugins transform-class-properties --ignore components --progress"
      }
    ```
  - Integrar con dotenv
