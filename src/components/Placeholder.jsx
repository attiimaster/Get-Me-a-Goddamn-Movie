import React from 'react';
import './css/Placeholder.css';

const Placeholder = (props) => {
  console.log(props)
  return(
    <div className='placeholder'>
      <h1>Get Me a Goddamn Movie!</h1>

      { props.genres ? props.genres.map((genre, i) =>
      <div className='genre-guide-box' key={i}> 
        <div className='genre-guide-name'>{ genre.name }</div>
        <div className='genre-guide-id'>{ genre.id }</div>
      </div>
      ) : null }
      
      <div>…genres:</div>
      Action ​28
      Adventure ​12
      Animation ​16
      Comedy ​35
      Crime ​80
      Documentary ​99
      Drama ​18
      Family ​10751
      Fantasy ​14
      History ​36
      Horror ​27
      Music ​10402
      Mystery 9648 
      Romance ​10749
      Science Fiction ​878
      10770 TV Movie
      53 Thriller
      10752 War
      37 Western
    </div>
  )
}

export default Placeholder;