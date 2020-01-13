## Update de dependencias en npm 
  
  En esta clase revisaremos las dependencias de nuestro proyecto y las actualizaremos a la ultima versión posible solo con un comando

  Para esto, lo primero que debemos hacer es verificar las dependencias que tenemos y su estado, para esto ejecutamos:
  
  `npm outdated`

  Podemos ver que hay una gran cantidad de dependencias a las que les falta actualizar, para poder actualizarlas solo debemos ejecutar:

  `npm update`

  Una ves la actualización esta hecha, debemos revisar que todo este en orden, lo que haremos es ejecutar el proyecto `npm run start` y como podemos observar nuestro proyecto esta actualizado y andando.

  Si quieres aprender mas al respecto, te recomiendo ver el curso de npm con nuestro profesor Oscar Barajas.

## Creación del servidor en Express
  
  En esta clase empezaremos a preparar toda la estructura de nuestro proyecto y comenzaremos a configurar varios archivos clave para que nuestro poryecto sea escalable y mas limpio.

  Lo primero que debemos hacer es tal cual como describimos en la clase de presentación del proyecto es separar la logica de nuestra aplicación de Frontend y la del servidor que vamos a crear mas adelante con express.

  Dentro de la carpeta `src` creamos una nueva carpeta llamada `frontend` y una segunda carpeta llamada `server`, ya con esto tenemos ambas logicas separadas y mas ordendas. 

  Ahora, lo siguiente que debemos hacer es crear un archivo `index.js` dentro de nuestra carpeta `server` y otro archivo llamado `server.js`. 

  Luego vamos a nuestra consola e instalamos la dependencia `@babel/register`:

  `npm install @babel/register` 

  Pero que hace este paquete ?  Bueno, la verdad es muy simple:
  Nos permite hacer bind en tiempo real de los presets de babe que nosotros necesitemos. 

  En este caso lo necesitamos por que del lado del servidor no podemos usar mucho ES6, solemos usar `require` y sintaxis un poco vieja. Pero, como vamos a necesitar leer archivos de ES6 ya que nuestro proyecto de React usa esta sintaxis y  aprovecharemos para poder escribir nuestro servidor con ES6.

  Luego de instalarla vamos a nuestro archivo `index.js` y llamamos nuestra redendencia:

  `require('@babel/register')`
  
  y luego le vamos a pasar una opcion para poder indicar que presets vamos a usar.

  ```
    require('@babel/register')({
      presets: ["@babel/preset-env", "@babel/preset-react"],
    });

    require('./server');
  ```

  Luego para poder comprobar que podemos usar ES6 vamos a crear nuetro servidor de express.

  Instalamos primero `npm install express dotenv`

  Y luego en nuestro archivo `server.js`:

  ```
    import express from 'express';

    const app = express();

    app.get('*', (req, res) => {
      res.send({ hello: 'express' });
    });

    app.listen(3000, (err) => {
      if (err) console.log(err);
      else console.log('Server running on Port 3000');
    });
  ```

  Y por ultimo  creamos nuestro script en el `package.json`

  `"start:dev": "node src/server/index"`

  Ejecutamos en consola `npm run start:dev` y podemos ver que nuestro servidor de express esta corriendo y devolviendo la respuesta correcta.

## Usando Nodemon y Dotenv

  Ya que tenemos nuestro servidor andando, nos encontramos con dos problemas:
  
  - El primero es que al momento de hacer cualquier cambio en el codigo tenemos que reiniciar manualmente nuestro servidor para poder ver reflejados nuestros cambios.

  Para arreglar esto solo debemos instalar una dependencia en nuestro entorno de desarrollo. 

  Esta dependencia se llam Nodemon. Esta dependencia reinicia por nosotros el servidor y nos facilita la vida al momento de trabajar con express. 

  La instalamos con `npm install nodemon --dev`

  Una vez instalada vamos a nuestro `package.json` y modificamos nuestro script del server.

  `"start:dev": "nodemon src/server/index"`

  Reinicamos nuestro servidor para que tome los cambios y hacemos cualquier modificacion en el servidor.

  Haremos un `console.log('Hola nodemon')` en el get que escribimos previamente y vemos como nuestro servidor se reinicia solo y muestra el cambio hecho.

  - El segundo problema que podriamos tener y esto es ya viendo hacia la escalabilidad de nuestro proyecto es tener variables de entorno para poder crear configuraciones personalizadas dependendiendo del entorno en el que estemos trabajando.

    Para esto lo primero que debemos hacer es instalar `dotenv`: 

    `npm install dotenv`

  Y luego decidiremos que variables de entorno deberiamos tener a este punto.

  Podemos ver que hay cosas que podrian cambiar dependendiendo del entorno, las dos principales son: *Nuestro puerto* y *Nuestro entorno*.

  Ya con las variables decididas lo que haremos es crear un archivo `.env` y las definiremos.

  ```
    ENV=development
    PORT=3000
  ```

  Para poder usar estas variables de entorno solo debemos ir a nuesto servidor e instanciarlos.

  En nuestro archivo `server.js` importamos `dotenv` y lo configuramos.

  ```
    import dotenv from 'dotenv';

    dotenv.config();
  ```
  Y luego extraemos las variables necesarias.

  `const { ENV, PORT } = process.env;`

  Para poder saber si en realidad estamos tomando estas configuraciones solo debemos implementarlas. 

  Indicamos el puerto y el entorno en el que estamos trabajando.
  
  console.log(`${ENV} Server running on Port ${PORT}`);

  Y revisamos nuestra consola.
  
