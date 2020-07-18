import React from 'react'
import { startSaveNote, startUploading } from '../../actions/notes'
import { useDispatch, useSelector } from 'react-redux'

export const NotesAppBar = () => {

  const dispatch = useDispatch();
  const { active } = useSelector(state => state.notes);
  

  const handleSave = () => {
    dispatch(startSaveNote(active));
  }

  const handlePictureClicc = () => {

    // simulamos el click al boton de picture
    document.querySelector('#fileSelector').click();
  }

  const handleFileChange = (event) => {

    // obtenemos el archivo que subimos al navegador mediando el evento
    const file = event.target.files[0];

    if (file) {
      dispatch(startUploading(file));
    }
  }

  return (
    <div className="notes__appbar">
      <span>13 de Julio de 2020</span>

      {/* se oculta el input por estetica con display 'none' */}
      <input
        id='fileSelector'  
        type='file'
        name='file'
        style={{display: 'none'}}
        onChange={handleFileChange}
      />

      <div>
        <button
          className="btn"
          onClick={handlePictureClicc}
        >
          Picture
        </button>

        <button
          className="btn"
          onClick={handleSave}
        >
          Save
        </button>
      </div>

    </div>
  )
}
