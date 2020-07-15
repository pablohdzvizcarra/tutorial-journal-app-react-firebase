import { db } from "../firebase/firebase-config"


// helper para obtener todas las notas del usuario por su uid
export const loadNotes = async (uid) => {

  // devolvera la data en un array
  const noteSnap = await db.collection(`${uid}/journal/notes`).get();
  const notes = [];

  // forEach para recorrer el array y metodo data() para obtener data de cada elemento
  noteSnap.forEach((note) => {

    // console.log(childSnap.id); mostrar el id de cada elemento
    
    // expresion para unir el id del documento a su data
    notes.push({
      id: note.id,
      ...note.data()
    });
  });

  return notes;
}