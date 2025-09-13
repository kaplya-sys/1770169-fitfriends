import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';

import {checkAuthAction, store} from './store';
import {App} from './components/app';
import {HistoryRouter} from './libs/history-route';
import {browserHistory} from './libs/browser-history';

store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <App/>
      </HistoryRouter>
    </Provider>
  </React.StrictMode>
);
