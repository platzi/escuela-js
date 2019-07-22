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
  - Clase 11.
    - Instalar:
      `yarn add babel-jest jest enzyme-adapter-react-16 enzyme react-test-renderer`
    - Crear scripts para jest
      ```
        "test": "jest",
        "test:watch": "jest --watch"
      ```
    - Configurar mock files:
      ```
        "jest": {
          "moduleNameMapper": {
            "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/src/frontend/__mocks__/fileMock.js",
            "\\.(scss|sass)$": "<rootDir>/src/frontend/__mocks__/styleMock.js"
          }
        },
      ```
  - Clase 12.
    - Probando Header
      ```
        import React from 'react';
        import { create } from 'react-test-renderer';
        import Header from '../Layout';

        describe('Header component', () => {
          test('Matches the snapshot', () => {
            const header = create(<Header />);
            expect(header.toJSON()).toMatchSnapshot();
          });
        });
      ```
    - Probando Footer
      ```
        import React from 'react';
        import { create } from 'react-test-renderer';
        import { render, configure, shallow } from 'enzyme';
        import Adapter from 'enzyme-adapter-react-16';
        import Footer from '../Footer';

        configure({ adapter: new Adapter() });

        describe('Footer component', () => {
          test('Matches the snapshot', () => {
            const footer = create(<Footer />);
            expect(footer.toJSON()).toMatchSnapshot();
          });

          test('Footer haves class footer', () => {
            const footer = shallow(<Footer />);
            const footerElm = footer.find('footer');
            expect(footerElm.hasClass('footer')).toBe(true);
          });

          test('Footer haves 3 anchors', () => {
            const footer = render(<Footer />);
            expect(footer.find('a')).toHaveLength(3);
          });
        });
      ```
  - Clase 13.
    ```
      import React from 'react';
      import { createStore, compose, applyMiddleware } from 'redux';
      import thunk from 'redux-thunk';
      import { Provider } from 'react-redux';
      import { Router } from 'react-router';
      import { createBrowserHistory } from 'history';
      import initialState from '../initialState';
      import reducer from '../reducers';

      const store = createStore(reducer, initialState, compose(applyMiddleware(thunk)));
      const history = createBrowserHistory();

      const ProviderMock = props => (
        <Provider store={store}>
          <Router history={history}>
            {props.children}
          </Router>
        </Provider>
      );

      module.exports = ProviderMock;
    ```
  - Clase 14.
    ```
      import React from 'react';
      import { create } from 'react-test-renderer';
      import ProviderMock from '../../__mocks__/ProviderMock';
      import CarouselItem from '../CarouselItem';

      describe('CarouselItem component', () => {
        test('Matches the snapshot', () => {
          const carousel = create(
            <ProviderMock>
              <CarouselItem />
            </ProviderMock>,
          );
          expect(carousel.toJSON()).toMatchSnapshot();
        });
      });
    ```
  - Clase 15.
    ```
      import React from 'react';
      import { create } from 'react-test-renderer';
      import { mount, configure } from 'enzyme';
      import Adapter from 'enzyme-adapter-react-16';
      import ProviderMock from '../../__mocks__/ProviderMock';
      import Register from '../Register';

      configure({ adapter: new Adapter() });

      describe('Register component', () => {
        test('Matches the snapshot', () => {
          const register = create(
            <ProviderMock>
              <Register />
            </ProviderMock>,
          );
          expect(register.toJSON()).toMatchSnapshot();
        });

        it('Calls and Executes preventDefault function when Register form is submitted', () => {
          const preventDefault = jest.fn();
          const wrapper = mount(
            <ProviderMock>
              <Register />
            </ProviderMock>,
          );
          wrapper.find('form').simulate('submit', { preventDefault });
          expect(preventDefault).toHaveBeenCalledTimes(1);
          wrapper.unmount();
        });
      });
    ```
  - Clase 16.
    - Crear movieMock
    ```
      const movieMock = {
        'id': 2,
        'slug': 'tvshow-2',
        'title': 'In the Dark',
        'type': 'Scripted',
        'language': 'English',
        'year': 2009,
        'contentRating': '16+',
        'duration': 164,
        'cover': 'http://dummyimage.com/800x600.png/99118E/ffffff',
        'description': 'Vestibulum ac est lacinia nisi venenatis tristique',
        'source': 'https://mdstrm.com/video/58333e214ad055d208427db5.mp4',
      };

      module.exports = movieMock;

    ```
    ```
      import { setFavorite, loginRequest, logoutRequest } from '../index';
      import movieMock from '../../__mocks__/movieMock';

      describe('Actions', () => {
        it('Shoul create an action to set a Favorite', () => {
          const payload = movieMock;
          const expectedAction = {
            type: 'SET_FAVORITE',
            payload,
          };
          expect(setFavorite(payload)).toEqual(expectedAction);
        });

        it('Shoul create an action to logIn', () => {
          const payload = {
            email: 'test@test.com',
            password: 'thisisnotapassword',
          };
          const expectedAction = {
            type: 'LOGIN_REQUEST',
            payload,
          };
          expect(loginRequest(payload)).toEqual(expectedAction);
        });
        it('Shoul create an action to logOut', () => {
          const payload = {};
          const expectedAction = {
            type: 'LOGOUT_REQUEST',
            payload,
          };
          expect(logoutRequest(payload)).toEqual(expectedAction);
        });
      });

    ```
  - Clase 17.
    ```
      import gravatar from '../gravatar';

      describe('Gravatar function test', () => {
        it('It Should return gravatar image url', () => {
          const email = 's@mpol.com';
          const gravatarPlaceholder = 'https://gravatar.com/avatar/e4ffaa3f7035953e40b6786736fbe544';
          expect(gravatarPlaceholder).toEqual(gravatar(email));
        });
      });
    ```
  - Clase 18.
    Explicar el test coverage
    `"test:coverage": "jest --coverage"`
