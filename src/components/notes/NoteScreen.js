import React from 'react'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {
  return (
    <div className="notes__main-content">
      
      <NotesAppBar />

      <div className="notes__content">
        <input
          type="text"
          placeholder="Some awesome"
          className="notes__title-input"
          autoComplete="off"
        />

        <textarea
          placeholder="What hapenned today"
          className="notes__textarea"
        ></textarea>

        <div className="notes__image">
          <img 
            src="https://images.unsplash.com/photo-1594115840401-22b0542479cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=632&q=80"
            alt="Paisaje"
          />
        </div>
      </div>
    </div>
  )
}
