import React, { Component } from 'react';
import './css/Overlay.css';

import { IMAGE_API_URL } from '../config';

const Overlay = (props) => {
	const url = IMAGE_API_URL + '/w500';
	const { details, images } = props;
	console.log('Overlay:', props)
	
	return(
		<div className='overlay'>
			
			<div className='backdrop' style={{ backgroundImage: 'url(' + url + details.backdrop_path + ')' }}>
				<h2>{ details.original_title }</h2>
				<h3>{ details.tagline }</h3>
			</div>			
			
			<div className='overlay-text'>
				<div>
					{ details.runtime + 'min' } 
					{ details.release_date.slice(0, 4) }
				</div>
				{ details.overview }
			</div>

			<div className='overlay-img-container'>{ images.map(item => <div className='overlay-imgs' style={{ backgroundImage: 'url(' + url + item.file_path + ')' }}></div>)}</div>

			<i onClick={ () => props.close() } className='far fa-times-circle'></i>

		</div>
	)
}

export default Overlay;