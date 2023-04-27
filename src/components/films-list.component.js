import React, {Component} from "react";
import FilmsDataService from "../service/film.service"
import {Link} from "react-router-dom";

export default class FilmsList extends Component {
  constructor(props) {
    super(props);
    this.retrieveFilms = this.retrieveFilms.bind(this);
    this.setActiveFilm = this.setActiveFilm.bind(this);

    this.state = {
      films: [],
      currentFilm: null,
      currentIndex: -1
    };
  }

  componentDidMount() {
    this.retrieveFilms();
  }

  retrieveFilms() {
    FilmsDataService.getAll()
      .then(response => {
        this.setState({
          films: response.data.results
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  setActiveFilm(film, index) {
    this.setState({
      currentFilm: film, currentIndex: index
    });
  }

  render() {
    const {films, currentFilm, currentIndex} = this.state;
    return (
      <div className="list row mt-5">
        <div className="col-md-6">
          <h4>Films</h4>
          <ul className="list-group">
            {films && films.map((film, index) => (
              <li
                className={
                  `list-group-item ${(index === currentIndex) ? 'active' : ''}`
                }
                style={{cursor: "pointer"}}
                onClick={() => this.setActiveFilm(film, index)}
                key={index}>{film.title}</li>
            ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentFilm ? (
            <div className="card" style={{width: "100%"}}>
              <div className="card-body">
                <img src="https://dummyimage.com/400x450" className="m-3" alt="image star war"/>
                <h5 className="card-title">{currentFilm.title}</h5>
                <h6 className="card-subtitle text-muted mt-1">Director: {currentFilm.director}</h6>
                <p className="card-text mt-3">{currentFilm.opening_crawl}</p>
                <Link className="btn btn-primary" to={`/films/${currentIndex + 1}`}>Details</Link>
              </div>
            </div>
          ) : (
            <div>
              <br/>
              <p>Please click on a Film name</p>
            </div>
          )}
        </div>
      </div>
    );
  }

}