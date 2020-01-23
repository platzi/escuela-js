## Múltiples versiones de Node con NVMRC

  En muchas ocaciones pasa que estas saltando entre proyectos y cada vez se hace mas necesario estar saltando entre versiones de node por que en la vida real, no todos
  los proyectos estan funcionando con la ultima versión LTS de Node. 

  NVM o _Node Version Manager_ nos ayuda a instalar versiones espeficifas de node sin afectar la version global del sistema. 

  Para poder usarlo solo debemos hacer 2 cosas:

    1.- Instalarlo
    2.- Implementarlo en nuestro proyecto

  1.- Para instalarlo solo debemos ir al repo de github y seguir las instrucciones en https://github.com/nvm-sh/nvm

  Es solo bajar el script que lo instala y ya. 

  2.- Para implementarlo es mas sencillo aun, lo unico que debemos hacer es en la base de nuestro proyecto creamos un archivo llamado `.nvmrc` y alli adentro vas a poner la version de Node que quieras usar en tu proyecto.

  Por ejemplo, en PlatziVideo estaremos usando la ultima LTS de Node. Y esa es la 12.4.1 en este momento.

  Luego, vamos a nuestra consola y por ultimo ejecutamos `nvm i`

  Si queremos probar la version que estamos usando, solo ejecutamos `node -v` y listo. 

## Creación de rutas para el flujo de usuario en el servidor

Muchas veces cuando trabajamos en un entorno colaborativo, es usual encontrase con codigo de otros desarrolladores y aveces es necesario integrar ese codigo en parte del nuestro. 

En esta clase aprenderas a integrar las rutas que Guillermo Rodas ya nos dejo listas para usar en el Repositorio del curso de Autenticación con Passport. 

Para esto solo debemos entrar en el repo del curso y buscar el servidor de ssr-server
De igual forma el enlace del repo lo dejo en la sección de enlaces e imagenes.

https://github.com/glrodasz/platzi-auth-passport/tree/master/ssr-server

Ahora, ya que estamos aca tenemos que hacer unas cuantas cosas. 

Lo primero es ir a las estrategias de autenticación y buscar la estrategia básica. 

Copiamos la estrategia y la pegamos en nuestro server, y ahora le hacemos un pequeño refactor para que se adapte a la forma en la que venimos trabajando.

- Lo primero que vemos es que nos faltan algunas dependencias, vamos a instalarlas con:
  `npm install passport passport-http @hapi/boom axios`
- Ahora, vamos a cambiar el llamado a las variables de entorno y agregaremos nuestras variables propias.

  Si nos fijamos con detenimiento podemos ver que ahora hay dos variables de entorno nuevas: API_URL y API_KEY_TOKEN, las agregamos al `.env` y procedemos a llamarlas en nuestra estrategia:
  ```
    API_URL=https://platzivideo-secured-api.now.sh
    API_KEY_TOKEN=8120848fff09687543d70d59adb47fe14792bff3dd850d7630acc03571fa8860
  ```

- Por ultimo tomaremos las rutas de inicio de sesion y registro y procederemos a implementarlas y adaptarlas a nuestro flujo de trabajo.

  Primero veamos que dependencias necesitaremos: `npm i cookie-parser express-session`

  Y ahora configuremos varios middlewares necesarios para poder usar nuestra api: 

  ```
    import cookieParser from 'cookie-parser';
    import boom from '@hapi/boom';
    import passport from 'passport';
  ```

  ```
    app.use(express.json());
    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(passport.session());
  ```

  Y requerimos nuestra estrategia de autenticación:
  `require('./utils/auth/strategies/basic')`

  Luego, pasamos a terminar de adaptar ambas rutas.

  Ahora que tenemos nuestras rutas, si vamos a ejecutar el proyecto podemos ver que tenemos un error. Esto se debe a la falta de polyfills en babel. Para esto, solo debemos instalar `npm i @babel/polyfill` y requerirlo en el `index` de nuestor servidor.

  Si vamos a consola podremos observar que nodemon hizo su trabajo y ahora esta compilando bien todo.
