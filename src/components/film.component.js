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

  async componentDidMount() {
    await this.getFilm(this.props.router.params.id);
  }

  async getFilm(id) {
    await FilmsDataService.get(id)
      .then(async response => {
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

  async getCharacters(urls) {
    await urls.map(async (url) => {
      await FilmsDataService.getCharacter(url.substring(21)).then(response => {
        response.data.id = url.substring(28).replaceAll('/', '');
        this.setState(prevState => ({
          characters: [...prevState.characters, response.data]
        }))
      })
    })
  }

  render() {
    const {currentFilm, characters, errorMessage} = this.state;
    return (<div>
      {errorMessage === '' ? (<div>
        <div className="col-md-12">
          <div className="card mb-3 p-5" style={{width: "100%"}}>
            <div className="row g-0">
              <div className="col-md-4">
                <img src={`/images/films/${currentFilm.episode_id}.jpg`} className="img-fluid rounded-start" alt="..."/>
              </div>
              <div className="col-md-8">
                <div className="card-body text-start">
                  <h1 className="card-title">{currentFilm.title}</h1>
                  <p className="card-subtitle text-muted mt-3"><b>Release Date:</b> {currentFilm.release_date}</p>
                  <p className="card-subtitle text-muted"><b>Director:</b> {currentFilm.director}</p>
                  <p className="card-subtitle text-muted"><b>Producer(s):</b> {currentFilm.producer}</p>
                  <p className="card-subtitle text-muted mt-3"><b>Opening Crawl:</b> {currentFilm.opening_crawl}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h3 className="mb-20">Characters</h3>
          <div className="col-md-12" style={{display: "flex", flexWrap: "wrap"}}>
            {
              characters.map(character =>
                (
                  <div className="card m-3" style={{width: "14rem"}}>
                    <img src={`/images/characters/${character.id}.jpg`}
                         onError={({currentTarget}) => {
                           currentTarget.onerror = null;
                           currentTarget.src = "/images/default.jpg"
                         }}
                         className="card-img-top"
                         alt={`${character.id}, ${character.name} - ${currentFilm.title}`}/>
                    <div className="card-body">
                      <h5 className="card-title">{character.name}</h5>
                      <h6 className="card-subtitle text-muted">Birth Year: {character.birth_year}</h6>
                      <h6 className="card-subtitle text-muted">Gender: {character.gender}</h6>
                    </div>
                  </div>
                )
              )
            }
          </div>

        </div>
      </div>) : (<div>
        {errorMessage}
      </div>)}
    </div>)
  }
}

export default withRouter(Film);