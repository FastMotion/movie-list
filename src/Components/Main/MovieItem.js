import React from 'react'
import { Button } from 'react-bootstrap'
class MovieItem extends React.Component {

  state ={
    willWatch:false
  }

render () {
  let {movie,deleteMovies,addMoviesWillWatch,deleteMoviesWillWatch} = this.props
  return (
    <div className="card">
      <img
        className="card-Img-top"
        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path ||
        movie.poster_path}`}
        alt=""
      />
      <div className="card-body">
        <h6 className="card-title">{movie.title}</h6>
        <div className="d-flex justify-content-between align-items-center">
          <p className="mb-0">Rating: {movie.vote_average}</p>
          {this.state.willWatch?
            (<button type="button"
                     className="btn btn-success"
                     onClick={()=>{
                       this.setState({willWatch:false})
                       deleteMoviesWillWatch(movie)}}>
            Remove Will Watch
          </button>):
            (<button
              type="button"
              className="btn btn-secondary"
              onClick={()=>{
              this.setState({ willWatch:true })
              addMoviesWillWatch(movie)}}
            >
            Will Watch
          </button>)}
        </div>
        <Button onClick={deleteMovies.bind(this, movie)}>delete me</Button>
      </div>
    </div>
  )
}
}

export default MovieItem