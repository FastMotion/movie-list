import React from 'react'
import MovieItem from './MovieItem'
import MovieTabs from './MovieTabs'
import {API_URL,API_KEY_3,API_KEY_4} from '../../utils/api'


class Main extends React.Component {

  state = {
    movies: [],
    moviesWillWatch: [],
    sort_by: 'vote_count.desc',
    pageSize: 20,
    totalCount: 0,
    currentPage:1
  }

  componentDidMount(){
    this.getMovies()
  }

  componentDidUpdate(prevProps,prevState) {
    if (prevState.sort_by !== this.state.sort_by) {
      this.getMovies()
    }
  }

  getMovies = () => {
     fetch(`${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${this.state.sort_by}&page=${this.state.currentPage}&total_pages=${this.state.totalCount}`)
       .then((resp)=>{
         return resp.json()})
       .then((data)=> {
         this.setState({movies: data.results})
         this.setState({totalCount: data.total_pages})
       })
   }


  addMoviesWillWatch = (movie) => {
    const updateMoviesWillWatch = [...this.state.moviesWillWatch, movie]
    this.setState({moviesWillWatch: updateMoviesWillWatch})
  }

  deleteMoviesWillWatch = (movie) => {
    const updateMoviesWillWatch = this.state.moviesWillWatch.filter( movies => {
      return movies.id !== movie.id })
    this.setState({ moviesWillWatch: updateMoviesWillWatch })
  }

  deleteMovies = (movie) => {
    const updateMovies = this.state.movies.filter( movies => {
      return movies.id !== movie.id })
    this.setState({ movies: updateMovies })
  }

  updateSortBy = (value) => {
    this.setState({
      sort_by:value
    })
  }

  onPageChanged =(page) => {
    if (this.state.currentPage !== page){
      this.setState({currentPage: page})
      fetch(`${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${this.state.sort_by}&page=${this.state.currentPage}&total_pages=${this.state.totalCount}`)
      .then((resp)=>{
        return resp.json()})
      .then((data)=> {
        this.setState({movies: data.results})
      })
    }
    console.log('page',page)
    console.log('data', this.state.movies)
  }


  render() {
    let {totalCount,pageSize,sort_by,currentPage,movies,moviesWillWatch} = this.state
    let pagesCount = Math.ceil(totalCount/pageSize)
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i)
    }
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-11'>
            <div className='row mb-4'>
              <div className='col-12'>
                <MovieTabs
                  sort_by = {sort_by}
                  updateSortBy = {this.updateSortBy}
                />
              </div>
            </div>
            <div className='row mb-4'>
              <div className='col-12'>
               <ul className="pagination ">
                 <li  className={`page-item active ${currentPage === 1? 'disabled': ''}`}>
                   <a className="page-link" href="#" >Previous</a>
                 </li>
                 {pages.map((page)=> <li key={page} className={`page-item page-option ${currentPage === page? 'active': ''}`} onClick={() => this.onPageChanged(page)}><a href='#' className='page-link' >{page}</a></li> )}
                 <li className={`page-item active ${currentPage === pagesCount? 'disabled active': ''}`}>
                   <a className="page-link" href="#">Next</a>
                 </li>
               </ul>
              </div>
            </div>
            <div className="row">
            {movies.map(movie => {
              return (
                <div className='col-5 mb-4' key={movie.id}>
                  <MovieItem
                    movie={movie}
                    deleteMovies={this.deleteMovies}
                    addMoviesWillWatch ={this.addMoviesWillWatch}
                    deleteMoviesWillWatch = {this.deleteMoviesWillWatch}
                  />
                </div>)
            })}
            </div>
          </div>
          <div className='col-1'>
            <p>Will Watch:{moviesWillWatch.length}</p>
          </div>
        </div>
      </div>
    )
  }
}
export default Main