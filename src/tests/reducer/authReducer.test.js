import { authReducer } from "../../reducer/authReducer"
import { types } from "../../types/types";


describe('Test in authReducer', () => {

  // haciendo un state falso
  const initialState = {
    uid: 'sa6d546ad454asd',
    name: 'Pablo'
  }
  
  test('should return default state', () => {
    
    const action = {
      type: types.error
    }

    // simulando el authReducer
    const state = authReducer(initialState, action);

    expect(state).toEqual(initialState);
  })

  test('should works correctly types.login ', () => {

    const initialState = {};

    const action = {
      type: types.login,
      payload: {
        uid: '182',
        displayName: 'Andrea'
      }
    }

    const state = authReducer(initialState, action);
    
    expect(state).toEqual({
      uid: '182',
      name: 'Andrea'
    });
    
  })

  test('should works correctly types.logout', () => {

    const action = {
      type: types.logout
    }
    
    const state = authReducer(initialState, action);

    expect(state).toEqual({});

  })
  
  
  
})
