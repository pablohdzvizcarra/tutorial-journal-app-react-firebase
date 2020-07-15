// importaciones de redux
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

// importacion de nuestros reducers
import { authReducer } from '../reducer/authReducer';
import { uiReducer } from '../reducer/uiReducer';

// importacion de ReduxThunk
import ReduxThunk from 'redux-thunk';
import { notesReducer } from '../reducer/notesReducer';

// importacion de redux-devtools
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// con esta funcion de redux se pueden tener varios reducer en un solo store
const reducers = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  notes: notesReducer,
});

export const store = createStore(
  reducers,
  // implementar ReduxThunk y redux-devtools
  composeEnhancers(
    applyMiddleware(ReduxThunk)
  )
);