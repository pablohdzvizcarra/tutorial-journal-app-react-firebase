import React from 'react'
import { JournalEntrie } from './JournalEntrie';
import { useSelector } from 'react-redux';

export const JournalEntries = () => {

  const { notes } = useSelector(state => state.notes);

  return (
    <div className="journal__entries" >
      {
        notes.map((note) => (
          <JournalEntrie
            key={note.id}
            {...note}
          />
        ))
      }
    </div>
  )
}
