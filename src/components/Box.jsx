import React, { Component } from 'react';
import './css/Box.css';

const Box = (props) => {
	const imageUrl = process.env.REACT_APP_IMAGE_API_URL + '/w200' + props.poster_path;

	return(
		<div className='box' style={{ backgroundImage: 'url(' + imageUrl + ')' }}>

			<div className='box-title'>{props.original_title}</div>

			<div className='box-rating'>{props.vote_average}</div>

			<div className='box-date'>
				{ props.release_date ? props.release_date.slice(0, 4) : null }
			</div>

		</div>
	)
}

export default Box;

//images via .env + w200/300/500 für größe;