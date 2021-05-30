import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './Screens/Home'
import Login from './Screens/Login'

function routes() {
    return (
        <BrowserRouter> 
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" exact component={Login} />
            </Switch>
        </BrowserRouter>    
    )
}

export default routes
