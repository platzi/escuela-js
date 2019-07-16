Clase 2. 
  - ¿Qué es SSR Server Side Rendering?
    - Client Side Rendering
      El client side rendering es en pocas palabras es cuando el cliente (Nuestro navegador)
      ejecuta todo nuestra aplicación. El HTML inicial se carga primero y luego es injectada nuestra
      aplación

    - El Server Side Render es cuando nuestra aplicación envia el HTML inicial con cierto código de nuestra aplicación previamente convertido en string para que este disponible de manera mucho mas rápida y asi el usuario pueda recibir respuesta mucho mas rapido del contenido del sitio. 

      - Primera carga mas rápida
      - Permite un SEO mas eficiente

    Next.js
      Es un framework de react que nos permite realizar aplicaciones que rendericen en el servidor sin mucha configuración.

Clase 3.

  - Babel
    Babel es una herramienta principalmente usada para convertir codigo hecho en ECMAScript 2015 en adelante a una version de Javascript compatible con navegadores viejos y modernos
    https://babeljs.io/docs/en/
  
  - Express
    Es un Framework de Node que nos permite realizar aplicaciones web o crear servicios para 
    consumir por otas aplicaciones por ejemplo un API

  - React.js
    Es una libreria creada por Facebook que nos permite crear de manera sencilla componentes interactivos y reutilizables para interfaces de usuario.

Clase 4.
  - Habilitando ES6 en Node con @babel/register
    ```
    require('@babel/register')({
      ignore: [/(node_modules)/],
      presets: ['@babel/preset-env', '@babel/preset-react']
    });

    require('./server');
    ```

    Que es @babel/register ? 
    
    Es un paquete que mediante el hook de require nos permite hacer un bind en tiempo real de ciertos modulos de babel para que nuestra servidor pueda usar ECMAScript 2015 o superior sin mucha configuración,

  - Crear server.js
    ```
    import fs from 'fs';
    import express from 'express';
    import dotenv from 'dotenv';

    dotenv.config();

    const ENV = process.env.NODE_ENV;
    const app = express();
    const PORT = process.env.PORT || 3000;

    app.get('*', (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.send({ maintance: true });
    });

    app.listen(PORT, (err) => {
      if (err) console.log(err);
      console.log(`Server running on port ${PORT}`);
    });

    ```
  - Crear Script:
    ```
      "scripts": {
        "start:dev": "nodemon src/server/index.js --exec babel-node --plugins transform-class-properties --ignore components --progress"
      }
    ```

Clase 5.
  Configurando Webpack
    Eslint es una herramienta que nos permite hacer Lint (señalar o indicar) partes de nuestro codigo qie no cumple con ciertos estándares previamente definidos en nuestro .eslintrc

    - Configurar Eslint
      - .eslintrc
Clase 6.
  Configurando Webpack
    - Configurar Babel
      - .babelrc
    - Configurar Sass
      - postcss.config.js

Clase 7.
  Vendors y Plugins
    - Configurar Vendor file
    - Configurar Plugins para HMR y Extraccion de assets  

Clase 8.
  - Integrando Webpack con Express

Clase 9.
  - Enviar html en la ruta
    ```
    res.send(`
      <!doctype html>
        <html>
          <head>
            <title>Platzi Video</title>
            <link rel="stylesheet" href="assets/app.css" type="text/css"/>
          </head>
          <body>
            <div id="app"></div>
            <script src="assets/app.js" type="text/javascript"></script>
            <script src="assets/vendor.js" type="text/javascript"></script>
          </body>
      </html>
    `);
    ```

Clase 10.
  Redux Dev Tools

Clase 11.
  Sirviendo estilos

Clase 12.
  - Crear rutas

Clase 13. 
  ¿ Por que renderizar desde el servidor ?

Clase 14. 
  - Crear metodo de carga del React y las rutas
  - Crear metodo de renderizado

Clase 15.
  - Enseñar a validar con el `typeof window !== 'undefined'`

Clase 16.
  - Agregar metodo hydrate

Clase 17.
  - Reemplazar initialState por preloadedState
  - Hacer set del preloadedStateDesde el template

Clase 18.
  Instalar helmet

Clase 19.
  Validar en el entry

Clase 20. 
  - Compresion de assets
  - Validacion en express
  ```
  app.get('*.js', (req, res, next) => {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    next();
  });

  app.get('*.css', (req, res, next) => {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    next();
  });
  ```

Clase 18.
  Preparando webpack para el server

Clase 19. 
  Configurando hashes

Clase 20.
  - Moviendo archivos
  - Tener en cuenta que assets ahora ira dentro de frontend.

Clase 21.
  - Agregar Vars por defecto
    ```
    {
      loader: 'sass-loader',
      options: {
        data: `@import "${path.resolve(__dirname, 'src/frontend/assets/styles/vars.scss')}";`,
      },
    },
    ```

Clase 22.
  Explicar el asset-require-hook
  https://www.npmjs.com/package/asset-require-hook
  ```
  require('asset-require-hook')({
    extensions: ['jpg', 'png', 'gif'],
    name: '/assets/[hash].[ext]',
  });

  ```
