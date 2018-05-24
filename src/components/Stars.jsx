import React, { Component } from 'react';
import './css/Stars.css';

const Stars = (props) => {
	console.log('Stars:', props);
	const { votes } = props;

	return(
		<div className='stars-container'>

			{ votes > 1 ? <i className='fas fa-star'></i> : <i className='far fa-star'></i> }
			{ votes > 3 ? <i className='fas fa-star'></i> : <i className='far fa-star'></i> }
			{ votes > 5.5 ? <i className='fas fa-star'></i> : <i className='far fa-star'></i> }
			{ votes > 7.5 ? <i className='fas fa-star'></i> : <i className='far fa-star'></i> }
			{ votes >= 8.8 ? <i className='fas fa-star'></i> : <i className='far fa-star'></i> }

		</div>
	)
}

export default Stars;