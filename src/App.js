import './App.css'
import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import TopratedMovies from './components/TopRatedMovies'
import UpComingMovies from './components/UpComingMovies'
import SingleMoviePage from './components/SingleMoviePage'
import SearchResults from './components/SearchResults'
// write your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/top-rated" component={TopratedMovies} />
    <Route exact path="/upcoming" component={UpComingMovies} />
    <Route exact path="/search" component={SearchResults} />
    <Route exact path="/:id" component={SingleMoviePage} />
  </Switch>
)

export default App
