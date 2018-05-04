export function searchMovies(formdata) {
    const queryStr = '&query=' + formdata[1].value;  //substitute space with +?
    const url = process.env.REACT_APP_API_URL + 
                method(formdata[0]) +           
                process.env.REACT_APP_API_KEY + 
                queryStr;   
    
    console.log(url);         
    return fetch(url)
}

export function getActorId(actor) {
	const url = process.env.REACT_APP_API_URL + 
    			'/search/person' +           
    			process.env.REACT_APP_API_KEY + 
    			'&query=' + actor; 

	return fetch(url)
}

export function discoverMovies(actorId, formdata) {
	const actors = formdata[1].value ? '&with_people=' + actorId : '';
	const genre = formdata[2].value ? '&with_genres=' + formdata[2].value : '';
	const year = formdata[3].value ? '&primary_release_year=' + formdata[3].value : '';
	
	const sortBy = (options) => {
		if(options[0].selected) return '&sort_by=vote_average';
		if(options[1].selected) return '&sort_by=popularity';
		if(options[2].selected) return '&sort_by=revenue';
		else console.error('err:', 'returning default.');
	}

	const queryStr = actors + genre + year + sortBy(formdata[4]);

	const url = process.env.REACT_APP_API_URL + 
	    		method(formdata[0]) +           
	    		process.env.REACT_APP_API_KEY + 
	    		queryStr; 
	
	console.log(url);
	return fetch(url)
}

export function method(options) {
	// could be './search' & './find' & './discover' & './movie'
  	if(options[0].selected) return '/discover/movie';
  	if(options[1].selected) return '/search/movie';
  	else console.error('service.method:', 'Error: Returned default.');
}