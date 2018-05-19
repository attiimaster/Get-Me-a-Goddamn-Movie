import React, { Component } from 'react';
import './css/Nav.css';

const Nav = (props) => {
  
  return(
    <div className='nav'>

      <div className='logo'>Get Me a Goddamn Movie!</div>

      <form onSubmit={props.handleSubmit}>
  
        <select name='searchBy'>
          <option value='person'>actor</option>
          <option value='movie'>movie</option>
        </select> 
        
        <input className='form-query' type='text' name='text' placeholder=' query' required />
        <input className='form-genre' type='text' name='genre' placeholder=' genre' />
        <input className='form-year' type='number' name='year' placeholder=' year' />
        
        <select name='sortBy'>
          <option value='popularity'>popularity</option>
          <option value='rating'>rating</option>
          <option value='revenue'>revenue</option>
        </select>
  
        <button type='submit'><i className='fas fa-search'></i></button>

      </form>
    </div>
  )
}
export default Nav;