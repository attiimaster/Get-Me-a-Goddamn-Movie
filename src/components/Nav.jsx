import React from 'react';
import './css/Nav.css';

const Nav = (props) => {
  
  return(
    <div className='nav'>

      <div className='logo'>Get Me a Goddamn Movie!</div>

      <form onSubmit={props.handleSubmit}>
  
        <select name='searchBy'>
          <option value='person'>Discover</option>
          <option value='movie'>Search</option>
        </select> 
        
        <input className='form-query' type='text' name='text' placeholder='name'/>
                
        <select>
          <option value="">Genre</option>
          { props.genres ? props.genres.map((g, i) => <option value={ g.id }>{ g.name }</option>) : null }
        </select>

        <input className='form-year' type='number' name='year' placeholder='year' />
        
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