import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { login, logout, startLogout, startLoginEmailPassword } from "../../actions/auth";
import { types } from '../../types/types';



describe('Test actions auth', () => {

  // creamos la configuracion global
  const middlewares = [thunk]; // creamos los middlewares
  const mockStore = configureStore(middlewares); // agregamos middlewares al store

  // state inicial del store
  const initState = {};

  // creamos el store
  let store = mockStore(initState);


  // despues de ejcutar cada test el beforeEach reinicia el valor del store
  beforeEach(() => {
    store = mockStore(initState);
  })

  test('login and logout must create the respective action', () => {

    const user = {
      uid: 'ASD',
      displayName: 'Thiago'
    }
    
    // creamos las actions
    const loginAction = login(user.uid, user.displayName);
    const logoutAction = logout();

    // console.log(loginAction);
    expect(loginAction).toEqual({
      type: types.login,
      payload: {
        uid: user.uid,
        displayName: user.displayName
      }
    });

    expect(logoutAction).toEqual({
      type: types.logout
    });
    
  });

  test('startLogout must work properly ', async () => {
    
    // ejecutamos el dispatch al startLogout
    await store.dispatch(startLogout());

    // obtenemos las actions que se disparan en el middleware
    const actions = store.getActions();
    // console.log(actions);

    expect(actions[0]).toEqual({
      type: types.logout
    });

    expect(actions[1]).toEqual({
      type: types.notesLogoutCleaning
    });

  });

  test('startLoginEmailPassword must work properly', async () => {
    
    const email = 'test@testing.com';
    const password = '123456';

    // ejecutamos el middleware
    await store.dispatch(startLoginEmailPassword(email, password));
    const actions = store.getActions();
    // console.log(actions);

    expect(actions[1]).toEqual({
      type: types.login,
      payload: {
        uid: 'bR8zELPx7wYwShgAMPrYnMPTOk63',
        displayName: null
      }
    });

  });
  
})
