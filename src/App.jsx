import { useState } from "react";

import { FilmCard } from "./components/FilmCard/FilmCard";
import { API_KEY } from "./api";
import { Category } from "./components/Category/Category";
import s from "./App.module.css";

const App = () => {
  const [search, setSearch] = useState("");
  const [searchedFilms, setSearchFilms] = useState(null);
  console.log(App);
  const getFilmsBySearch = (e) => {
    e.preventDefault();
    fetch(
      `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${search}`,
      {
        method: "GET",
        headers: {
          "X-API-KEY": API_KEY,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setSearchFilms(data.films);
      });
  };
  return (
    <div className="App">
      <header>
        <img className="logo" src="" alt="" />

        <h1 className="header-press">KinoRun</h1>
        <form onSubmit={getFilmsBySearch} className="search-form">
          <input
            placeholder="Найти фильм"
            className="header-search"
            type="text"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="header-btn" type="submit">
            search
          </button>
        </form>
      </header>
      <main className={s.main}>
        {searchedFilms ? (
          <div className="row">
            {searchedFilms.map((film) => (
              <div className="col-3">
                <FilmCard film={film} key={film.filmId} />
              </div>
            ))}
          </div>
        ) : (
          <div>
            <Category query={9} title="боевик" />
            <Category query={17} title="хоррор" />
            <Category query={12} title="фентази" />
            <Category query={13} title="комедия" />
            <Category query={18} title="мультфильм" />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
