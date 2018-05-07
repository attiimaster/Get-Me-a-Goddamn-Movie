import React, { Component } from 'react';
//import { BrowserRouter as Router } from 'react-router-dom';
import { getActorId, discoverMovies, searchMovies, getGenreId, fetchAdditionalPages, assembleURL } from './service';
import './App.css';

import Box from './components/Box';
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
    getGenreId('action')
      .then(res => res.json())
      .then(data => this.setState({ genres: data.genres }))
  }

  async handleSubmit(e) {
    e.preventDefault();
    const formdata = e.target;

    if(formdata[0][0].selected) {
      const data = await discoverMovies(formdata); 
      console.log('discoverMovies():', data);
      
      this.setState({ results: data.results });

    } else {
      searchMovies(formdata)
        .then(res => res.json())
        .then(data => {
          if(data.errors) console.error(data.errors);
          console.log('searchMovies():', data);
          
          this.setState({ results: data.results })
      })
    }
  }

  async handleTest(e) {
    console.log('test:', this.state);
    console.log('test:', this.state.results.length);
    console.log('test: .slice()', this.state.results.slice());

  }

  render() {
    const { results } = this.state;
              
    return (
      <div className='App'>

      <input type="button" onClick={ this.handleTest } />

        <Nav handleSubmit={ this.handleSubmit } />
        
        { results ? <Row results={ results } />
         :
        <Placeholder genres={ this.state.genres } /> }

      </div>
    );
  }
}

export default App;