## Integración de Webpack con Express 

  En esta clase comenzaremos a integrar webpack y express para que nuestro servidor pueda servir nuestra aplicación de frontend desde backend y asi poder aplicar Server Side Render con Express.

  Lo primero que haremos instalar dos dependencias que necesitaremos para integrar webpack y express. Estas son: `webpack-dev-middleware` y `webpack-hot-middleware`

  La primera nos permitira integrar express y webpack y la segunda aplicar Hot module replacement a nuestro entorno de desarrollo.

  Para instalarlas solo debemos usar:
  `npm install webpack-dev-middleware webpack-hot-middleware --dev`

  Luego procedemos a integrar estas dependencias en nuestro servidor de express solamente cuando estemos en nuestro entorno de desarrollo.

  ```
    if (ENV === 'development') {}
  ```

  Dentro de este if es en donde comenzaremos toda nuestra configuración, y para lograr esto debemos importar 4 cosas importantes. 

  - Webpack
  - Nuestra configuracion de webpack
  - El webpack-dev-middleware
  - Y el webpack-hot-middleware

  `import webpack from 'webpack';`

  ```
    const webPackConfig = require('../../webpack.config');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
  ```

  Ahora que las acabamos de importar podemos ver Eslint nos esta lanzando un error por que estamos usando require en nuestro archivo. Para ignorar este error y que no nos moleste el resaltado rojo solo debemos dejar nuestro cursos un par de segundos sobre el error y selecionar `quick-fix` alli desabilitamos esta regla para todo el archivo.
  
  Luego lo que tenemos que hacer es llamar las configuraciones de webpack en express

  ```
    const compiler = webpack(webPackConfig);
    const serverConfig = { port: PORT };
    app.use(webpackDevMiddleware(compiler, serverConfig));
    app.use(webpackHotMiddleware(compiler));
  ```

  Por ultimo vamos a nuestra configuración de webpack y en plugins indicamos que queremos usar `HotModuleReplacementPlugin`

  `new webpack.HotModuleReplacementPlugin()` e importamos webpack al tope del archivo.

  Ahora, vamos a nuestra consola y podremos ver que se esta haciendo build de nuestra app de React con webpack.

  Antes de terminar la clase arreglemos una ultima cosa, si vemos en nuestra consola, el output de webpack dice `Compiled with warnings.`

  Si subimos un poco nos encontraremos con que nos esta pidiendo una ultima configuración. El `mode` y si no lo indicamos va a tomar por defecto produccion. 

  Lo unico que debemos hacer es ir a nuestra configuracion de webpack y agregarlo. 

  `mode: process.env.NODE_ENV ? process.env.NODE_ENV : 'development',`

  Ahora verificamos en nuestra consola y ya compila todo sin alertas.

  Por ultimo y antes de verificar que todo esté bien vamos a instalar un ultimo paquete a nuestro entorno de desarrollo y aplicar una ultima configuracion a nuestro babel y webpack.

  Instalaremos `react-hot-loader` y lo agregaremos a la lista de plugins en nuestro archivo `.babelrc`

  `"plugins": ["react-hot-loader/babel"]`
  
  Para completar nuestra configuración lo unico que nos hace falta es agregar un pequeño cambio a nuestro entry de webpack:

  La cual podremos ver en los ejemplos de: `webpack-hot-middleware`

  `webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true`

  Si verificamos en nuestro navegador, podremos ver que aun nos falta servir el build que acabamos de construir.
  
  En la siguiente clase te enseñare a servir este build de manera sencilla y rapida.

