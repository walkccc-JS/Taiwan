import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import User from './components/user/User';
import UpdateUser from './components/user/UpdateUser';
import Dashboard from './components/dashboard/Dashboard';
import ProjectDetails from './components/projects/ProjectDetails';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CreateProject from './components/projects/CreateProject';
import UpdateProject from './components/projects/UpdateProject';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/projects/:id' component={ProjectDetails} />
            <Route path='/edit/:id' component={UpdateProject} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/create' component={CreateProject} />
            <Route path='/user/edit/:id' component={UpdateUser} />
            <Route path='/user/:id' component={User} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;