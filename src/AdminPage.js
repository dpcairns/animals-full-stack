import React, { Component } from 'react'
import request from 'superagent';
import { addAnimal } from './api-calls.js';

export default class AdminPage extends Component {
    state = {
            name: '',
            artist: '',
            length: 0,
            is_single: false,
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const newAnimal = await addAnimal(this.state)

        this.setState({ sucess: newAnimal })
    }

    handleGeneralChange = (e) => {
        const newState = {}
        newState[e.target.name] = e.target.value;

        this.setState(newState);
    }

    render() {
        const { name, artist, length, is_single } = this.state;

        return (
            <div className="form-container">
                <form onSubmit={this.handleSubmit}>
                    <h3>New Animal</h3>
                    <label>
                        Animal Name
                        <input onChange={this.handleGeneralChange} value={name} name="name" />
                    </label>
                    <label>
                        Artist
                        <input onChange={this.handleGeneralChange} value={artist} name="artist" />
                    </label>
                    <label>
                        Length in miutes
                        <input onChange={this.handleGeneralChange} value={length} name="length" type="number" />
                    </label>
                    <label> 
                        Is a single
                        <input onChange={this.handleGeneralChange} checked={is_single === 'true'} name="is_single" type="radio" value="true" />
                    </label>
                    <label>
                        Is not a single
                        <input onChange={this.handleGeneralChange} checked={is_single === 'false' } name="is_single" type="radio" value="false" />
                    </label>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}
