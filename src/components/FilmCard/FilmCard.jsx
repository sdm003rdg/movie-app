import { useState } from "react";

import { FilmPreview } from "../FilmPreview/FilmPreview";
import s from "./FilmCard.module.css";

export const FilmCard = ({ film }) => {
  const [filmPreview, setFilmPreview] = useState(false);

  return (
    <>
      <div className={s.filmCard} onClick={() => setFilmPreview(true)}>
        <div className={s.filmPoster}>
          <img src={film.posterUrlPreview} alt={film.titleRu} />
          <span className={s.filmRating}>{film.rating}</span>
        </div>
        <div className={s.title}>
          <h2 className={s.filmNameRu}>{film.nameRu}</h2>
          <p className={s.filmNameEn}>
            {film.nameOriginal || film.nameEn || film.nameRu}
          </p>
        </div>
      </div>
      {filmPreview ? (
        <FilmPreview setFilmPreview={setFilmPreview} film={film} />
      ) : null}
    </>
  );
};
