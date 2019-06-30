Clase 2.
  - `yarn init`
  - Habilitando ES6 en Node con @babel/register
    ```
    require('@babel/register')({
      ignore: [/(node_modules)/],
      presets: ['@babel/preset-env', '@babel/preset-react']
    });

    require('./server');
    ```
  - Creando server
  - Crear Script:
    ```
      "scripts": {
        "start:dev": "nodemon src/server/index.js --exec babel-node --plugins transform-class-properties --ignore components --progress"
      }
    ```
  - Integrar con dotenv

Clase 3.
  Configurando Webpack
    - Configurar Eslint
      - .eslintrc
    - Configurar Babel
      - .babelrc
    - Configurar Sass
    - Configurar Loaders de assets
      - Url's
      - Fonts

Clase 4.
  Vendors y Plugins
    - Configurar Vendor file
    - Configurar Plugins para HMR y Extraccion de assets  

Clase 5.
  - Integrando Webpack con Express

Clase 6.
  - Crear componente dummy
  - Crear anchor, initialState y rootReducer 
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

Clase 7.
  Redux Dev Tools

Clase 8.
  Sirviendo estilos

Clase 9.
  - Crear rutas

Clase 10. 
  ¿ Por que renderizar desde el servidor ?

Clase 11. 
  - Crear metodo de carga del React y las rutas
  - Crear metodo de renderizado

Clase 12.
  - Enseñar a validar con el `typeof window !== 'undefined'`

Clase 13.
  - Agregar metodo hydrate

Clase 14.
  - Reemplazar initialState por preloadedState
  - Hacer set del preloadedStateDesde el template

Clase 15.
  Instalar helmet

Clase 16.
  Validar en el entry

Clase 17. 
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
