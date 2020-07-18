import { types } from '../../types/types';


describe('Test in types', () => {
  
  test('should work properly', () => {

    const valueTypes = {
      
      login: '[Auth] Login',
      logout: '[Auth] Logout',
    
      uiSetError: '[UI] Set Error',
      uiRemoveError: '[UI] Remove Error',
      uiStartLoading: '[UI] Start Loading',
      uiFinishLoading: '[UI] Finish Loading',
    
      notesAddNew: '[Notes] New note',
      notesActive: '[Notes] Set active note',
      notesLoad: '[Notes] Load notes',
      notesUpdate: '[Notes] Update note',
      notesFileUrl: '[Notes] Update image url',
      notesDelete: '[Notes] Delete note',
      notesLogoutCleaning: '[Notes] Logout Cleaning',
    
    }
    
    // verificando igualdad entre objetos
    expect(types).toEqual(valueTypes);
  })
  
})
