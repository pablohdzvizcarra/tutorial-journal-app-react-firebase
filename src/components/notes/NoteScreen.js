import React from 'react'
import { NotesAppBar } from './NotesAppBar'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from '../../hooks/useForm';
import { useEffect } from 'react';
import { useRef } from 'react';
import { activeNote, startDeleting } from '../../actions/notes';

export const NoteScreen = () => {

  const dispatch = useDispatch();

  const { active: note } = useSelector(state => state.notes);

  // hook personalizado para leer la modificacion de los inputs
  const [formValues, handleInputChange, reset] = useForm(note);

  // destructuring de los valores
  const { body, title, id } = formValues;

  // se crea una variable con useRef para que pueda ser mutable y no renderize el componente
  const activeId = useRef(note.id);

  useEffect(() => {

    if (note.id !== activeId.current) {
      reset(note);
      activeId.current = note.id;
    }
  
  }, [note, reset]);

  useEffect(() => {
    
    // se lee la modificacion cuando cambia el valor de los inputs
    dispatch(activeNote(formValues.id, { ...formValues }));

  }, [formValues, dispatch]);


  // eliminar nota con el boton
  const handleDelete = () => {

    // el id se obtiene de formValues ya que la informacion se establece 
    dispatch(startDeleting(id));
  }

  return (
    <div className="notes__main-content">
      
      <NotesAppBar />

      <div className="notes__content animate__animated animate__fadeIn">
        <input
          type="text"
          name='title'
          placeholder="Some awesome"
          className="notes__title-input"
          autoComplete="off"
          value={title}
          onChange={handleInputChange}
        />

        <textarea
          placeholder="What hapenned today"
          className="notes__textarea"
          name='body'
          value={body}
          onChange={handleInputChange}
        ></textarea>

        {/* Carga condicional de la imagen */}
        {
          (note.url) &&

          <div className="notes__image">
          <img 
            src={note.url}
            alt="Paisaje"
          />
          </div>
        }
      </div>

      <button
        className='btn btn-danger'
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  )
}
