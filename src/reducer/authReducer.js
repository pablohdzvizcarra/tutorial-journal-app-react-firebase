import { types } from "../types/types";

/*
  El state estara vacio cuando el usuario no este autenticado

  {
    uid: sa6d546ad454asd,
    name: 'Pablo'
  }

*/

export const authReducer = (state = {}, action) => {

  switch (action.type) {
    case types.login:
      return {
        uid: action.payload.uid,
        name: action.payload.displayName
      }
    
    case types.logout:
      return {

      }
  
    default:
      return state;
  }
}