import { setError, removeError, startLoading, finishLoading } from "../../actions/ui";
import { types } from "../../types/types";


describe('Test in UI actions', () => {
  

  test('all actions must work', () => {
    
    // creamos el action
    const action = setError('Ayuda');
    const removeErrorAction = removeError();
    const startLoadingAction = startLoading();
    const finishLoadingAction = finishLoading();

    // debe retornar el objeto
    expect(action).toEqual({
      type: types.uiSetError,
      payload: 'Ayuda'
    });

    expect(removeErrorAction).toEqual({
      type: types.uiRemoveError
    });

    expect(startLoadingAction).toEqual({
      type: types.uiStartLoading
    });

    expect(finishLoadingAction).toEqual({
      type: types.uiFinishLoading
    });

  });

  
})
