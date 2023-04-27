import React, {Component} from "react";
import {Routes, Route, Link} from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import FilmsList from "./components/films-list.component";
import Film from "./components/film.component";

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/films"} className="navbar-brand">Star Wars</Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/films"} className="nav-link">Films</Link>
            </li>
          </div>
        </nav>
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<FilmsList/>}/>
            <Route path="/films" element={<FilmsList/>}/>
            <Route path="/films/:id" element={<Film/>}/>
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
