import { types } from "../types/types";


export const setError = (error) => ({

  type: types.uiSetError,
  payload: error
});

export const removeError = () => ({

  type: types.uiRemoveError,
});

// action para inidicar la carga
export const startLoading = () => ({
  type: types.uiStartLoading,
    
})

// action para inidicar la carga
export const finishLoading = () => ({
  type: types.uiFinishLoading
    
})