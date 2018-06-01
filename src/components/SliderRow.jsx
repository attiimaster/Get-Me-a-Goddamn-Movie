import React from 'react';
import Slider from 'react-slick';
import Box from './Box';
import './css/Row.css';

const SliderRow = (props) => {
	const { results, rowTitle, getDetails } = props;
    const settings = {
      	dots: true,
      	infinite: true,
      	speed: 500,
      	slidesToShow: 6,
      	slidesToScroll: 6,
      	responsive: [
      	  {
      	    breakpoint: 1700,
      	    settings: {
      	      slidesToShow: 5,
      	      slidesToScroll: 5,
      	      infinite: true,
      	      dots: true
      	    }
      	  },
      	  {
      	    breakpoint: 1400,
      	    settings: {
      	      slidesToShow: 4,
      	      slidesToScroll: 4,
      	      infinite: true,
      	      dots: true
      	    }
      	  },
      	  {
      	    breakpoint: 1100,
      	    settings: {
      	      slidesToShow: 3,
      	      slidesToScroll: 3,
      	      infinite: true,
      	      dots: true
      	    }
      	  },
      	  {
      	    breakpoint: 900,
      	    settings: {
      	      slidesToShow: 2,
      	      slidesToScroll: 2,
      	      infinite: true,
      	      dots: true
      	    }
      	  },
      	  {
      	    breakpoint: 640,
      	    settings: {
      	      slidesToShow: 1,
      	      slidesToScroll: 1
      	    }
      	  }
      	]
    };

	if(results) {
		return(
			<div className='row'>
				<h3 className='row-title'>{ rowTitle }</h3>
				<Slider { ...settings }>
					{ results.map((item, i) => <Box { ...item } getDetails={ getDetails } key={i} />) }
				</Slider>
			</div>
		)
	} else { 
		return <div className='row'>SliderRow: Oops, something went wrong. Please try again.</div> 
	}	
}

export default SliderRow;