## Servir React con Express 
  En esta clase aprenderas a servir el build que acabas de configurar todo desde express.

  Para comenzar lo primero que debes hacer es ir a la ruta que definimos en el servidor y en vez de enviar el `started: true`, ahora enviaremos codigo html.

  Para esto, tomaremos el html que previamente fue creado en la carpeta `public`

  ```
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <meta charset="utf-8" />
        <title>Platfix</title>
      </head>
      <body>
        <div id="app"></div>
      </body>
    </html>
  ```

  Y luego, iremos a nuestro archivo de webpack y removeremos el plugin `HtmlWebPackPlugin`
  
  Pero, si vamos a nuestro cliente podremos observar que aun no carga nuestra aplicación, esto se debe a que en el HTML no le estamos indicando que archivos vamos a cargar. Para resolver esto tenemos que hacer 2 cosas: 

  1. Ir a nuestra configuración de webpack y cambiar los nombres tanto del output file del bundle como del css.

  `assets/app.js`
  `assets/app.css`
  
  2. Ir al HTML que estamos respondiendo y agregar el llamado a nuestros archivos del build.

  Por ultimo vamos a quitar la configuración del *HtmlWebPackPlugin* en el webpack.

  Ahora, si vamos a nuestro navegador podremos ver que nuestra aplicacion esta cargando perfectamente!!

  Pero, si revisamos mas a fondo (desabilitando Javascript) podremos ver que aun no tiene SSR aplicado. Para poder aplicarlo primero debemos configurar React Router para el servidor y luego renderizar el app de react desde alli. 

## Abstrayendo React router, creando history y haciendo initialState mas accesible.

  En esta clase te enseñare a preparar las rutas para que puedan ser accesibles desde el servidor y a abstraer el initialState.

  Para esto tendremos que hacer un pequeño cambio en el archivo en donde llamamos nuestro Frontend.

  Instalaremos tres dependencias `history`, `react-router` y `react-router-config`  con esto le agregaremos un history a nuestro router y asi podremos refrescar entre rutas internas y no tener ningun problema.

  `npm install history react-router react-router-config`

  Y luego aplicaremos el history y definiremos un router al que le pasaremos la propiedad creada:
  `import { createBrowserHistory } from 'history';`
  `const history = createBrowserHistory();`
  `<Router history={history}>`

  Y por ultimo para terminar la configuracion y preparacion del router para el SSR debemos definir nuestras rutas desde el lado del servidor.

  Para esto debemos creamos un nuevo archivo llamado `react-router` y aqui definiremos todas nuestras rutas. 

  ```
    import Home from '../containers/Home';
    import Player from '../containers/Player';
    import Login from '../containers/Login';
    import Register from '../containers/Register';
    import NotFount from '../containers/NotFount';

    const routes = [
      {
        path: '/',
        exact: true,
        component: Home,
      },
      {
        path: '/player/:id',
        exact: true,
        component: Player,
      },
      {
        path: '/login',
        exact: true,
        component: Login,
      },
      {
        path: '/register',
        exact: true,
        component: Register,
      },
      {
        name: 'NotFount',
        component: NotFount,
      },
    ];

    export default routes;
  ```

  Por ultimo, abstraer el initalState es bastante sencillo, solamente debemos crear un archivo adicional y llamarlo desde alli.

  Creamos nuestro archivo `initalState.js` y dentro ponemos nuestro estado inicial con

  `export default {}`

  Luego llamamos este estado en el `index.js` del frontend y listo!

  Si vamos a nuestro navegador podremos ver que todo sigue funcionando igual, pero ahora viene lo bueno, en la siguiente clase te enseñare a construir la función principal para hacer el SSR con Express.

