import config from './config';

export function searchMovies(formdata, page) {
    const queryStr = '&query=' + formdata[1].value + '&page=' + page;  //substitute space with +?
    const url = config.API_URL + 
                '/search/movie' +           
                config.API_KEY + 
                queryStr;   
    
    console.log(url);         
    return fetch(url);
}

export async function discoverMovies(formdata, page) {
	let url;
	if (formdata[1].value) {
		const actorRes = await getActorId(formdata[1].value);
		const actorData = await actorRes.json();
		console.log('actor:', actorData.results[0].name);
		url = assembleURL(formdata, page, actorData.results[0].id);
	} else {
		url = assembleURL(formdata, page);
	}

	return fetch(url)
}

export async function getOverlayInfo(id) {
  	const details = await fetch(config.API_URL + '/movie/' + id + config.API_KEY);
  	const detailsJSON = await details.json();
  	const images = await fetch(config.API_URL + '/movie/' + id + '/images' + config.API_KEY);
  	const imagesJSON = await images.json();
  	//const recommendations = await fetch();		//get Recommendations /movie/{movie_id}/recommendations
  	//const recommendationsJSON = await fetch();
	
  	return new Promise((resolve, reject) => {
  		if(detailsJSON && imagesJSON) {
  			resolve({ details: detailsJSON, images: imagesJSON.backdrops })	// , recommendations: recommendationsJSON.results
  		}
  	})
}

//--------------------------------------------------------------------------------------------------------
export function getActorId(actor) {
	const url = config.API_URL + 
    			'/search/person' +           
    			config.API_KEY + 
    			'&query=' + actor; 

	return fetch(url);
}

export function getGenreId(genre) {
	const url = config.API_URL + 
    			'/genre/movie/list' +           
    			config.API_KEY

    return fetch(url);
}

export function assembleURL(formdata, page, actorId) {

	const actors = formdata[1].value ? '&with_cast=' + actorId : '';
	const genre = formdata[2].value ? '&with_genres=' + formdata[2].value : '';
	const year = formdata[3].value ? '&primary_release_year=' + formdata[3].value : '';
	const pageNumber = '&page=' + page;
	const sortBy = (options) => {
		if(options[0].selected) return '&sort_by=popularity.desc';
		if(options[1].selected) return '&sort_by=vote_average.desc';
		if(options[2].selected) return '&sort_by=revenue.desc';
		else console.error('err:', 'returning default.');
	}

	const queryStr = actors + genre + year + pageNumber + sortBy(formdata[4]);

	const url = config.API_URL + 
	    		'/discover/movie' +           
	    		config.API_KEY + 
	    		queryStr; 

	console.log(url);
	return url;	
}

//------------------------------YOUTUBE-------------------------------------------------------------------
export function getYoutubeId(movieTitle) {
	const url = 'https://www.googleapis.com/youtube/v3/search' +
				'?part=snippet' +
				'&q=' + movieTitle + '+trailer+german' +
				'&type=video' +
				'&key=' + config.YT_API_KEY;
	
	return fetch(url);
}

export function redirectToYouTube(movieTitle) {
	getYoutubeId(movieTitle)
		.then(res => res.json())
		.then(data => {
			console.log('YT id:', data.items[0].id.videoId);
			window.open(
				'https://www.youtube.com/watch?v=' + data.items[0].id.videoId,
				'_blank'
			);
		})
}

//--------------------------------------------------------------------------------------------------------

