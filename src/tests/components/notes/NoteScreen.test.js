import React from 'react';
import '@testing-library/jest-dom';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { NoteScreen } from '../../../components/notes/NoteScreen';
import { activeNote } from '../../../actions/notes';


jest.mock('../../../actions/notes', () => ({
  activeNote: jest.fn()
}));

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
    active: {
      id: 123,
      title: 'Hello',
      body: 'Mundo',
      date: 17
    }
  }
};

let store = mockStore(initialState);

// simulamos el metodo dispatch de Redux
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
      
    <NoteScreen />
    
  </Provider>
);

describe('Test in <NoteScreen />', () => {

  test('should be show correctly ', () => {

    expect(wrapper).toMatchSnapshot();
    
  });


  test('should trigger the active note', () => {
    
    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: 'Hello Again'
      }
    });

    expect(activeNote).toHaveBeenCalled();

    // con esto verificamos la ultima vez que se llama una funcion
    expect(activeNote).toHaveBeenLastCalledWith(
      123,
      {
        id: 123,
        title: 'Hello Again',
        body: 'Mundo',
        date: 17
      }
    );

  })
  
  
  
})
