import "./Category.module.css";

import { useEffect, useState } from "react";

import { API, API_KEY } from "../../api";
import { FilmCard } from "../FilmCard/FilmCard";
import s from "./Category.module.css";

export const Category = ({ title, query }) => {
  const [films, setFilms] = useState([]);
  useEffect(() => {
    fetch(`${API}/api/v2.2/films?genres=${query}`, {
      method: "GET",
      headers: {
        "X-API-KEY": API_KEY,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)
        setFilms(data.items);
      });
  }, [query]);

  return (
    <div className={s.root}>
      <h2 className={s.title}>{title}</h2>
      <div className="row">
        {films.slice(0, 4).map((film) => (
          <div className="col-3" key={film.kinopoiskId}>
            <FilmCard film={film} />
          </div>
        ))}
      </div>
    </div>
  );
};
