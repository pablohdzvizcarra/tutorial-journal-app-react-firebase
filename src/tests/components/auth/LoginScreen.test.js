import '@testing-library/jest-dom';
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import { MemoryRouter } from 'react-router-dom'; // para crear el Router
import thunk from 'redux-thunk'; // para crear el thunk
import configureStore from 'redux-mock-store'; // agregamos el thunk al store

import { LoginScreen } from '../../../components/auth/LoginScreen';
import { startGoogleLogin, startLoginEmailPassword } from '../../../actions/auth';


// Creacion de Mocks para las funciones en el componente
jest.mock('../../../actions/auth', () => ({
  startGoogleLogin: jest.fn(),
  startLoginEmailPassword: jest.fn()
}));

describe('Test in <LoginScreen />', () => {

  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);

  // replicamos el store de redux
  const initState = {
    auth: {},
    ui: {
      loading: false,
      msgError: null
    },
    notes: {}
  };

  let store = mockStore(initState);
  // console.log(store);

  // reemplazamos la funcionalidad que tiene el store por una funcion jest
  store.dispatch = jest.fn();

  
  
  
  // se tiene que crear lo necesario para que trabaje el componente
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter> 
        
        <LoginScreen />

      </MemoryRouter>
    </Provider>
  );
  
  beforeEach(() => {
    store = mockStore(initState)
    jest.clearAllMocks() // limpiamos todos los mocks creados
  });

  
  test('should create snapshot correctly', () => {
    
    expect(wrapper).toMatchSnapshot();
  });

  test('should trigger the action startGoogleLogin', () => {
    
    // buscamos el elemento y hacemos el click
    wrapper.find('.google-btn').prop('onClick')();

    expect(startGoogleLogin).toHaveBeenCalled();

  });
  
  test('should trigger the action startLoginEmailPassword', () => {

    // creamos un evento falso
    const fakeEvent = { 
      preventDefault : () => {}
    }
    wrapper.find('form').prop('onSubmit')(fakeEvent);

    expect(startLoginEmailPassword).toHaveBeenCalled();
    expect(startLoginEmailPassword).toHaveBeenCalledWith('nando@gmail.com', '123456');
    
  })
  

})
