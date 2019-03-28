import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.min.css";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/navbar";
// import MovieDetails from "./components/movieDetails";
import NotFound from "./components/404";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import MovieForm from "./components/movieForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/movie/:id" component={MovieForm} />
            <Route path="/movies" component={Movies} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" to="/movies" exact />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
