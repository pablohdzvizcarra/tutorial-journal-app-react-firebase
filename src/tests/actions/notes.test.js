import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'; // importamos thunk
import { startNewNote, activeNote, startLoadingNotes, startSaveNote, startUploading } from '../../actions/notes';
import '@testing-library/jest-dom';
import { types } from '../../types/types';
import { db } from '../../firebase/firebase-config';
import { fileUpload } from '../../helpers/fileUpload';

// creamos un mock de la function fileUpload
jest.mock('../../helpers/fileUpload', () => ({
  fileUpload: jest.fn(() => {
    return 'https://testing.com/test.jpg';
  })
}));

const middlewares = [thunk]; // redux-mock-store
const mockStore = configureStore(middlewares); // redux-mock-store 

// state inicial del store
const initState = {
  auth: {
    uid: 'testing'
  },

  notes: {

    active: {
      id: 'df0SsiOCivK0KoFrEhSG',
      title: 'Hola Mundo',
      body: 'JavaScript'
    }
  }
}

// creamos el store para los test
let store = mockStore(initState);

describe('test in action notes', () => {

  // este bucle se ejecutara en cada test, al finalizarlo
  beforeEach(() => {

    // con esta accion se devuelve el store a su estado inicial
    store = mockStore(initState)
  })


  test('should create new note startNewNote', async () => {
    
    // ejecutamos el dispatch a la store con el action 
    await store.dispatch(startNewNote());

    // obetenemos las actions que se ejcutaron
    const actions = store.getActions();
    // console.log(actions);

    // probamos que el action sea igual a la mostrada de la consola
    expect(actions[0]).toEqual({
      type: types.notesActive,
      payload: {
        id: expect.any(String),
        title: '',
        body: '',
        date: expect.any(Number)
      }
    });

    expect(actions[1]).toEqual({
      type: types.notesAddNew,
      payload: {
        id: expect.any(String),
        title: '',
        body: '',
        date: expect.any(Number)
      }
    });

    // Limpiando los documentos creados en firebase

    // obtenemos el id del documento creado
    const docId = actions[0].payload.id;

    // delete del documento en firebase
    await db.doc(`testing/journal/notes/${docId}`).delete();

  })

  test('startLoadingNotes should load notes', async () => {

    await store.dispatch(startLoadingNotes('testing'));

    const actions = store.getActions();
    

    expect(actions[0]).toEqual({
      type: types.notesLoad,
      payload: expect.any(Array)
    })

    // console.log(actions[0].payload[0]);

    const expected = {
      id: expect.any(String),
      title: expect.any(String),
      body: expect.any(String),
      date: expect.any(Number),

    }

    expect(actions[0].payload[0]).toMatchObject(expected);
    
  });

  test('should update note', async () => {

    const note = {
      id: 'df0SsiOCivK0KoFrEhSG',
      title: 'titulo',
      body: 'body'
    }

    await store.dispatch(startSaveNote(note));
    const actions = store.getActions();
    // console.log(actions);

    // se obtiene el id del store
    const storeID =  store.getState().auth.uid;

    expect(actions[0].type).toBe(types.notesUpdate);

    const docRef = await db.doc(`${storeID}/journal/notes/${note.id}`).get();

    // recuerda para extraer la data de un doc usa el metodo data()
    // console.log(docRef.data());

    expect(docRef.data().title).toBe(note.title);
  })

  test('startUploading should update entry url', async () => {


    // creamos una foto fitcticia
    const file = new File([], 'foto.jpg'); 

    // se ejecuta el action para cargar la foto
    await store.dispatch(startUploading(file));

    // se obtiene el id del store
    const storeID =  store.getState().auth.uid;

    // hacemos referencia al doc de firestore
    const docRef = await db.doc(`${storeID}/journal/notes/df0SsiOCivK0KoFrEhSG`).get();
    // console.log(docRef.data());

    expect(docRef.data().url).toBe('https://testing.com/test.jpg');
    
  })
  
})
