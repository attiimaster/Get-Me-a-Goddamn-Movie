import React, { Component } from 'react';
import './css/Box.css';

import { redirectToYouTube } from '../service';
import { IMAGE_API_URL } from '../config';

const Box = (props) => {
	const imageUrl = IMAGE_API_URL + '/w500' + props.poster_path;
	//console.log(imageUrl);

	return(
		<div className='box' 
			 style={{ backgroundImage: 'url(' + imageUrl + ')' }} 
			 onClick={ () => lol(props) } 
			 target={'_blank'}>

			<div className='box-on-hover'>
				<div className='box-rating'>{props.vote_average}</div>
				<div className='box-title'>{props.original_title}</div>
				<div className='box-date'>{ props.release_date ? props.release_date.slice(0, 4) : null }</div>
				<div className='watch-trailer' onClick={ () => redirectToYouTube(props.original_title) }>
					<i className='fas fa-desktop'></i>
				</div>
			</div>

		</div>
	)
}

export default Box;

function lol(props) {
	console.log(props);
}
// vll redirectToYouTube() doch bei box.onClick