## Definicion de la función principal para realizar el renderizado desde el servidor
  
  Ya con todo el entorno preparado solo falta aplicar SSR, en esta clase comenzaremos a hacer la magia que hace posible el SSR.

  Lo primero que haremos es convertir el html que estamos enviando en la respuesta del servidor en una funcion que reciva un parametro y luego añadiremos el html que recibe justo en medio de las etiquetas div que tiene como anchor react.

  *Probamos* y vemos que todo sigue funcionando igual.

  Ahora, crearemos una función llamada *renderApp* en donde usaremos el renderToString, metodo necesario para poder renderizar una aplicación de react en un String y asi poder servirla desde el HTML que ya estamos enviando como respuesta.  

  Que vamos a importar?
  Nos iremos al archivo en donde cargamos react desde el lado del cliente y traeremos algunas cosas. 

  La diferencia que tendremos aca es: `renderToString`, el `StaticRouter` y llamaremos a la dependencia que habiamos instalado la clase anterior `'react-router-config`
  para traernos el metodo `renderRoutes`
  ```
    import React from 'react';
    import { renderToString } from 'react-dom/server';
    import { renderRoutes } from 'react-router-config';
    import { StaticRouter } from 'react-router-dom';
    import { Provider } from 'react-redux';
    import { createStore } from 'redux';
    import reducer from '../frontend/reducers';
    import initialState from '../frontend/initialState';
    import serverRoutes from '../frontend/routes/serverRoutes';
  ```

  Luego armaremos la respuesta muy parecida a como la tenemos del lado del cliente.

  Creamos nuestro Store con el reducer y el estado inicial que acabamos de traer y luego, 
  renderizaremos con renderToString nuestro app de react.

  Y ahora es momento de usar ese metodo olvidado al tope del archivo, el static router, con el haremos render del router estatico que definimos.
  ```
    const renderApp = (req, res) => {
      const store = createStore(reducer, initialState);
      const html = renderToString(
        <Provider store={store}>
          <StaticRouter>
            <Layout>
              {renderRoutes(serverRoutes)}
            </Layout>
          </StaticRouter>
        </Provider>
      );
      res.send(setResponse(html));
    };
  ```

  Una diferencia que tienen el BrowserRouter y el StaticRouter es que el StaticRouter debe recibir la ruta desde la cual se esta llamando.

  Se la agregamos: 

  `location={req.url}`

  Y recibe una 2da propiedad llamada `context` que puede ser un objeto vacio.

  context={{}}

  Y luego cambiamos nuestra ruta del server a: 

  `app.get('*', renderApp);`

  Hasta ahora no hay ningun cambio, y si vemos la consola nuestros estilos estan rompiendo el servidor, ya que no podemos cargar estilos desde el servidor. 

  Para esto instalaremos un pequeño paquete, no pesa mas de 4kb y nos hara la vida mucho mas facil, se llama: `ignore-styles`

  npm install `ignore-styles`

  Y la requerimos en el `index.js` de nuestro server.

  `require('ignore-styles');`

  Ahora, vayamos a nuestro cliente y deshabilitamos Javascript podremos comprobar que nuestro SSR funciona, Genial! Nuestro SSR funciona correctamente!

## Aplicando assets require hook

  En esta clase te enseñare a usar el assets require hook y por que usarlo en tus proyectos con SSR. 

  Si vamos a verificar podremos ver que hay algunas imagenes que se están rompiendo, inspeccionamos y vemos como se esta llamando a un objeto en vez de la url de la imagen.

  El `assets-requir-hook` permite a los archivos requeridos en node a tener un determinado tipo de extensión. Para instalarlo solo debemos:

  `npm install asset-require-hook`

  Y para usarlo debemos ir a la funcion `index.js` de nuestro servidor.

  ```
    require('asset-require-hook')({
      extensions: ['jpg', 'png', 'gif'],
      name: '/assets/[hash].[ext]',
    });
  ```

  Y ahora si vamos a verificar nuestra aplicacion en el navegador podremos ver que nuestros assets son llamados correctamente.

