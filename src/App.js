import React, { Component } from 'react'
import {
    BrowserRouter as Router, 
    Route, 
    Switch,
} from "react-router-dom";
import ListPage from './ListPage.js';
import DetailPage from './DetailPage.js';
import AdminPage from './AdminPage.js';
import './App.css';

export default class App extends Component {
    render() {
        return (
            <div className="container">
                <Router>
                    <Switch>
                        <Route 
                            path="/" 
                            exact
                            render={(routerProps) => <ListPage {...routerProps} />} 
                        />
                        <Route 
                            path="/animal/:id" 
                            render={(routerProps) => <DetailPage {...routerProps} />} 
                        />
                        <Route 
                            path="/admin" 
                            render={(routerProps) => <AdminPage {...routerProps} />} 
                        />
                    </Switch>
                </Router>
            </div>
        )
    }
}
