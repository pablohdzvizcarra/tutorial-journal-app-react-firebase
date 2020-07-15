/*
Esta sera la estructura basica del reducer es bueno pensar en como sera la estructura antes de codificar
  {
    notes: [],
    active: null,
    active: {
      id: 'firebaseId',
      title: '',
      body: '',
      imageUrl: '',
      data: 124654654654
    }
  }
*/

import { types } from "../types/types"

// state inicial del reducer
const initialState = {
  notes: [],
  active: null
}

export const notesReducer = ( state = initialState, action) => {

  switch (action.type) {
    
    case types.notesActive: // se establece la nota activa
      return {
        ...state,
        active: { 
          ...action.payload
        }
      }
    case types.notesLoad: // se cargan las notas
      console.log(action.payload);
      return {
        ...state,
        notes: [...action.payload] // para copiar un array se usa esta expresion
      }
    default:
      return state
  }
}