## Hydrate y estado de Redux desde Express

  Ahora que tenemos nuestra aplicación renderizada desde el servidor, es momento de usar Hydrate, hydrate nos permite *hidratar* todos los eventos y funcionalidades que solo son accesibles desde el lado del cliente en nuestra aplicación de React.

  Para hacer esto solo debemos ir a nuestro cliente y cambiar la funcion *render* por *hydrate*, ya con esto estaremos pidiendo a nuestra aplicación que cuando entre en el cliente haga hidratación de las funcionalidades que ya mencionamos. Esto mejorara bastante el performance de nuestra aplicación por que ya no tiene que hacer doble trabajo.

  Ahora, si nos damos cuenta estamos definiendo dos veces el mismo estado de redux, esto es ineficiente si nos ponemos a analizar que en algun punto vamos a necesitar hacer peticiones al servidor para poder traer las peliculas que necesitemos. 

  La manera logicamente correcta es pedir el estado inicial una vez en el servidor y enviarlo al cliente para poder usarlo.

  Llevando esto a codigo sería algo asi:

  Justo debajo de donde transformamos nuestro componente en un string vamos a crear una constante llamada *preloadedState* y a esta le vamos a asignar el state del store que acabamos de definir. 

  `const preloadedState = store.getState();`

  Y luego vamos a pasarle este *preloadedState* a la funcion *setResponse*

  `res.send(setResponse(html, preloadedState));`

  Y por ultimo tenemos que enviar a nuestro cliente el estado. Esto lo haremos con la ayuda de los recipes de *redux*

  Vamos a `https://redux.js.org/recipes/server-rendering/`

  Y copiamos

  ```
    <script>
      window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
        /</g,
        '\\u003c'
      )}
    </script>
  ```

  Vamos al cliente y verificamos que se pueda acceder desde el window y procedemos a usarlo en nuestro Frontend.

  `const preloadedState = window.__PRELOADED_STATE__;`

  Y cambiamos el initialState usado en el store del cliente para usar el precargado
  Luego debemos eliminarlo para que el usario no pueda acceder de manera facil al estado.

  Lo eliminamos con:

  `delete window.__PRELOADED_STATE__;`

  Vamos a verificar y podremos ver que todo sigue funcionando con el estado enviado desde el lado del servidor y sin exponer nuestros datos en la consola.

## Configurando nuestro servidor para producción
  Para configurar nuestro servidor para producción solo tenemos que hacer unos pequeños cambios, ya que al momento de configurar nuestro dotenv nos adelantamos un poco.

  Lo primero que debemos hacer es definir un directorio publico para que nuestro build de frontend sea almacenado alli.

  ```app.use(express.static(`${__dirname}/public`));```

  Ya con el directorio publico definido, lo siguiente es apoyarnos de una libreria que nos ayudara a mantener nuestra aplicación segura. 

  Esta aplicación se llama *Helmet* y nos provee de ciertas configuraciones super importantes.

  Para instalarla: `npm install helmet`

  Y para usarla la importamos:

  `import helmet from 'helmet';`

  Y luego agregamos un else statement en el servidor para que agregue ciertas configuraciones como: 

  ```
    app.use(helmet());
    app.use(helmet.permittedCrossDomainPolicies());
    app.disable('x-powered-by');
  ```

  Por ultimo vamos a nuestro `.gitignore` y vamos a agregar nuestra carpeta publica

## Configurando webpack para producción

  Ya que tenemos nuestro servicio de SSR andando, es momento de hacer ciertas configuraciones para poder llevarlo a producción de manera sencilla.

  Lo primero que debemos hacer es limpiar nuestro `package.json` de scripts que ya no se usaran.

  Quitamos el script de `start` y modificamos el script de `build` por: 

  `"build": "webpack-cli --config webpack.config.js --colors"`

  Si vamos a la consola y ejecutamos este script podremos notar que el resultado del app lo envia a `dist` y eso no nos sirve por que nuestro servidor lo leera de la carpeta `public` que creamos. 

  Para darle el destino correcto primero eliminaremos `dist` y `public` del root de nuestro proyecto. 

  Luego vamos a nuestra configuración de webpack y lo modificamos para que tome ciertas configuraciones dependiendo del entorno en el que estemos.

  Importamos `dotenv` y lo configuramos.

  Luego definimos una constante que nos ayude a determinar si estamos en desarrollo:

  `const isDev = (process.env.ENV === 'development');`

  Cambiamos el modo de webpack a: 

  `mode: isDev ? 'development' : 'production',`

  Cambiamos el entry para que agregue HMR solo cuando estemos en desarrollo, pero tambien haremos un pequeño refactor a la forma en la que se llama.

  ```
    const entry = ['./src/frontend/index.js'];

    if (isDev) entry.push('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true')
  ```

  Tambien cambiaremos el *path* del *output* a 
  `path: isDev ? '/' : path.resolve(__dirname, 'src/server/public'),`

  Ya que tenemos esta configuración lista, es momento de probar que todo funcione como debería.

  Vamos a nuestro `.env` y cambiemos el entorno a *production*

  Luego ejecutamos: `npm run build`

  Y posteriormente ejecutamos en consola: `node src/server`

  Si vamos a nuestro navegador podemos verificar que todo se ejecutó de manera perfecta!
