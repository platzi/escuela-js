Clase 4.
  Explicar las validaciones que se hicieron para producción
  Actualizar el `.env`
  ```
    API_URL=https://platzivideo-secured-api.now.sh
    API_KEY_TOKEN=8120848fff09687543d70d59adb47fe14792bff3dd850d7630acc03571fa8860
  ```
Clase 3.
  - Multiples versiones de Node con NVMRC
    - NVM es un manejador de versiones de NVM.
    - Ir al sitio y explicarlo
      `https://github.com/nvm-sh/nvm`
    - Crear `.nvmrc`
    - Ir a node y buscar la ultima version LTS.
    - `nvm install`
Clase 4.
  - Montar las rutas de autenticación de SSR
    - `https://github.com/glrodasz/platzi-auth-passport/tree/master/ssr-server`
    - Instalar dependencias.
      `yarn add @hapi/boom passport axios cookie-parser passport-http`
    - Estrategia basica de autenticación
      ```
        import passport from 'passport';
        import { BasicStrategy } from 'passport-http';
        import boom from '@hapi/boom';
        import dotenv from 'dotenv';
        import axios from 'axios';

        dotenv.config();

        passport.use(
          new BasicStrategy(async (email, password, cb) => {
            try {
              const { data, status } = await axios({
                url: `${process.env.API_URL}/api/auth/sign-in`,
                method: 'post',
                auth: {
                  password,
                  username: email,
                },
                data: {
                  apiKeyToken: process.env.API_KEY_TOKEN,
                },
              });

              if (!data || status !== 200) {
                return cb(boom.unauthorized(), false);
              }

              return cb(null, data);
            } catch (error) {
              return cb(error);
            }
          }),
        );
      ```
    - Rutas de autenticación
      ```
        app.post('/auth/sign-in', async (req, res, next) => {
          passport.authenticate('basic', async (error, data) => {
            try {
              if (error || !data) {
                return next(boom.unauthorized());
              }

              req.login(data, { session: false }, async (error) => {
                if (error) {
                  next(error);
                }

                const { token, ...user } = data;

                res.cookie('token', token, {
                  httpOnly: !(ENV === 'development'),
                  secure: !(ENV === 'development'),
                });
                res.status(200).json(user.user);
              });
            } catch (error) {
              next(error);
            }
          })(req, res, next);
        });

        app.post('/auth/sign-up', async (req, res, next) => {
          const { body: user } = req;
          try {
            const userData = await axios({
              url: `${process.env.API_URL}/api/auth/sign-up`,
              method: 'post',
              data: user,
            });
            console.log(userData);
            res.status(201).json({
              name: req.body.name,
              email: req.body.email,
              id: userData.data.data,
            });
          } catch (error) {
            next(error);
          }
        });
      ```
  - Clase 5.
    - Redux Thunk
      `https://github.com/reduxjs/redux-thunk`
      Es un middleware redux. 
      Que es un thunk ?
      Es una funcio que es retornada por otra. 
      Redux thunk es un middleware que hace un attach de una funcion a todos
      los actions de redux. Recibe dos parametros: dispatch y getState
      El dispath nos permite despachar otras acciones y el getState obtener el estado dentro de los actions
      `import { createStore, applyMiddleware, compose } from 'redux';`
      `composeEnhancers(applyMiddleware(thunk))`
  - Clase 6. 
    ```
      export const setError = payload => ({
        type: 'SET-ERROR',
        payload,
      });

      export const registerUser = (payload, redirectUrl) => {
        return (dispatch) => {
          axios.post('/auth/sign-up', payload)
            .then(({ data }) => dispatch(registerRequest(data)))
            .then(() => {
              window.location.href = redirectUrl;
            })
            .catch(err => dispatch(setError(err)));
        };
      };
    ```
    - Cambiar el componente de Register para que llame a `registerUser`
    - Cambiar el redirectUrl
    - Probar que el registro funcione
  - Clase 7.
    - Validar el app con: 
      `<App isLogged={(preloadedState.user.id)} />`
      Pasar en las rutas del cliente:
      `{ isLogged }`
      ```
        <Route exact path='/' component={isLogged ? Home : Login} />
        <Route exact path='/player/:id' component={isLogged ? Player : Login} />
      ```
    - Validar el server en main.js con:
      `const isLogged = (initialState.user.id);`
    - Pasar el isLogged en las rutas:
      ```
        <Layout>
          {renderRoutes(Routes(isLogged))}
        </Layout>
      ```
      ```
        {
          path: '/player/:id',
          exact: true,
          component: isLogged ? Player : Login,
        },
        {
          path: '/login',
          exact: true,
          component: Login,
        },
      ```
  - Clase 8.
    ```
      export const loginUser = ({ email, password }, redirectUrl) => {
        return (dispatch) => {
          axios({
            url: '/auth/sign-in/',
            method: 'post',
            auth: {
              username: email,
              password,
            },
          })
            .then(({ data }) => {
              document.cookie = `email=${data.email};`;
              document.cookie = `name=${data.name};`;
              document.cookie = `id=${data.id}`;
              dispatch(loginRequest(data));
            })
            .then(() => {
              window.location.href = redirectUrl;
            })
            .catch(err => dispatch(setError(err)));
        };
      };
    ```
    - Cambiar el componente de Register para que llame a `loginUser`
    - Cambiar el redirectUrl
    - Probar que el registro funcione

  - Clase 9.
    - En el header cambiar el metodo de cerrar sesión por:
    ```
      document.cookie = 'email=';
      document.cookie = 'name=;';
      document.cookie = 'id=';
      document.cookie = 'token=';
      props.logoutRequest({});
      document.location.href = '/login';
    ```
    - En el Reducer cambiar el state por:
    ```
      return {
        trends: action.payload,
        originals: action.payload,
        myList: action.payload,
        user: action.payload,
      };
    ```
  - Clase 10.
    - Agregar:
    ```
      let initialState;
      const { token, email, name, id } = req.cookies;
    ```
    Envolver llamado del initialState en un `tryCatch`
    - Para pedir peliculas:
      ```
        let movieList = await axios({
          url: `${process.env.API_URL}/api/movies`,
          headers: { Authorization: `Bearer ${token}` },
          method: 'get',
        });
      ```
    - Para las user movies:
      ```
        let userMovies = await axios({
          url: `${process.env.API_URL}/api/movies?userId=${id}`,
          headers: { Authorization: `Bearer ${token}` },
          method: 'get',
        });
      ```
      ```
        movieList = movieList.data.data;
        userMovies = userMovies.data.data;
      ```
      ```
        initialState = {
          user: {
            id,
            email,
            name,
          },
          myList: userMovies.filter(movie => movie._id === id),
          trends: movieList.filter(movie => movie.contentRating === 'PG' && movie._id),
          originals: movieList.filter(movie => movie.contentRating === 'G' && movie._id),
        };
      ```
    - En el catch poner:
      ```
        initialState = {
          user: {},
          myList: [],
          trends: [],
          originals: [],
        };
      ```
