import React from 'react';
import './css/Box.css';

import { redirectToYouTube } from '../service';
import { IMAGE_API_URL } from '../config';

const Box = (props) => {

	const noImgUrl = './images/placeholder-img.jpg';
	const imgUrl = props.poster_path ? 
		IMAGE_API_URL + '/w500' + props.poster_path 
		: 
		noImgUrl;

	return(
		<div onClick={ () => props.getDetails(props.id) } className='box' style={{ backgroundImage: 'url(' + imgUrl + ')' }}>
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