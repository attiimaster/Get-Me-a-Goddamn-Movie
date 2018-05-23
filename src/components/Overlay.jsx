import React, { Component } from 'react';
import './css/Overlay.css';

import { redirectToYouTube } from '../service';
import { IMAGE_API_URL } from '../config';

const Overlay = (props) => {
	const url = IMAGE_API_URL + '/w500';
	const { details, images } = props;
	console.log('Overlay:', props)
	
	return(
		<div className='overlay'>
			
			<div className='backdrop' style={{ backgroundImage: 'url(' + url + details.poster_path + ')' }}>
				<h2 className='overlay-title'>{ details.original_title } ({ details.release_date.slice(0, 4) })
					<div className='overlay-runtime'> 
						{ details.runtime + 'min' }
					</div>
				</h2>

				<h3 className='overlay-tagline'>{ details.tagline }</h3>			
			
				<div className='overlay-text'>		
					{ details.overview }
				</div>
				
				<div className='watch-trailer' onClick={ () => redirectToYouTube(props.original_title) }>
					<i className='fas fa-desktop'></i>
				</div>
			</div>			


			<div className='overlay-img-container'>{ images.map(item => <div className='overlay-imgs' style={{ backgroundImage: 'url(' + url + item.file_path + ')' }}></div>)}</div>

			<i onClick={ () => props.close() } className='far fa-times-circle'></i>

		</div>
	)
}

export default Overlay;