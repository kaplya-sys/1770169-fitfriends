import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';

import {
  checkAuthAction,
  getRangeFiltersAction,
  getTrainingsAction,
  store
} from './store';
import {App} from './components/app';
import {HistoryRouter} from './libs/history-route';
import {browserHistory} from './libs/browser-history';

store.dispatch(checkAuthAction());
store.dispatch(getTrainingsAction({}));
store.dispatch(getRangeFiltersAction());

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
