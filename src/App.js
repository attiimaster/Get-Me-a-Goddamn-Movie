import React, { Component } from 'react';
//import { BrowserRouter as Router } from 'react-router-dom';
import { discoverMovies, searchMovies, getGenreId } from './service';
import config from './config';
import './App.css';

import Row from './components/Row';
import Nav from './components/Nav';
import Placeholder from './components/Placeholder';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTest = this.handleTest.bind(this);
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

  async handleSubmit(e) {
    e.preventDefault();

    if(e.target[0][0].selected) {
      const data = await discoverMovies(e.target); 
      console.log('discoverMovies():', data);
      
      this.setState({ results: data.results });

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

  async handleTest(e) {
    console.log('test: state', this.state);
    console.log('test: results.length', this.state.results.length);
    console.log('test: .slice()', this.state.results.slice());

  }

  render() {
    const { results, popular, playing, upcoming } = this.state;
              
    return (
      <div className='App'>

        <Nav handleSubmit={ this.handleSubmit } />

        { /* <button onClick={ this.handleTest }>test</button> */ }
        
        <Placeholder genres={ this.state.genres } />
        
        { 
          results ? <Row rowTitle='results' results={ results } />
            : 
          <div>
            { popular ? <Row rowTitle='popular' results={ popular } /> : null }
    
            { playing ? <Row rowTitle='playing right now' results={ playing } /> : null }
    
            { upcoming ? <Row rowTitle='upcoming' results={ upcoming } /> : null }
          </div>
        }

      </div>
    );
  }
}

export default App;
