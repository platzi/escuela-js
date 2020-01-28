# Server Side Render Course

- [Introducción y prensentación del curso](#introducci-n-y-prensentaci-n-del-curso)
- [Requerimientos mínimos](#requerimientos-m-nimos)
- [Presentación del proyecto del curso](#presentaci-n-del-proyecto-del-curso)
- [Babel, Express y React](#babel--express-y-react)
- [¿Qué es SSR Server Side Rendering?](#-qu--es-ssr-server-side-rendering-)
- [Update de dependencias en npm](#update-de-dependencias-en-npm)
- [Creación del servidor en Express](#creaci-n-del-servidor-en-express)
- [Usando Nodemon y Dotenv](#usando-nodemon-y-dotenv)
- [Integración de Webpack con Express](#integraci-n-de-webpack-con-express)
- [Servir React con Express](#servir-react-con-express)
- [Abstrayendo React router, creando history y haciendo initialState mas accesible.](#abstrayendo-react-router--creando-history-y-haciendo-initialstate-mas-accesible)
- [Definicion de la función principal para realizar el renderizado desde el servidor](#definicion-de-la-funci-n-principal-para-realizar-el-renderizado-desde-el-servidor)
- [Aplicando assets require hook](#aplicando-assets-require-hook)
- [Hydrate y estado de Redux desde Express](#hydrate-y-estado-de-redux-desde-express)
- [Configurando nuestro servidor para producción](#configurando-nuestro-servidor-para-producci-n)
- [Configurando webpack para producción](#configurando-webpack-para-producci-n)
- [Optimización del Build](#optimizaci-n-del-build)
- [Aplicar hashes a el nombre de nuestros builds](#aplicar-hashes-a-el-nombre-de-nuestros-builds)

## Introducción y prensentación del curso
  Hola, bienvenido al curso de Server Side Rendering con Express de la escuela de Javascript de Platzi, a lo largo de toda la escuela de javascript aprendiste un monton de cosas que van a asegurar tu futuro como profesional, cosas como:

  1.- Configurar tu entorno de desarrollo
  2.- Maquetación y buenas practicas al momento de hacer CSS
  3.- Fundamentos y Javascript Avanzado
  4.- ReactJS, Redux y  React Router
  5.- Node.js y autenticación con Passport.js

  Ahora, es momento de que profundicemos un poco en el Frontend y apliquemos una estrategia que va a hacer que la experiencia de tus usarios se incremente exponencialmente.

  Vamos a aplicar Server Side Rendering en PlatziVideo. 

  En este curso aprenderas cosas como: 

  1.- Server tu aplicacion de ReactJS con Express
  2.- Preparar tu aplicación para producción
  3.- Generar y usar un manifest de los assets de tu aplicación

  Para este curso debes tener en cuenta que debido a que vamos a estar realizando diversas configuraciones, estas mismas pueden llegar a ser un poco extensas y en algun punto mientras desconectamos algo y lo conectamos de vuelta a nuestro servidor de express pueden verse errores en pantalla. 
  
  *Esto es perfectamente normal*

## Requerimientos mínimos

  Para poder avanzar rapidamente y no quedarte estancado en ciertos temas del curso te recomiendo que sepas dominar:

  1.- Node.js
    Ya que estaremos usando express para poder servir nuestra aplicación
  2.- Webpack
    Por que estaremos aplicando y mejorando ciertas configuraciones desde express y desde el archivo de configuración de webpack.
  3.- React.js
    Debido a que nuestra aplicación esta en React, es importante tener el contexto de lo que hicimos en cursos anteriores o al menos revisar el proyecto del curso de React, React Router y Redux.
  4.- Terminal 
    Manejar la terminal es muy importante, no estaremos haciendo fuera    de lo normal en la terminal, pero si es indispensable conocer los     comandos basicos y manejarse entre directorios.

## Presentación del proyecto del curso 

  Para este curso estaremos usando el proyecto de la Escuela de Javascrip: *PlatziVideo*, esta aplicación está hecha en *React.js*, usa para el enrutamiento *React Router* y para el estado global de la aplicación *Redux*.

## Babel, Express y React

  A lo largo del curso estaremos usando 3 cosas fundamentales que nos permitiran aplicar Server Side Rendering a nuestra aplicación.

  1.- Babel Babel es una herramienta principalmente usada para convertir codigo hecho en ECMAScript 2015 en adelante a una version de Javascript compatible con navegadores viejos y modernos https://babeljs.io/docs/en/

  2.- Express Es un Framework de Node que nos permite realizar aplicaciones web o crear servicios para consumir por otas aplicaciones por ejemplo un API

  3.- React.js Es una libreria creada por Facebook que nos permite crear de manera sencilla componentes interactivos y reutilizables para interfaces de usuario.

## ¿Qué es SSR Server Side Rendering?

  Antes de comenzar a escribir codigo, es importante tener claros dos conceptos fundamentales que nos permitiran tener un mapa mucho mas claro de lo que estaremos haciendo a lo largo del curso. 

  1.- El primero es el CSR o por sus siglas *Client Side Rendering* o *Renderizado desdel el lado del cliente* es el proceso habitual que vivimos al momento de servir una aplicación hecha con React o cualquier otra libreria o framework.

  El proceso para que una aplicación con CSR sea servida en nuestro navegador consta de 4 pasos. 

    1.- Al momento de entrar al sitio, el navegador hace una petición al servidor en donde esta alojada nuestra aplicación en este momento el servidor le responde con un HTML con las instrucciones esenciales para comenzar el proceso de renderizado y referencias a archivos necesarios para que nuestra aplicación pueda ser visible.

    2.- Luego, ya que para poder ejecutar nuestra app, el navegador le pide al servidor los archivos de CSS y de Javascript necesarios. 
    Y aqui es en donde empieza el dolor del usuario, ya que dependiendo de la conexion en ciertos casos la aplicación puede demorar muchos segundos y el usuario no recibe nada mas que una pantalla en blanco mientras descarga todo lo necesario.

    3.- Luego que los assets han sido descargados nuestro navegador los ejecuta

    4.- Y por ultimo, despues de todo este proceso, el sitio es interactivo.

    Hay casos en los que el CSR es la mejor alternativa pero es importante darle feedback al usuario de que algo se esta haciendo: Un loader por ejemplo.

  2.- Pero, hay otra forma de hacer que nuestro usuario tenga un feedback inmediato sin necesidad de tener un spinner o un mensaje de *Espera*, esta alternativa es el SSR, *Server Side Render* o *Renderizado desde el lado del Servidor*.

  El SSR es una estrategia que nos va a permitir, como ya dijimos antes darle un feedback inmediato a nuestro usuario y que no abandone nuestro sitio por que tarda mucho en cargar.

  Este proceso consta de 4 pasos tambien.

    1.- Al momento de hacer la petición, nuestro servidor no solo va a enviar un HTML con las referencias a nuestros archivos. Si no que tambien va a devolver un pre-renderizado de toda nuestra aplicación para que nuestro usuario tenga un feedback inmediato y pueda ver todo nuestro sitio de manera instantanea. 
    
    2.- El navegador renderiza esta información previamente enviada por el servidor y, tambien,  ya que se enviaron las referencias a nuestros assets, el navegador comenzara a descargar los archivos de nuestra app en paralelo. Y asi aprovechamos el feedback que le damos al usario para poder tener los archivos en nuestro cliente.

    3.- Luego de todo esto el navegador pasa ejecuta la aplicación de react que acabamos de descargar y realiza una inyección de todos los eventos que no existen del lado del servidor, cosas como onClicks, onSubmits, etc... 

    4.- Por ultimo ya luego de que todo nuestro sitio es totalmente interactivo y nuestro usuario puede interactuar sin problemas.

  Ahora, por que renderizar desde el servidor, mas alla de darle un feedback al usuario: 

    1.- Nuestro sitio carga mucho mas rapido
    2.- Mejora el SEO ya que todo el contenido que se esta enviando de manera pre-renderizada es 100% indexable por cualquier motor de busqueda.
    3.- Le da una mejor apariencia al usuario, sin pantallas blancas antes de comenzar o loaders que dan la sensación de un sitio lento. 

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

  Esto debe hacerse en la validación de producción

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

  Una ultima cosa a cambiar es nuestro HMR Plugin, dado que estaremos en producción, no es necesario cargarlo. Para validar un plugin sencillamente agregamos la validación de esta manera: 

  `isDev ? new webpack.HotModuleReplacementPlugin() : () => { },`
  
  Ya que tenemos esta configuración lista, es momento de probar que todo funcione como debería.

  Vamos a nuestro `.env` y cambiemos el entorno a *production*

  Luego ejecutamos: `npm run build`

  Y posteriormente ejecutamos en consola: `node src/server`

  Si vamos a nuestro navegador podemos verificar que todo se ejecutó de manera perfecta!

## Optimización del Build

  En casi todos los casos uno de los principales problemas que nos encontraremos al momento de desarrollar es que el peso de nuestros archivos se va a elevar a medida que nuestro proyecto va creciendo y podemos llegar a encontrar *builds*  que pesen hasta 5mb. Esto para descargar en conexiones moviles o muy lentas puede llegar a frustrar a nuestro usuario.
  
  La solucion a esto es: 

  .1 Cuidar nuestras instalaciones: No instalemos nada que no sea necesario.
  .2 Remover lo que no se usa
  .3 Comprimir nuestros assets. 

  Entonces, si vamos a verificar las primeras dos, vamos a quitar referencias e instalaciones que paquetes que ya no estamos usando.

  Vamos a nuestro `webpack.config.js` y removemos el llamado al`html-loader`

  Removiendo esto vamos a evitar cargar cosas que ya no estamos usando.

  Y ahora, procedemos a limpiar nuestro `package.json`

  Para desinstalar un paquete o varios solo debemos usar el parametro *uninstall*

  Veamos que paquetes ya no estan en uso:

 `npm uninstall html-loader html-webpack-plugin`

 Ahora vamos a comprimir nuestros assets. Para poder hacer esto nos vamos a apoyar de un paquete *compression-webpack-plugin*

 Para instalarlo y usarlo seguiremos las instrucciones que nos da la documentacion del paquete y le aplicaremos un par de configuraciones extra. Que encontraremos dentro de la documentación
 
Primero lo instalaremos:

 `npm install compression-webpack-plugin --save-dev`

Y por ultimo configuraremos nuestro plugin y le diremos que tipo de archivos comprimir y como llamarlos.
```
  const CompressionPlugin = require('compression-webpack-plugin');

  new CompressionPlugin({
    test: /\.js$|\.css$/,
    filename: '[path].gz',
  }),
```

Una vez instalado y configurado vamos a configurar esto para que se aplique unicamente para produccion y luego vamos a probar que genere nuestros assets comprimidos.

Para probarlo solo debemos ir a nuestro archivo `.env` y cambiar el entorno a producción, ejecutamos nuestro comando `npm run build` y en el mismo stack podremos ver la diferencia entre builds.

## Aplicar hashes a el nombre de nuestros builds

Al momento de tener una aplicación web que va a depender de builds para poder funcionar, es muy importante saber nuestro usuario siempre tenga la ultima version.

Por ejem, actualmente nuestra aplicación tiene una serie de archivos que estaran en constante cambio. Estos son el *app.css* y el *app.js*. Una vez el navegador los descargue una vez el los va a guardar en cache y vamos a tener que estar limpiando nuestro cache para que nuestros usuarios siempre tengan la ultima version de nuestro app. 

Aqui entran los hashes. Los hashes es una cadena de caracteres aleatoria que se genera en cada deploy. Con esto garantizamos que cada vez que nuestro usuario entre al sitio y tengamos una version nueva, su navegador descargara el ultimo archivo generado. 

Para poder generar los hashes solo debemos ir a nuestro `webpack.config.js` y agregarle el prefijo `[hash]`. 

Tambien podemos validar el nombre de nuestro archivo para que tenga hashes unicamente en produccion.

Ahora, ya tenemos nuestros hashes generados pero no podemos leerlos. Para poder hacerlo debemos generar un manifest, leer este archivo cada vez que hagamos nuestro build e indicarle a nuestro server cual es el nuevo hash.

Para generar el manifest instalaremos el paquete: `webpack-manifest-plugin`

`npm install --save-dev webpack-manifest-plugin`

Y luego seguiremos las instrucciones para poder usarlo, obviamente agregaremos de una vez la configuracion para que esto se aplique unicamente en nuestro entorno de produccion. 

```
  const ManifestPlugin = require('webpack-manifest-plugin');
  isDev ? () => { } : new ManifestPlugin(),
```

Hacemos nuestro build y probamos que se este generando nuestro *manifest* correctamente

Ahora, ya que nuestro *manifest* se esta creando, debemos acceder a el y enviarlo a nuestra funcion de renderizado. Para hacer esto debemos hacer dos cosas. 

  1. Crear una función para leer nuestro archivo
  2. Crear un middleware para enviarlo a nuestra funcion de renderizado.

Nuestra funcion de lectura de archivo es muy sencilla, dentro de nuestra carpeta de *server* crearemos un archivo llamado *getManifest* y alli haremos lo siguiente:

```
import fs from 'fs';

const getManifest = () => {
  try {
    return JSON.parse(fs.readFileSync(`${__dirname}/public/manifest.json`, 'utf8'));
  } catch (error) {
    return {
      "main.css": "/assets/app.css",
      "main.js": "/assets/app.js",
    };
  }
};

export default getManifest;
```
Y por ultimo, en nuestro server haremos nuestro middleware para enviar los valores que necesitemos, para esto iremos a nuestro *server.js* y haremos lo siguiente.

```
import getManifest from './getManifest';

app.use((req, res, next) => {
  if (!req.hashManifest) req.hashManifest = getManifest();
  next();
});
```

Vamos a aplicar nuestro middleware, en nuestra funcion *renderApp* vamos a pasarle a *setResponse* el manifest que estamos leyendo. 

`res.send(setResponse(html, preloadedState, req.hashManifest));`

Y luego para finalizar vamos a cambiar *setResponse* para que reciba el manifest y lo aplique de la siguiente forma: 

```
const mainStyles = manifest ? manifest['main.css'] : '/assets/app.css';
const mainBuild = manifest ? manifest['main.js'] : '/assets/app.js';
```

Y en el html: `${mainStyles}` y `${mainBuild}`

## Como implementar Next.js

En el mundo de React existen multiples herramientas que nos ayudaran a crear una aplicacion de manera rapida y sencilla, en esta clase aprenderas a crear un proyecto base hecho con Next.js

Next.js es un framework de react y su principal caracteristica es que es Server Side Render First. Es decir, toda nuestra aplicacion va a correr con SSR por defecto con la configuracion por defecto.

Para comenzar crearemos una carpeta llamada `nextjs` en nuestro root y luego, siguiendo la documentacion vamos a instalar 3 dependencias para poder cumplir nuestro objetivo.

`npm install --save next react react-dom`

Luego vamos a nuestro package.json y crearemos 3 scripts

```
  "scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start"
  },
```

Como podemos ver, estos scripts se refieren a correr nuestra aplicacion en desarrollo, construir el buid de la misma y ejecutar la aplicacion para produccion.

Ahora, si queremos crear nuestra pagina de hola next.js vamos a crear una carpeta llamada `pages` y aqui adentro crearemos las paginas de nuestras vistas, por ejemplo, si creamos una pagina llamada `index.js` estaremos creando la ruta del home. 

Procedemos a escribir un componente funcional para servir nuestra ruta. 

```
  import React from 'react';

  const Index = () => {
    return (
      <div>
        Hola Next.js
      </div>
    );
  };

  export default Index;

```

Y ahora, vamos a nuestra terminal a verificar que todo esta funcionando bien ejecutando el comando:

`npm run dev`

Podemos ver que se renderiza nuesta pagina y si vamos a constatarnos de que este usando SSR desabilitamos le javascript y LISTO!! 

Ya tenemos una aplicacion con SSR de manera rapida y sencilla.

Si quieres saber mas acerca de Next.js y las capacidades que te provee este poderoso framework te invito a revisar la documentacion del mismo.

## Como usar Gatsby.js

Otra herramienta realmente poderosa es Gatsby.js, es otro framework de React que te va a permitir crear aplicaciones de manera super rapida y con un gran apoyo de la comunidad.

De kas ventajas que tiene Gatsby.js es la cantidad de Boilerplates y presets que provee para cualquier tipo de aplicacion, desde blogs hasta landing pages. 

Para poder iniciar un proyecto de gatsby vamos a instalar un paquete global.

`npm install -g gatsby-cli`

Una vez instalada la dependencia procedemos a crear un nuevo proyecto de gatsby con:

`gatsby new gatsby-site`

Podemos ver que nos da a elegir el gestor de paquetes, vamos a elegir *npm*

Esperamos a que instale todo lo necesario...

Y una vez finalizado podemos ver que nos da dos instrucciones. 
```
  cd gatsby-site
  gatsby develop
```

Una vez ejecutado el comando de desarrollo, podemos observar que automaticamente crea un proyecto base con todo lo necesario para comenzar a progamar.

Si vemos la estructura del mismo nos genera varios archivos de configuracion, entre los cuales esta uno para configurar el SSR, tambien para manejar node y conectarse con GraphQL y si vamos a la seccion de paginas encontraremos paginas de ejemplo para poder trabajar rapida y eficientemente.

## Cuando usar cada una de las herramientas presentadas

Cada herramienta, tiene sus pro y sus contras, pero mas alla de profundizar sobre los beneficios de las 3, hay que tener en cuenta varias cosas para saber que y cuando usar cada una. 

1.- El alcance del proyecto
  No sabemos que tanto va a crecer el proyecto y el tiempo que tendremos para entregarlo y la cantidad de configuraciones y modificaciones que planeamos implementar.

2.- El objetivo del mismo
  Si es un proyecto que queremos usar para un blog propio o es algo para un cliente es muy importante tener claros los objetivos para saber que tanto va a escalar y como debemos manejar el entorno de produccion. 

3.- El tiempo de entrega 
  Como ya mencionamos antes, el tiempo de entrega es sumamente importante al momento de decidir la herramiente que usaremos. Si queremos usar algo rapido para una entrega veloz o si podemos trabajar artesanalmente, configurar y tener el control de absolutamente cada pedazo de codigo

4.-  Entorno de produccion

  Hay casos en los que el entorno de produccion marca la diferencia, todo depende de si vamos a hospedar nuestro proyecto en gihub pages, next o en un servidor personalizado. En estos casos cada una de las herramientas te provee herramientas de despliegue. 

  .- Gatsby es extremadamente util si quieres servir algo en github pages de manera rapida
  .- Next tiene su propio servicio para desplegar aplicaciones de manera sencilla y gratuita.
  .- Y como ya veremos en modulos siguientes, configurar y personalizar webpack y express para poder mantener el control de todo tu entorno proveen configuraciones sencillas para realizar dicho despliegue.
