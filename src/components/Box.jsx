import React, { Component } from 'react';
import './css/Box.css';

import { redirectToYouTube } from '../service';

const Box = (props) => {
	//const ytL = getYoutubeId(props.original_title)
	//	.then(res => res.json())
	//	.then(data => console.log(data.items[0].snippet.title))
	const imageUrl = process.env.REACT_APP_IMAGE_API_URL + '/w200' + props.poster_path;
	//const href = 'https://www.youtube.com/watch?v=' + ytL;
	return(
		<div onClick={() => redirectToYouTube(props.original_title)} className='box' style={{ backgroundImage: 'url(' + imageUrl + ')' }} target={'_blank'}>

			<div className='box-rating'>{props.vote_average}</div>

			<div className='box-on-hover'>
				<div className='box-title'>{props.original_title}</div>
				<div className='box-date'>{ props.release_date ? props.release_date.slice(0, 4) : null }</div>
			</div>

		</div>
	)
}

export default Box;

//images via .env + w200/300/500 für größe;