import React,{useState, useEffect} from 'react'
import MovieItem from './MovieItem'
import MovieTabs from './MovieTabs'
import {API_URL,API_KEY_3,API_KEY_4} from '../../utils/api'




function useMoviesWillWatch () {

    const [moviesWillWatch, setMoviesWillWatch] = useState([])
    const addMoviesWillWatch = (movie) => {
        const updateMoviesWillWatch = [...moviesWillWatch, movie]
        setMoviesWillWatch(updateMoviesWillWatch)
    }

    const deleteMoviesWillWatch = (movie) => {
        const updateMoviesWillWatch = moviesWillWatch.filter( movies => {
            return movies.id !== movie.id })
        setMoviesWillWatch(updateMoviesWillWatch )
    }
    return {
      moviesWillWatch,
      deleteMoviesWillWatch,
      addMoviesWillWatch
    }
}

function useMovies() {
    const [movies, setMovies] = useState([])
    const [totalCount, setTotalCount] = useState(0)
    const getMovies = ({sort_by, currentPage, totalCount }) => {
        fetch(`${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${sort_by}&page=${currentPage}&total_pages=${totalCount}`)
            .then((resp)=>{
                return resp.json()})
            .then((data)=> {
                setMovies(data.results)
                setTotalCount(data.total_pages)
            })
    }

    const deleteMovies = (movie) => {
        const updateMovies = movies.filter( movies => movies.id !== movie.id )
        setMovies(updateMovies)
    }
    return {movies, deleteMovies, getMovies,totalCount}
}


function Main () {

  const {movies,deleteMovies,getMovies,totalCount} = useMovies()
  const {moviesWillWatch, deleteMoviesWillWatch, addMoviesWillWatch}=useMoviesWillWatch()
  const [sort_by, setSort_by] = useState('vote_count.desc')
  const [pageSize, setPageSize] = useState(20)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    getMovies({sort_by})
  }, [sort_by])

  const updateSortBy = (value) => {
      setSort_by(value)
  }

  const onPageChanged =(page) => {
    if (currentPage !== page){
      setCurrentPage(page)
        getMovies({sort_by, currentPage, totalCount})
    }
  }

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
                  updateSortBy = {updateSortBy}
                />
              </div>
            </div>
            <div className='row mb-4'>
              <div className='col-12'>
               <ul className="pagination ">
                 <li  className={`page-item active ${currentPage === 1? 'disabled': ''}`}>
                   <a className="page-link" href="#" >Previous</a>
                 </li>
                 {pages.map((page)=> <li key={page} className={`page-item page-option ${currentPage === page? 'active': ''}`} onClick={() => onPageChanged(page)}><a href='#' className='page-link' >{page}</a></li> )}
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
                    deleteMovies={deleteMovies}
                    addMoviesWillWatch ={addMoviesWillWatch}
                    deleteMoviesWillWatch = {deleteMoviesWillWatch}
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
export default Main