import './index.css'
import {useState, useEffect} from 'react'
import Navbar from '../Navbar'

const SingleMoviePage = props => {
  const [movieData, setMovieData] = useState(0)
  const [castData, setcastData] = useState(0)
  const {match} = props
  useEffect(() => {
    const apiCall = async () => {
      const movieId = match.params.id
      const apiKey = '685fff8bd9824a25a6727a6555b1354c'
      const url2 = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=en`
      const url1 = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-U`
      const [response1, response2] = await Promise.all([
        fetch(url1),
        fetch(url2),
      ])
      const [rawData1, rawData2] = await Promise.all([
        response1.json(),
        response2.json(),
      ])
      const data1 = {
        releaseDate: rawData1.release_date,
        title: rawData1.title,
        posterPath: rawData1.poster_path,
        overview: rawData1.overview,
        tagline: rawData1.tagline,
        rating: rawData1.vote_average,
        budget: rawData1.budget,
        runtime: rawData1.runtime,
        genre: `${rawData1.genres.map(e => e.name).join(', ')}`,
      }
      setMovieData(data1)
      const data2 = {
        cast: rawData2.cast.map(e => ({
          name: e.name,
          id: e.id,
          characterName: e.character,
          profilePath: e.profile_path,
        })),
        crew: rawData2.crew.map(e => ({
          name: e.name,
          id: e.id,
          department: e.department,
          profilePath: e.profile_path,
        })),
      }
      setcastData(data2)
      console.log(rawData2)
    }

    apiCall()
  }, [])

  const castCard = ({id, name, department, characterName, profilePath}) => (
    <div className="castCard" key={id}>
      <img
        src={`https://media.themoviedb.org/t/p/w138_and_h175_face${profilePath}`}
        alt={name}
      />
      <p className="castName">{name}</p>
      {department ? (
        <p className="castRealName">{`Department: ${department}`}</p>
      ) : (
        <p className="castRealName">{`Character: ${characterName}`}</p>
      )}
    </div>
  )
  if (castData) {
    return (
      <div className="single-movie-container">
        <Navbar />
        <div className="banner-image-container">
          <img
            className="banner-image"
            src={`https://image.tmdb.org/t/p/w500${movieData.posterPath}`}
            alt="movieData.name"
          />
          <div className="movie-details-container">
            <div className="movie-name-container">
              <p className="mv-name">
                <span>{movieData.title}</span>
                {`(${new Date(movieData.releaseDate).getFullYear()})`}
              </p>
              <p className="mv tagline">{movieData.tagline}</p>
            </div>
            <p className="disc">{movieData.overview}</p>
            <div className="details-con">
              <p>
                Duration:{' '}
                <span className="duration">{`${movieData.runtime} Min`}</span>
              </p>
              <p>
                Release Date:{' '}
                <span className="duration">{movieData.releaseDate}</span>
              </p>
              <p>
                Genre: <span className="duration">{movieData.genre}</span>
              </p>
              <p>
                Rating: <span className="duration">{movieData.rating}</span>
              </p>
              <p>
                Budget(usd):
                <span className="duration">{` ${movieData.budget} $`}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="cast-container">
          <h1>Cast</h1>
          <div className="cast-crew-cards-container">
            {castData.cast.map(e => castCard(e))}
          </div>
          <h1>Crew</h1>
          <div className="cast-crew-cards-container">
            {castData.crew.map(e => castCard(e))}
          </div>
        </div>
      </div>
    )
  }
  return null
}

export default SingleMoviePage

// https://api.themoviedb.org/3/movie/${MOVIE_ID}/credits?api_key=${API_KEY}&language=en
