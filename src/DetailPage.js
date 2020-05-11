import React, { Component } from 'react'
import { getAnimal } from './api-calls.js';

export default class DetailPage extends Component {
    state = { animal: null }
    componentDidMount = async () => {
        const fetchedData = await getAnimal(this.props.match.params.id)


        this.setState({ animal: fetchedData })
    }
    render() {
        return (
            <div>
                detail
                <div>
                    { 
                    this.state.animal 
                    ? JSON.stringify(this.state.animal)
                    : 'LOADING LOADING LOADING LOADING'}
                </div>
            </div>
        )

    }
}
