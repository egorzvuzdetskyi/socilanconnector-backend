import React, {Component} from "react";
import "./App.css";

//libraries
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import jwt_decode from 'jwt-decode';
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStroopwafel} from '@fortawesome/free-solid-svg-icons'


// components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard"
import PrivateRoutes from './components/common/PrivateRoute';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from "./components/edit-profile/EditProfile";
import AddExperience from "./components/add-credentials/AddExperience";
import AddEducation from "./components/add-credentials/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import Post from './components/post/Post';

// store
import store from './store';

//own functions
import {getLocalStorageName, isTokenExpired, setAuthToken} from "./helpers";
import {logoutUser, setCurrentUser} from "./actions/authActions";
import {clearProfile} from "./actions/profileActions";

library.add(faStroopwafel);

if (localStorage.getItem(getLocalStorageName('token'))) {

    const token = localStorage.getItem(getLocalStorageName('token'));

    setAuthToken(token);

    const decoded = jwt_decode(token);

    store.dispatch(setCurrentUser(decoded));

    if (isTokenExpired(decoded)) {
        store.dispatch(clearProfile());
        store.dispatch(logoutUser());

        window.location.href = '/login'
    }
}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Navbar/>
                        <Route exact path="/" component={Landing}/>
                        <div className="container">
                            <Route exact path="/register" component={Register}/>
                            <Route exact path="/login" component={Login}/>
                            <Switch>
                                <PrivateRoutes exact path="/dashboard" component={Dashboard}/>
                            </Switch>
                            <Switch>
                                <PrivateRoutes exact path="/create-profile" component={CreateProfile}/>
                            </Switch>
                            <Switch>
                                <PrivateRoutes exact path="/edit-profile" component={EditProfile}/>
                            </Switch>
                            <Switch>
                                <PrivateRoutes exact path="/add-experience" component={AddExperience}/>
                            </Switch>
                            <Switch>
                                <PrivateRoutes exact path="/add-education" component={AddEducation}/>
                            </Switch>
                            <Switch>
                                <PrivateRoutes exact path="/profiles" component={Profiles}/>
                            </Switch>
                            <Switch>
                                <PrivateRoutes exact path="/profile/:handle" component={Profile}/>
                            </Switch>
                            <Switch>
                                <PrivateRoutes exact path="/feed" component={Posts}/>
                            </Switch>
                            <Switch>
                                <PrivateRoutes exact path="/post/:id" component={Post}/>
                            </Switch>
                        </div>
                        <Footer/>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
