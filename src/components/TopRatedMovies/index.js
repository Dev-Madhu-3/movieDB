import {useState, useEffect} from 'react'
import Navbar from '../Navbar'
import MovieCard from '../MovieCard'

function TopRatedMovies() {
  const [MoviesList, updateMoviesList] = useState([])

  const apiCall = async () => {
    try {
      const response = await fetch(
        'https://api.themoviedb.org/3/movie/top_rated?api_key=685fff8bd9824a25a6727a6555b1354c&language=en-US&page=1',
      )
      if (response.ok) {
        const data = await response.json()
        updateMoviesList(data.results)
      }
    } catch (error) {
      console.log(`Problem: ${error.message}`)
    }
  }

  useEffect(() => {
    apiCall()
  }, [])

  return (
    // 685fff8bd9824a25a6727a6555b1354c
    <div className="home-container">
      <Navbar />
      <div className="responsive-container">
        <h1 className="home-heading">TopRated</h1>
        <div className="home-popular-movies-container">
          {MoviesList.map(eachItem => (
            <MovieCard key={eachItem.id} movieDetails={eachItem} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default TopRatedMovies
