import React, { Component } from 'react';
import './css/Nav.css';

const Nav = (props) => {
  return(
    <div className='nav'>
      <h2>Get Me a Goddamn Movie!</h2>

      <form onSubmit={props.handleSubmit}>
  
        <select name='searchBy'>
          <option value='person'>person</option>
          <option value='movie'>movie</option>
        </select> 
        <input type='text' name='text' placeholder='actor' />
  
        <input type='text' name='genre' placeholder='genre' />
        <input type='number' name='year' placeholder='year' />
        
        <select name='sortBy'>
          <option value='rating'>rating</option>
          <option value='popularity'>popularity</option>
          <option value='revenue'>revenue</option>
        </select>
  
        <button type='submit'><i className='fas fa-search'></i></button>

      </form>
    </div>
  )
}
export default Nav;