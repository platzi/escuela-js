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
  Demostrar que el sitio no tiene SSR en este punto

Clase 10.
  Agregando variables de sass desde webpack
  ```
  {
    loader: 'sass-loader',
    options: {
      data: `@import "${path.resolve(__dirname, 'src/frontend/assets/styles/vars.scss')}";`,
    },
  },
  ```

Clase 11.
  - Aplicando history y creando rutas para el servidor
    - Instalar: 
    `yarn add history`
    - Importar
      ```
        import { Router } from 'react-router';
        import { createBrowserHistory } from 'history';
      ```
     Definir: `const history = createBrowserHistory();`
    - Hacer Wrapper:
    `<Router history={history}>`

Clase 12. 
  Haciendo initialState accesible y configurando redux dev tools
  - URL
    https://github.com/zalmoxisus/redux-devtools-extension
  - Importar applyMiddleware, compose
    `import { createStore, compose } from 'redux';`
  - Creando el composeEnhancers
    `const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;`
  - Agregar el compose enhancers
    `composeEnhancers()`

Clase 13.
  - Crear metodo de carga del React y las rutas
    El static router es un enrutador que nunca cambia, es importante en el server side render por que al ser estatico la ruta de nuestro app no va a cambiar.

    ```
    import React from 'react';
    import { renderToString } from 'react-dom/server';
    import { createStore } from 'redux';
    import { Provider } from 'react-redux';
    import { StaticRouter } from 'react-router';
    import { renderRoutes } from 'react-router-config';
    import Routes from '../../frontend/routes/serverRoutes';
    import render from '../render';
    import Layout from '../../frontend/components/Layout';
    import reducer from '../../frontend/reducers';
    import initialState from '../../frontend/initialState';

    const main = (req, res, next) => {
      try {
        const store = createStore(reducer, initialState);
        const html = renderToString(
          <Provider store={store}>
            <StaticRouter
              location={req.url}
              context={{}}
            >
              <Layout>
                {renderRoutes(Routes)}
              </Layout>
            </StaticRouter>
          </Provider>,
        );
        res.send(render(html));
      } catch (err) {
        next(err);
      }
    };

    export default main;
    ```
  - Crear metodo de renderizado
    const render = (html) => {
    ```
    return (`
      <!doctype html>
        <html>
          <head>
            <title>Platzi Video</title>
            <link rel="stylesheet" href="assets/app.css" type="text/css"/>
          </head>
          <body>
            <div id="app">${html}</div>
            <script src="assets/app.js" type="text/javascript"></script>
            <script src="assets/vendor.js" type="text/javascript"></script>
          </body>
      </html>
    `);
  };

  export default render;
  ```

Clase 14.
  - Enseñar a validar con el `typeof window !== 'undefined'`

Clase 15.
  - Agregar metodo hydrate
    Es parecido al metodo `render` pero en este caso es usado para hidratar el contenido previamente renderizado a string con `renderToString`.

    Que hidrata ?
    Eventos y cualquier otra cosa que no exista del lado del servidor.
  - Estado de Redux desde Express
      https://redux.js.org/recipes/server-rendering

    - Enviar preloadedState  en el metodo `render` con 
      `const preloadedState = store.getState();`
  
    - Agregar el preloadedState en el template
      ```
      <script>window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}</script>
      ```
  - En el frontend
    Quitar el initialState y agregar: 
    `const preloadedState = window.__PRELOADED_STATE__;`
Clase 16.
  https://helmetjs.github.io/
  Instalar helmet
  `yarn add helmet`
  ```
    console.log('Loading production configs');
    app.use(helmet());
    app.use(helmet.permittedCrossDomainPolicies());
    app.disable('x-powered-by');
  ```
  `x-powered-by` evita que se pueda reconocer que nuestro servidor esta hecho en express.

Clase 17.
  - Validar el devTools en el cliente
    `if (process.env.NODE_ENV === 'production') composeEnhancers = compose;`
  - Validar webpack
    ```
      const dotenv = require('dotenv');
      dotenv.config();
    ```
    Parar y explicar los devtools por encima
      https://webpack.js.org/configuration/devtool/
    ```
    devtool: process.env.NODE_ENV === 'production' ?
      'cheap-module-eval-source-map' : 'cheap-source-map',
    ```
    ```
      mode: process.env.NODE_ENV ? process.env.NODE_ENV : 'development',
    ```
    ```
      path: process.env.NODE_ENV === 'production' ?
        path.join(process.cwd(), './src/server/public') : '/',
    ```
    Parar y aqui agregar el: 
      `app.use(express.static(`${__dirname}/public`));`
    - Agregar el terser plugin: 
      https://github.com/webpack-contrib/terser-webpack-plugin
      ```
        const TerserPlugin = require('terser-webpack-plugin');

        module.exports = {
          optimization: {
            minimizer: [new TerserPlugin()],
          },
        };
      ```
Clase 18. 
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
