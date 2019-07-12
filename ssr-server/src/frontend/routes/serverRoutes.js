import Home from '../containers/Home';
import Player from '../containers/Player';
import Login from '../containers/Login';
import Register from '../containers/Register';
import NotFount from '../containers/NotFount';

const routes = (user) => {
  return [
    {
      path: '/',
      exact: true,
      component: user.id ? Home : Login,
    },
    {
      path: '/player/:id',
      exact: true,
      component: user.id ? Player : Login,
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
};

export default routes;
