import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
//connessione redux react, e utilizzo middleware
//il middleware che useremo è thunk
import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './rootReducer';
import {Provider} from 'react-redux';
//React Router
import {BrowserRouter} from 'react-router-dom';
//Redux thunk,
//le actions sono sincrone(dispatch delle actions), per renderle
//'asincrone' ci serviamo di un middleware che esegue una
//chiamata AJAX e scatena la action una volta avuti i dati
import thunk from 'redux-thunk';

const store = createStore(
  rootReducer,
  compose(//tramite compose
    applyMiddleware(thunk),//usiamo il middleware thunk
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()//redux dev tools
  )
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
