import React from 'react';
import './css/Placeholder.css';

const Placeholder = (props) => {
  
  return(
    <div className='placeholder'>
      { props.genres ? props.genres.map((genre, i) =>
      <div className='genre-guide-box' key={i}> 
        <div className='genre-guide-name'>{ genre.name }</div>
        <div className='genre-guide-id'>{ genre.id }</div>
      </div>
      ) : null }
    
      <h1 hidden>Get Me a Goddamn Movie!</h1>

    </div>
  )
}

export default Placeholder;