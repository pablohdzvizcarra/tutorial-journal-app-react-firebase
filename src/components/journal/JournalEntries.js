import React from 'react'
import { JournalEntrie } from './JournalEntrie';

export const JournalEntries = () => {

  const entries = [1, 2, 3, 4, 5];

  return (
    <div className="journal__entries">
      {
        entries.map((value) => (
          <JournalEntrie key={value} />
        ))
      }
    </div>
  )
}
