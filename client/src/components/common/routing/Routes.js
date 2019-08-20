import React from 'react';
import { useRedirect, useRoutes } from 'hookrouter';
import { Container } from 'reactstrap';

// COMPONENTS
import About from '../../pages/About';
import Dashboard from '../../pages/Dashboard';
import Home from '../../pages/Home';
import Login from '../../pages/auth/Login';
import MatchInfo from '../../pages/MatchInfo';
import NotFound from '../notFound/NotFound';
import PrivateRoute from './PrivateRoute';
import Signup from '../../pages/auth/Signup';
import TicketList from '../../pages/TicketList';

const routes = {
  '/about': () => <About />,
  '/dashboard': () => <PrivateRoute component={Dashboard} />,
  '/dashboard/:id': ({ id }) => <PrivateRoute component={MatchInfo} id={id} />,
  '/tickets': () => <PrivateRoute component={TicketList} />,
  '/home': () => <Home />,
  '/sign-in': () => <Login />,
  '/sign-up': () => <Signup />,
};

const Routes = () => {
  useRedirect('/', '/home');
  const routesResult = useRoutes(routes);

  return <Container>{routesResult || <NotFound />}</Container>;
};

export default Routes;
