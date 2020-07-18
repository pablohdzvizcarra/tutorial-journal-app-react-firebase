import '@testing-library/jest-dom';
import React from 'react';
import { mount } from 'enzyme';
import { RegisterScreen } from '../../../components/auth/RegisterScreen';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import { types } from '../../../types/types';


describe('Test in <RegisterScreen />', () => {

  // creando el store de Redux
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);

  const initialState = {
    auth: {},
    ui: {
      loading: false,
      msgError: null
    },
    notes: {
      notes: [],
      active:  null
    }
  }

  let store = mockStore(initialState);


  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>

        <RegisterScreen />

      </MemoryRouter>
    </Provider>
  );

  // beforeEach(() => {
  //   store = mockStore(initialState)
  // })

  test('should be shown correctly', () => {

    expect(wrapper).toMatchSnapshot();
    
  });

  test('you should make the dispatch of the respective action ', () => {
    
    // seleccionando el input con el name email
    const emailField = wrapper.find('input[name="email"]');
    
    // simulando un cambio en el input
    emailField.simulate('change', {
      target: {
        value: '',
        name: 'email'
      }
    });

    // simulamos un formSubmit
    wrapper.find('form').simulate('submit', {
      preventDefault() { }
    });

    // obtenemos las acciones disparadas con el submit del form
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.uiSetError,
      payload: 'Email no valido'
    });

  });

  test('should show the warning box with the error', () => {
    
    const initialState = {
      auth: {},
      ui: {
        loading: false,
        msgError: 'El email no es correcto'
      },
      notes: {
        notes: [],
        active: null
      }
    }
  
    const store = mockStore(initialState);
  
  
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
  
          <RegisterScreen />
  
        </MemoryRouter>
      </Provider>
    );

    // evaluamos si la caja de error existe
    expect(wrapper.find('.auth__alert-error').exists()).toBe(true);

    // evaluamos el texto de la caja de error
    expect(wrapper.find('.auth__alert-error').text().trim()).toBe(initialState.ui.msgError);

  });
  
})

