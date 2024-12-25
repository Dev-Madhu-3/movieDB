import './index.css'
import {Link} from 'react-router-dom'

function MovieCard(props) {
  const {movieDetails} = props
  const {
    title,
    poster_path: posterPath,
    vote_average: voteAverage,
    id,
  } = movieDetails
  return (
    <div className="movie-card-container">
      <img
        className="movie-card-image"
        src={`https://image.tmdb.org/t/p/w500${posterPath}`}
        alt="movie poster"
      />
      <div className="movie-details">
        <h1 className="title">
          Name: <span className="title-span">{title}</span>
        </h1>
        <p className="rating">
          Rating:<span className="rating-span">{` ${voteAverage} / 10`}</span>{' '}
        </p>

        <button className="details-btn">
          <Link to={`/${id}`} className="details-link">
            View Details
          </Link>
        </button>
      </div>
    </div>
  )
}

export default MovieCard
