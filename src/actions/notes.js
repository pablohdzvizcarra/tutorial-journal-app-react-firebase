import { db } from "../firebase/firebase-config";
import {types} from '../types/types';
import { loadNotes } from "../helpers/loadNotes";
import Swal from 'sweetalert2'
import { fileUpload } from "../helpers/fileUpload";



// creando nuevas notas
export const startNewNote = () => {

  // podemos obtener todo el state con la funcion getState gracias a reduxThunk
  return async (dispatch, getState) => {

    // obtenemos el id del usuario
    const { uid } = getState().auth;
    
    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime()
    }

    try {
      
      // agregamos la nota a firestore
      const doc = await db.collection(`${uid}/journal/notes`).add(newNote);

      // se agrega la nota al state active
      dispatch(activeNote(doc.id, newNote));
  
      // modificamos el state con la nueva nota
      dispatch(addNewNote(doc.id, newNote));

    } catch (error) {
      console.log(error);
      
    }


  }
}

export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note
  }
});

export const addNewNote = (id, note) => ({
  type: types.notesAddNew,
  payload: {
    id,
    ...note
  }
});

export const startLoadingNotes = (uid) => {
  return async (dispatch) => {

    // se obtienen las notas mediante el helper
    const notes = await loadNotes(uid);

    // se cargan las notes al state mediante el helper y action y reducer
    dispatch(setNotes(notes));
  } 
}

export const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: notes
})

export const startSaveNote = (note) => {
  return async (dispatch, getState) => {

    // se obtiene el acceso por el id unico del usuario
    const { uid } = getState().auth;

    // comprobacion de la propiedad url de note
    if (!note.url) {
      delete note.url;
    }

    // objeto creado con spread con todos los datos
    const noteToFirestore = { ...note };

    // elimina el id del objeto
    delete noteToFirestore.id;

    // se obtiene la referencia al documento especificando la ruta
    await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);

    // se ejecuta un dispatch para refrescar las notas del sidebar
    dispatch(refreshNote(note.id, noteToFirestore));
    Swal.fire('Nota guardada', note.title, 'success');
  }
}

export const refreshNote = (id, note) => ({

  type: types.notesUpdate,
  payload: {
    id,
    note: {
      id, 
      ...note
    }
  }
})

export const startUploading = (file) => {
  return async (dispatch, getState) => {

    const { active: activeNote } = getState().notes;

    // alerta cuando empieza a cargar la imagen
    Swal.fire({
      title: 'Cargando...',
      text: 'Espere un momento...',
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    })

    // helper para obtener el link de la imagen subida
    const fileUrl = await fileUpload(file);

    // agregando el url a la nota activa
    activeNote.url = fileUrl;
    
    // grabando la nota 
    dispatch(startSaveNote(activeNote));

    // se cierra la alerta
    Swal.close();
  }
}

export const startDeleting = (id) => {
  return async (dispatch, getState) => {

    // obtener state de redux
    const uid = getState().auth.uid;

    // eliminando la nota de firebase con su url
    await db.doc(`${uid}/journal/notes/${id}`).delete();

    // se ejecuta la action y se envia al reducer
    dispatch(deleteNote(id));

  }
}

export const deleteNote = (id) => ({
  type: types.notesDelete,
  payload: id
});

// action
export const noteLogout = () => ({
  type: types.notesLogoutCleaning
  
});