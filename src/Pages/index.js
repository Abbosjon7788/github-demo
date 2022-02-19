import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import SearchContent from '../Components/SearchContent'
import UserRepo from '../Components/UserRepo'
import History from '../Components/SearchedUsers'

const Pages = () => {
     return (
          <Switch>
               <Route path="/search" component={SearchContent} />
               <Route path="/user-repo/:name" component={UserRepo} />
               <Route path="/history" component={History} />

               <Redirect to='/search' />
          </Switch>
     )
}

export default Pages
