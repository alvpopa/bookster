import React, { useEffect } from 'react';
import { Provider } from 'react-redux';

// COMPONENTS
import AppFooter from './components/layouts/footer/AppFooter';
import AppHeader from './components/layouts/header/AppHeader';
import Routes from './components/common/routing/Routes';

// REDUX
import Store from './store';
import { loadUser } from './actions/authAction';

import setAuthToken from './utils/setAuthToken';
import { GraphQLClient, ClientContext } from 'graphql-hooks';

const client = new GraphQLClient({
  url: 'http://localhost:5000/graphql',
});

// SET TOKEN FROM LOCAL STORAGE, IF ANY
if (localStorage.token) setAuthToken(localStorage.token);

const App = () => {
  useEffect(() => {
    Store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={Store}>
      <header className="mb-5">
        <AppHeader />
      </header>
      <ClientContext.Provider value={client}>
        <main id="App">
          <Routes />
        </main>
      </ClientContext.Provider>
      <footer className="mt-5">
        <AppFooter />
      </footer>
    </Provider>
  );
};

export default App;
