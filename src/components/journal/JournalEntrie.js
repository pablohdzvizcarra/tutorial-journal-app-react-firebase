import React from 'react'

export const JournalEntrie = () => {
  return (
    <div className="journal__entry pointer">
      
      <div
        className="journal__entry-picture"
        style={{
          backgroundSize: 'cover',
          backgroundImage: 'url(https://images.unsplash.com/photo-1594398195580-7253c612184b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80)'
        }}
      ></div>

      <div className="journal__entry-body">
        <p className="journal__entry-title">
          Un nuevo dia
        </p>
        <p className="journal__entry-content">
          Lorem ipsum dolor sit amet, consectetur 
        </p>

      </div>
      <div className="journal__entry-date-box">
        <span>Monday</span>
        <h4>28</h4>
      </div>
    </div>
  )
}
