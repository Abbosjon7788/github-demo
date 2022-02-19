import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import SearchContent from '../Components/SearchContent'
import UserRepo from '../Components/UserRepo'
import UserDetails from '../Components/UserDetails'

const Pages = () => {
     return (
          <Switch>
               <Route path="/search" component={SearchContent} />
               <Route path="/user-repo/:name" component={UserRepo} />
               <Route path="/history/:user" component={UserDetails} />

               <Redirect to='/search' />
          </Switch>
     )
}

export default Pages
