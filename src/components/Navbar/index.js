import './index.css'
import {Link, withRouter} from 'react-router-dom'
import {useState} from 'react'

function Navbar(props) {
  const [searchInput, setSearchInput] = useState('')
  const onInputChange = event => {
    setSearchInput(event.target.value)
  }
  const onSearch = event => {
    const {history} = props
    const {replace} = history
    event.preventDefault()
    if (searchInput.trim() !== '') {
      replace(`search?Q=${searchInput}`)
    }
  }

  return (
    <nav className="navbar-container">
      <div className="navbar-logo-links-container">
        <h1 className="navbar-logo">movieDB</h1>
        <Link className="nav-item" to="/">
          <h1>Popular</h1>
        </Link>
        <Link className="nav-item" to="/top-rated">
          <h1>Top Rated</h1>
        </Link>
        <Link className="nav-item" to="/upcoming">
          <h1>Upcoming</h1>
        </Link>
      </div>

      <form className="navbar-search-container" onSubmit={onSearch}>
        <input
          type="search"
          value={searchInput}
          onChange={onInputChange}
          placeholder="Type Movie Name"
          className="search-bar"
        />
        <button className="search-bar-button" type="submit">
          Search
        </button>
      </form>
    </nav>
  )
}

export default withRouter(Navbar)
