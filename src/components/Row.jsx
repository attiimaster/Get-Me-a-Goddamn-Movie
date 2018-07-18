import React from 'react';
import Box from './Box';
import './css/Row.css';

const Row = (props) => {
	const { query, rowTitle, getDetails, handlePagination } = props;
	let arr = [];

	if(query.results) {

		for (let i=0; i<query.total_pages; i++) {
			arr.push(i);
		}
		return(
			<div className='row'>
				<h3 className='row-title'>{ rowTitle }</h3>
				<div className='slider'>
					{ query.results.map((item, i) => <Box { ...item } getDetails={ getDetails } key={i} />) }
				</div>
				<div className="page-btns">
					{ arr.map((i) => <div onClick={ handlePagination } className={ query.page === i+1 ? "page-btn page-btn-active" : "page-btn" } value={ i+1 }>{ i+1 }</div> ) }
				</div>
			</div>
		)
	} else { 
		return <div className='row'>Row: Oops, something went wrong. Please try again.</div> 
	}	
}

export default Row;