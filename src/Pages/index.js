import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import SearchContent from '../Components/SearchContent'
import UserInfo from '../Components/UserInfo'
import History from '../Components/SearchedUsers'

const Pages = () => {
     return (
          <Switch>
               <Route path="/search" component={SearchContent} />
               <Route path="/user-info" component={UserInfo} />
               <Route path="/history" component={History} />

               <Redirect to='/search' />
          </Switch>
     )
}

export default Pages
