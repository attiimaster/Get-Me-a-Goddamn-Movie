import React, { Component } from 'react';
//import { BrowserRouter as Router } from 'react-router-dom';
import { getActorId, discoverMovies, searchMovies } from './service';
import './App.css';

import Row from './components/Row';
import Nav from './components/Nav';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const formdata = e.target;

    if(e.target[0][0].selected) {
      getActorId(formdata[1].value)
        .then(res => res.json())
        .then(data => 
  
          discoverMovies(data.results[0].id, formdata)  //selects first result 
            .then(res => res.json())
            .then(data => this.setState({ results: data.results }))
        )     
    } else {
      searchMovies(formdata)
        .then(res => res.json())
        .then(data => this.setState({ results: data.results }))
    }
  }

  render() {
    const { results } = this.state;
    const Placeholder = () => {
      return(
        <div className='placeholder'>
          <h2>Find A Movie!</h2>
        </div>
      )
    }
              
    return (
      <div className='App'>

        <Nav handleSubmit={ this.handleSubmit } />
        
        { results ? <Row results={ results } /> : <Placeholder /> }

      </div>
    );
  }
}

export default App;
