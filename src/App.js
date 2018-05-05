import React, { Component } from 'react';
//import { BrowserRouter as Router } from 'react-router-dom';
import { getActorId, discoverMovies, searchMovies, getGenreId } from './service';
import './App.css';

import Row from './components/Row';
import Nav from './components/Nav';
import Placeholder from './components/Placeholder';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    getGenreId('action')
      .then(res => res.json())
      .then(data => this.setState({ genres: data.genres }))
  }

  handleSubmit(e) {
    e.preventDefault();
    const formdata = e.target;

    if(e.target[0][0].selected) {
      getActorId(formdata[1].value)
        .then(res => res.json())
        .then(data => {
          if(data.errors) console.error(data.errors);
          console.log(data.results[0].name);
          
          discoverMovies(data.results[0].id, formdata)  //selects first result 
            .then(res => res.json())
            .then(data => {
              if(data.errors) console.error(data.errors);
              console.log(data.results);
              
              this.setState({ results: data.results })
          })
        })     
    } else {
      searchMovies(formdata)
        .then(res => res.json())
        .then(data => {
          if(data.errors) console.error(data.errors);
          console.log(data.results);
          
          this.setState({ results: data.results })
      })
    }
  }

  render() {
    const { results } = this.state;
              
    return (
      <div className='App'>

        <Nav handleSubmit={ this.handleSubmit } />
        
        { results ? <Row results={ results } />
         :
        <Placeholder genres={this.state.genres} /> }

      </div>
    );
  }
}

export default App;
