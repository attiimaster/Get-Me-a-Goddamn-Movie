import React, { Component } from 'react';
import './css/Overlay.css';

import Stars from './Stars';
import { redirectToYouTube } from '../service';
import { IMAGE_API_URL } from '../config';

const Overlay = (props) => {
	const url = IMAGE_API_URL + '/w500';
	const { details, images } = props;
	console.log('Overlay:', props);
	
	return(
		<div className='overlay'>
			
			<div className='backdrop' style={{ backgroundImage: 'url(' + url + details.backdrop_path + ')' }}>
				
				<h2 className='overlay-title'>{ details.original_title } ({ details.release_date.slice(0, 4) })

				</h2>

				<div className='overlay-runtime'> 
					<Stars votes={ details.vote_average } />
					{ Math.floor(details.runtime / 60) + ':' }{ details.runtime % 60 + 'h' }
				</div>

				<h3 className='overlay-tagline'>{ details.tagline }</h3>			
			
				<div className='overlay-text'>		
					{ details.overview }
				</div>
				
			</div>			

			<div className='overlay-img-container'>{ images.map((item, i) => <div className='overlay-imgs' key={i} style={{ backgroundImage: 'url(' + url + item.file_path + ')' }}></div>)}</div>
				
			<div className='watch-trailer' onClick={ () => redirectToYouTube(props.original_title) }>
				<i className='fas fa-desktop'></i>
			</div>

			<i onClick={ () => props.close() } className='far fa-times-circle'></i>

		</div>
	)
}

export default Overlay;