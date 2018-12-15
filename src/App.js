import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import User from './components/user/User';
import UpdateUser from './components/user/UpdateUser';
import Dashboard from './components/dashboard/Dashboard';
import Post from './components/posts/Post';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import AddPost from './components/posts/AddPost';
import UpdatePost from './components/posts/UpdatePost';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path='/' component={Dashboard} />
              <Route path='/posts/:id' component={Post} />
              <Route path='/edit/:id' component={UpdatePost} />
              <Route path='/signin' component={SignIn} />
              <Route path='/signup' component={SignUp} />
              <Route path='/create' component={AddPost} />
              <Route path='/user/edit/:id' component={UpdateUser} />
              <Route path='/user/:id' component={User} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;