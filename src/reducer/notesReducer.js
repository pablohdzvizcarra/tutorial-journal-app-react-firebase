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
    
    case types.notesAddNew:
      return {
        ...state,
        notes: [action.payload, ...state.notes] // se agrega la nueva nota al state y se agregan todas las existentes
      }
    case types.notesLoad: // se cargan las notas
      return {
        ...state,
        notes: [...action.payload] // para copiar un array se usa esta expresion
      }
    case types.notesUpdate:
      return {
        ...state,
        notes: state.notes.map(
          note => note.id === action.payload.id // revisamos si la nota.id coincide con el id pasado del payload
            ? action.payload.note // si coinciden se modifica la nota
            : note // se envia la nota que no coincide sin modificar
        )
      }
    
    case types.notesDelete:
      return {
        ...state,
        active: null,
        notes: state.notes.filter((note) => note.id !== action.payload )
      }
    
    case types.notesLogoutCleaning:
      return {
        ...state,
        active: null,
        notes: []
      }
    default:
      return state
  }
}