import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import request from 'superagent';

/*
When the dropdown changes, we change this.state.filter
When this.filter changes, we only show the animals that go along with that filter
*/

export default class App extends Component {
  state = { 
    animals: [], 
    filter: '', 
    speciesList: [],
  }

  componentDidMount = async () => {
    const data = await request.get('http://localhost:3000/animals');
    const species = await request.get('http://localhost:3000/species');

    this.setState({ 
      animals: data.body,
      speciesList: species.body
     })
  }

  handleChange = (e) => {
    this.setState({ filter: e.target.value})
  }

  render() {
    console.log('=============================\n')
    console.log('|| this.state.speciesList', this.state.speciesList)
    console.log('\n=============================')
    return (
      <div>
        <select onChange={this.handleChange}>
             <option value="">Show all</option>
            {
              this.state.speciesList.map(
              species => <option value={species.species}>{species.species}</option>

              )
            }
        </select>
        My list:
        {
          this.state.animals
            .filter(animal => {
              if (!this.state.filter) return true;
              
              return animal.species === this.state.filter
            })
            .map(animal => {
            return <div style={{ margin: '10px', border: 'solid 1px black'}} key={animal.id}>
            <Link to={`/animal/${animal.id}`}>
              <p>{animal.name}</p>
              <p>cool factor: {animal.cool_factor}</p>
              <p>species: {animal.species}</p>
            </Link>
            </div>
          })
        }
      </div>
    )
  }
}
