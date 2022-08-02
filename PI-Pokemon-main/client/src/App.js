import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './components/landing page/ladingPage.jsx';
import NotFound from './components/pageNotFound/pageNotFound.jsx'
import Navbar from './components/navbar/navbar.jsx'
import Detail from './components/detail/detail.jsx';
import Home from './components/home/home.jsx';
import CreatePokemon from './components/create pokemon/createPokemon';

function App() {
  return (
    <>
      <Route path="/(home|create|detail)" component={Navbar} />
      <Switch>
        <Route path="/" exact component={LandingPage}></Route>
        <Route path="/home" exact component={Home}/>
        <Route path="/detail/:id" component={Detail}></Route>
        <Route path="/create" component={CreatePokemon}></Route>
        <Route path="/*" component={NotFound}></Route>
      </Switch>
    </>
  );
}
export default App;
