import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import { Sidebar } from '../../../components/journal/Sidebar';
import { startLogout } from '../../../actions/auth';
import { startNewNote } from '../../../actions/notes';



jest.mock('../../../actions/auth', () => ({
  startLogout: jest.fn()
}));

jest.mock('../../../actions/notes', () => ({
  startNewNote: jest.fn()
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
  auth: {
    uid: '123',
    name: 'Testing'
  },
  ui: {
    loading: false,
    msgError: null
  },
  notes: {
    notes: [
      
    ],
    active: null
  }
};

let store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
      
    <Sidebar />
    
  </Provider>
);


describe('Test in <Sidebar />', () => {

  test('should show correctly', () => {
    // snapshot
    expect(wrapper).toMatchSnapshot();
  });

  test('should call function startLogout', () => {
    // debe de llamar la accion del startlogout
    wrapper.find('button').prop('onClick')();

    expect(startLogout).toHaveBeenCalled();
    
  });


  test('should call function startNewNote', () => {

    // debe de llamar la accion startNewNote
    wrapper.find('.journal__new-entry').prop('onClick')();

    expect(startNewNote).toHaveBeenCalled();

  })
  
  
})
