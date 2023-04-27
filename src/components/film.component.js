import React, {Component} from "react";
import FilmsDataService from "../service/film.service"
import {withRouter} from "../common/with-router";

class Film extends Component {
  constructor(props) {
    super(props);
    this.getFilm = this.getFilm.bind(this);

    this.state = {
      currentFilm: {}, characters: [], errorMessage: ''
    }
  }

  componentDidMount() {
    this.getFilm(this.props.router.params.id);
  }

  getFilm(id) {
    FilmsDataService.get(id)
      .then(async response => {
        console.log(response);
        this.setState({
          currentFilm: response.data
        });
        await this.getCharacters(response.data.characters);
      })
      .catch(e => {
        this.setState({
          errorMessage: e.message
        });
      });
  }

  getCharacters(urls) {
    urls.map(async (url) => {
      await FilmsDataService.getCharacter(url.substring(21)).then(response => {
        this.setState(prevState => ({
          characters: [...prevState.characters, response.data]
        }))
      })
    })
  }

  render() {
    const {currentFilm, characters, errorMessage} = this.state;
    return (<div>
      {currentFilm.title ? (<div>
        <h2 className="mt-3 mb-3">{currentFilm.title}</h2>
        <h5 className="text-muted">Director: {currentFilm.director}</h5>
        <h6 className="text-muted">Producer: {currentFilm.producer}</h6>
        <p className="text-muted mt-3">{currentFilm.opening_crawl}</p>
        <table className="table table-bordered table-hover table-striped">
          <caption>List of characters</caption>
          <thead>
          <tr>
            <th>Name</th>
            <th>Height</th>
            <th>Mass</th>
            <th>hair_color</th>
            <th>skin_color</th>
            <th>eye_color</th>
            <th>birth_year</th>
            <th>gender</th>
          </tr>
          </thead>
          <tbody>
          {characters.map(character => (<tr>
            <td>{character.name}</td>
            <td>{character.height}</td>
            <td>{character.mass}</td>
            <td>{character.hair_color}</td>
            <td>{character.skin_color}</td>
            <td>{character.eye_color}</td>
            <td>{character.birth_year}</td>
            <td>{character.gender}</td>
          </tr>))}
          </tbody>
        </table>
      </div>) : (
        <div>
          <h5>the film with id {this.props.router.params.id} was not found</h5>
          {errorMessage}
        </div>
      )}
    </div>)
  }
}

export default withRouter(Film);