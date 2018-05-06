import React, { Component } from 'react';
import Box from './Box';
import './css/Row.css';

class Row extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { results } = this.props;
		console.log('row:', this.props)

		if(results) {
			return(
				<div className='row'>
					<h3 className='row-title'>row-title</h3>
					{ results.map(item => <Box { ...item } />) }
				</div>
			)
		} else { 
			return <div className='row'>Row: Oops, something went wrong. Please try again.</div> 
		}	
	}
}

export default Row;