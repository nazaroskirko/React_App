import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './root';
import reducers from './reducers';
import createStore from './utils/create-store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Helmet from 'react-helmet';
import { updateToken } from './actions';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { gray500 } from 'material-ui/styles/colors';
import { readCookie } from 'utils/manage-cookies';
import ActionCable from 'actioncable';
import api from 'api';
import './styles/index.css';
injectTapEventPlugin();

let cableAddress = 'ws:localhost:3000/websocket';
if (process.env['NODE_ENV'] === 'production') {
  cableAddress = 'wss:app.epicalls.com/websocket';
}
const cable = ActionCable.createConsumer(cableAddress);

const muiTheme = getMuiTheme({
  palette: {
    textColor: gray500,
  },
  appBar: {
    height: 46,
  },
  tableRow: {
    stripeColor: '#f8fafd',
  },
});

const store = createStore(reducers);
store.subscribe(store.getState);

const token = readCookie('token');

if (token) {
  store.dispatch(updateToken(token));
}

cable.subscriptions.create('WebNotificationsChannel', {
  received: data => {
    if (data && data.reloadUser) {
      store.dispatch(api.actions.currentUser.get());
    }
  },
  connected: () => console.log('connected'),
});

function Reporter(props) {
  throw props.error;
};

const render = Component => {
  const app =
    <AppContainer errorReporter={Reporter}>
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Helmet
            defaultTitle="Epicalls"
            titleTemplate="%s - Epicalls"
          />
          <Component store={store} />
        </div>
      </MuiThemeProvider>
    </AppContainer>;

  ReactDOM.render(app, document.getElementById('root'));
};

render(Root);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./root', () => {
    const NewRoot = require('./root');
    render(NewRoot);
  });
}
