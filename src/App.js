import React, { Component } from 'react';
import { discoverMovies, searchMovies, getGenreId, getOverlayInfo } from './service';
import config from './config';
import './App.css';

import Row from './components/Row';
import SliderRow from './components/SliderRow';
import Overlay from './components/Overlay';
import Nav from './components/Nav';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      overlay: { id: false, show: false },
      formdata: undefined,
      query: { results: false, total_results: false, page: false, total_pages: false },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
    this.handleBoxClick = this.handleBoxClick.bind(this);
  }

  componentDidMount() {
    getGenreId('genre')
      .then(res => res.json())
      .then(data => this.setState({ genres: data.genres }))

    //fetch mainpage data
    fetch(config.API_URL + '/movie/popular' + config.API_KEY)
      .then(res => res.json())
      .then(data => this.setState({ popular: data.results }))

    fetch(config.API_URL + '/movie/now_playing' + config.API_KEY)
      .then(res => res.json())
      .then(data => this.setState({ playing: data.results }))

    fetch(config.API_URL + '/movie/upcoming' + config.API_KEY)
      .then(res => res.json())
      .then(data => this.setState({ upcoming: data.results }))
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("x", e.target)
    this.setState({ formdata: e.target })

    if (e.target[0][0].selected) {
      discoverMovies(e.target, 1)
      .then(res => res.json())
      .then(data => {
        if(data.errors) console.error(data.errors);
        console.log('discoverMovies():', data);
        this.setState({ query: data });
      })

    } else if (e.target[0][1].selected) {
      searchMovies(e.target, 1)
        .then(res => res.json())
        .then(data => {
          if(data.errors) console.error(data.errors);
          console.log('searchMovies():', data);
        this.setState({ query: data });
      })
    } else { alert("Oops, something went wrong!") }
  }

  handlePagination(e) {
    const formdata = this.state.formdata;

    if (formdata[0][0].selected) {
      discoverMovies(formdata, e.target.innerHTML)
      .then(res => res.json())
      .then(data => {
        if(data.errors) console.error(data.errors);
        console.log('discoverMovies():', data);
        this.setState({ query: data });
      })

    } else if (formdata[0][1].selected) {
      searchMovies(formdata, e.target.innerHTML)
        .then(res => res.json())
        .then(data => {
          if(data.errors) console.error(data.errors);
          console.log('searchMovies():', data);
        this.setState({ query: data });
      })
    } else { alert("Oops, something went wrong!") }
  }

  handleBoxClick(id) {
    if(this.state.overlay.show) {
      this.setState({ overlay: { show: false, id: false } });
    } else {
      getOverlayInfo(id)
        .then(data => this.setState({ overlay: { data: data, show: true, id: id } }));
    }
  }

  render() {
    const { query, popular, playing, upcoming, overlay, genres } = this.state;
              
    return (
        <div className='App'>

          <Nav handleSubmit={ this.handleSubmit } genres={ genres }/>

          <div className="guide">
            <div><em>Quickguide</em></div>
            <small>To discover movies select actor. You may choose to omit the "name-input".</small>
            <br />
            <small>To search for specific movies select movie. The "name-input" is required. Other filter options are disabled. </small>
          </div>
          
          { overlay.show ? <Overlay { ...overlay.data } close={ this.handleBoxClick } /> : null }
          
          { 
            query && query.results ? <Row rowTitle='results' getDetails={ this.handleBoxClick } handlePagination={ this.handlePagination } query={ query } />
              : 
            <div>
              { popular ? <SliderRow rowTitle='popular' getDetails={ this.handleBoxClick } results={ popular } /> : null }
      
              { playing ? <SliderRow rowTitle='playing right now' getDetails={ this.handleBoxClick } results={ playing } /> : null }
      
              { upcoming ? <SliderRow rowTitle='upcoming' getDetails={ this.handleBoxClick } results={ upcoming } /> : null }
            </div>
          }

          <div className='footer'>
            A small app to cut down the time to find movies worth watching. 
            It relies on the <strong>TMDB API</strong> for data and uses <strong>YouTube</strong> to get the trailer (not 100% foolproof yet). 
            <a href='https://github.com/attiimaster/Get-Me-a-Goddamn-Movie' target='_blank' rel='noopener noreferrer'>
              <i className='fab fa-github'></i>
            </a>
          </div>

        </div>
    );
  }
}

export default App;

