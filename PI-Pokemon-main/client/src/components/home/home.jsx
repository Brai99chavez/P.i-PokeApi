import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../card/card.jsx";
import "./home.css";
import {
  getAllPokemons,
  getAllTypes,
  getSortedPokemon,
} from "../../redux/action/actions.js";
import Loading from "../loading/loading";
import SearchBar from "../searchBar/searchBar";

export default function Home() {
  const [state, setState] = useState({
    currentPage: 0,
    typeFilter: "none",
    otherFilters: "none",
    order: "none",
    change: false,
  });
  //asdasdasdad
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPokemons());
    dispatch(getAllTypes());
  }, [dispatch]);

  const { pokemons, loading, types } = useSelector((state) => state);
  //---------------------------------------------------------------------

  function onChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }
  //filter and sort-------------------------------------------------------------
  let filtered = pokemons.length ? pokemons : [];
  if (state.typeFilter !== "none") {
    filtered = pokemons.filter((p) =>
      p.types
        ? p.types.some((t) => t.name === state.typeFilter)
        : p.Types.some((t) => t.name === state.typeFilter)
    );
    if (state.currentPage !== 0) {
      setState({ ...state, currentPage: 0 });
    }
  }
  if (state.otherFilters !== "none") {
    switch (state.otherFilters) {
      case "existing":
        filtered = filtered.filter((p) => typeof p.id !== "string");
        break;
      case "created":
        filtered = filtered.filter((p) => typeof p.id === "string");
        if (state.currentPage !== 0) {
          setState({ ...state, currentPage: 0 });
        }
        break;
      default:
        filtered = pokemons;
        break;
    }
  }
  function sort(e) {
    setState({ ...state, order: e.target.value });

    if (e.target.value !== "none") {
      dispatch(getSortedPokemon(e.target.value));
    } else if (e.target.value === "none") {
      dispatch(getAllPokemons());
    }
  }
  // pagination fix----------------------------------------------------------------
  let paginado = filtered.length? filtered.slice(state.currentPage, state.currentPage + 12) : [];
  function nextPage() {
    if (state.currentPage < filtered.length - 12) {
      setState({ ...state, currentPage: state.currentPage + 12 });
    }
  }
  function prevPage() {
    if (state.currentPage < filtered.length && state.currentPage > 0) {
      setState({ ...state, currentPage: state.currentPage - 12 });
    }
  }

  if (loading) {
    return <Loading />;
  }
  //currentPokemons = currentPokemons.slice(state.currentPage,state.currentPage + 12);
  //---------------------------------------------------------------------
  return (
    <div>
      <div className="filters-container">
        <div className="filters">
          <SearchBar />
          <select class="round" name="otherFilters" onChange={(e) => onChange(e)}>
            <option value="none">Filters:</option>
            <option value="existing">existing</option>
            <option value="created">created</option>
          </select>
          <select name="typeFilter" onChange={(e) => onChange(e)}>
            <option value="none">choose type:</option>
            {types.length &&
              types.map((type) => (
                <option key={type.id} value={type.name}>
                  {type.name}
                </option>
              ))}
          </select>
          <select name="order" onChange={(e) => sort(e)}>
            <option value="none">order:</option>
            <option value="a-z">a-z</option>
            <option value="z-a">z-a</option>
            <option value="atk-asc">attack Asc</option>
            <option value="atk-des">attack Des</option>
          </select>
        </div>
      </div>
      
      <div className="cards-container">
        { paginado.length && paginado.map((pokemon) => (
          <Card
            id={pokemon.id}
            key={pokemon.id}
            img={pokemon.img}
            name={pokemon.name}
            type={pokemon.Types || pokemon.types}
          />
        ))}
      </div>
      <div className="pagination">
        <button type="submit" onClick={prevPage}>
          {" "}
          prev{" "}
        </button>
        &nbsp;
        <button type="submit" onClick={nextPage}>
          {" "}
          next{" "}
        </button>
      </div>
    </div>
  );
}
