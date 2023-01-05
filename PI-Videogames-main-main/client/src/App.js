import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Home from './components/Home'
import CreateVideogame from './components/CreateVideogame'
import Details from './components/Details'

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Switch>
          <Route exact path='/' component={LandingPage}></Route>
          <Route
            path='/videogame/:id'
            render={({ match }) => <Details videogame={match.params.id} />}

          ></Route>
          <Route path='/videogame' component={Home}></Route>
          <Route path='/createvg' component={CreateVideogame}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
