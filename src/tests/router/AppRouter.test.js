import '@testing-library/jest-dom';
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import { MemoryRouter } from 'react-router-dom'; // para crear el Router
import thunk from 'redux-thunk'; // para crear el thunk
import configureStore from 'redux-mock-store'; // agregamos el thunk al store
import { login } from '../../actions/auth';
import AppRouter from '../../router/AppRouter';
import { act } from 'react-dom/test-utils';
import { firebase } from '../../firebase/firebase-config';


jest.mock('../../actions/auth', () => ({
  login: jest.fn(),
}));



// creando el store
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

// replicamos el store de redux
const initState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null
  },
  notes: {
    notes: [],
    active: {}
  }
};

let store = mockStore(initState);
// console.log(store);

// reemplazamos la funcionalidad que tiene el store por una funcion jest
store.dispatch = jest.fn();


describe('Test in <AppRouter />', () => {
  
  
  test('you must call the login if I am authenticated ', async () => {
    
    // se tiene que crear lo necesario para que trabaje el componente
    // envolvemos todo dentro de un act, ya que usamos un useEffect

    let user;

    await act(async () => {

      // hacemos un login a firebase
      const userCredentials = await firebase.auth().signInWithEmailAndPassword('test@testing.com', '123456');
      user = userCredentials.user;

      

      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            
            <AppRouter />
    
          </MemoryRouter>
        </Provider>
      );
    });

    expect(login).toHaveBeenCalled();
    expect(login).toHaveBeenCalledWith('bR8zELPx7wYwShgAMPrYnMPTOk63', null);

  })
  
  
})