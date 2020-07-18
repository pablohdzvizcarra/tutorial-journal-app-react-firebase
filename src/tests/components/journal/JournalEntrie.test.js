import '@testing-library/jest-dom';
import React from 'react';

import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { JournalEntrie } from '../../../components/journal/JournalEntrie';
import { activeNote } from '../../../actions/notes';



const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {};

let store = mockStore(initialState);
store.dispatch = jest.fn();

const note = {
  id: 10,
  date: 0,
  title: 'Hola',
  body: 'Mundo',
  url: 'https://tests.com'
}

const wrapper = mount(
  <Provider store={store}>
      
    <JournalEntrie {...note}/>
    
  </Provider>
);


describe('Test in <JournalEntrie />', () => {

  test('should be show correctly', () => {

    expect(wrapper).toMatchSnapshot();
    
  });

  test('should active the note', () => {

    // simulamos el click en el div
    wrapper.find('.journal__entry').prop('onClick')();

    // evaluamos que el metodo dispatch del store sea llamado
    expect(store.dispatch).toHaveBeenCalled();

    // se evalua el llamado con los argumentos
    expect(store.dispatch).toHaveBeenCalledWith(
      activeNote(note.id, { ...note })
    );
    
  })
  
  
  
})
