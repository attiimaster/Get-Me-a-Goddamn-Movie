import config from './config';

export function searchMovies(formdata) {
    const queryStr = '&query=' + formdata[1].value;  //substitute space with +?
    const url = config.API_URL + 
                method(formdata[0]) +           
                config.API_KEY + 
                queryStr;   
    
    console.log(url);         
    return fetch(url);
}

export async function discoverMovies(formdata) {
	let url;
	if (formdata[1].value) {
		const actorRes = await getActorId(formdata[1].value);
		const actorData = await actorRes.json();
		console.log('actor:', actorData.results[0].name);
		url = assembleURL(formdata, actorData.results[0].id);
	} else {
		url = assembleURL(formdata);
	}

	return new Promise((resolve, reject) => {
		let allPages = { results: [] };
		fetch(url)
			.then(res => res.json())
			.catch(err => console.error(err))
			.then(data => {console.log(data)
				allPages.total_pages = data.total_pages;
				allPages.results = data.results;

				if(data.total_pages === 1) {
					return resolve(allPages);
				}
				
				for(let i=2; i<=data.total_pages; i++) {
					fetch(url + '&page=' + i)
						.then(res => res.json())
						.catch(err => console.error(err))
						.then(data => {
							data.results.map(item => allPages.results.push(item))
							
							if(data.page === data.total_pages || data.page === 10) {
								return resolve(allPages);
							}
						})
				}
		})
	})
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
export function method(options) {
  	if(options[0].selected) return '/discover/movie';
  	if(options[1].selected) return '/search/movie';
  	else console.error('service.method:', 'Error: Returned default.');
}

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

export function assembleURL(formdata, actorId) {
	const actors = formdata[1].value ? '&with_cast=' + actorId : '';
	const genre = formdata[2].value ? '&with_genres=' + formdata[2].value : '';
	const year = formdata[3].value ? '&primary_release_year=' + formdata[3].value : '';
	
	const sortBy = (options) => {
		if(options[0].selected) return '&sort_by=popularity.desc';
		if(options[1].selected) return '&sort_by=vote_average.desc';
		if(options[2].selected) return '&sort_by=revenue.desc';
		else console.error('err:', 'returning default.');
	}

	const queryStr = actors + genre + year + sortBy(formdata[4]);

	const url = config.API_URL + 
	    		method(formdata[0]) +           
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

