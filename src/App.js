import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import User from './components/user/User';
import UpdateUser from './components/user/UpdateUser';
import Dashboard from './components/dashboard/Dashboard';
import Posts from './components/posts/Posts';
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
              <Route exact path='/signin' component={SignIn} />
              <Route exact path='/signup' component={SignUp} />
              <Route exact path='/create' component={AddPost} />

              <Route path='/posts/:id' component={Post} />
              <Route path='/edit/posts/:id' component={UpdatePost} />

              <Route path='/:uid/posts/:id' component={Post} />
              <Route path='/:uid/posts' component={Posts} />
              <Route path='/edit/:uid' component={UpdateUser} />
              <Route path='/:uid' component={User} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;