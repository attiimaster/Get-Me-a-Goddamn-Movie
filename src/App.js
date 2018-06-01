import React, { Component } from 'react';
import { discoverMovies, searchMovies, getGenreId, getOverlayInfo } from './service';
import config from './config';
import './App.css';

import Row from './components/Row';
import SliderRow from './components/SliderRow';
import Overlay from './components/Overlay';
import Nav from './components/Nav';
import Placeholder from './components/Placeholder';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      overlay: {
        id: false,
        show: false,
    }};
    this.handleSubmit = this.handleSubmit.bind(this);
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

    if(e.target[0][0].selected) {
      discoverMovies(e.target)
        .then(data => {
          if(data.errors) console.error(data.errors);
          console.log('discoverMovies():', data);
          
          this.setState({ results: data.results });
        });

    } else {
      searchMovies(e.target)
        .then(res => res.json())
        .then(data => {
          if(data.errors) console.error(data.errors);
          console.log('searchMovies():', data);
          
          this.setState({ results: data.results })
      })
    }
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
    const { results, popular, playing, upcoming, overlay } = this.state;
              
    return (
        <div className='App'>

          <Nav handleSubmit={ this.handleSubmit } />
          
          { overlay.show ? <Overlay { ...overlay.data } close={ this.handleBoxClick } /> : null }
          
          <Placeholder genres={ this.state.genres } />
          
          { 
            results ? <Row rowTitle='results' getDetails={ this.handleBoxClick } results={ results } />
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

