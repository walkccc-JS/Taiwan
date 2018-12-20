import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Dashboard from './components/dashboard/Dashboard';
import User from './components/user/User';
import UpdateUser from './components/user/UpdateUser';
import Post from './components/posts/Post';
import AddPost from './components/posts/AddPost';
import UpdatePost from './components/posts/UpdatePost';
import ImageUpload from './components/user/ImageUpload';
// import './debug.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header>
            <section className="section is-paddingless">
              <div className="container" >
                <Navbar />
              </div>
            </section>
            <div className="container">
            
              <Switch>
                <Route exact path='/' component={Dashboard} />
                <Route exact path='/signin' component={SignIn} />
                <Route exact path='/signup' component={SignUp} />
                <Route exact path='/create' component={AddPost} />
                <Route exact path='/upload' component={ImageUpload} />

                <Route path='/edit/posts/:pid' component={UpdatePost} />

                <Route path='/:id/posts/:pid' component={Post} />
                <Route path='/edit/:id' component={UpdateUser} />
                <Route path='/:id' component={User} />
              </Switch>
            </div>
          </header>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;