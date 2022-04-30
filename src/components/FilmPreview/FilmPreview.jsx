import s from "./FilmPreview.module.css";
import { API_KEY } from "../../api";

export const FilmPreview = ({ setFilmPreview, film }) => {
  const previewToggler = () => {
    console.log("click");
    setFilmPreview(false);
  };
  const watchTrailer = (e) => {
    const id = e.target.value;
    fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/videos`, {
      method: "GET",
      headers: {
        "X-API-KEY": API_KEY,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((trailers) => {
        const link = trailers.items[0].url;
        window.open(link, "_blank");
      });
  };
  return (
    <div className={s.filmBackdrop} onClick={previewToggler}>
      <div className={s.filmPreview} onClick={(e) => e.stopPropagation()}>
        <div className="row">
          <div className="col-4">
            <div className="film-poster">
              <img src={film.posterUrl} alt={film.titleRu} />
              <span className="film-rating">{film.rating}</span>
            </div>
          </div>
          <div className="col-8">
            <h2 className={s.namefilm}>{film.nameRu}</h2>
            <p className="film-name-en">{film.nameEn}</p>
            <p className={s.year}>год:{film.year}</p>
            <p className={s.ratingKinopoisk}>
              Kinopoisk:{film.ratingKinopoisk}
            </p>
            <p className={s.janr}>
              жанр:{" "}
              {film.genres.map(({ genre }, index) => {
                if (film.genres.length === index + 1) {
                  return genre;
                } else {
                  return `${genre}, `;
                }
              })}
            </p>
            <p>
              страна:{" "}
              {film.countries.flat().map(({ country }, index) => {
                if (film.countries.length === index + 1) {
                  return country;
                } else {
                  return `${country}, `;
                }
              })}
            </p>
            <p className={s.type}>{film.type}</p>
            <button
              className={s.trailerBtn}
              onClick={watchTrailer}
              value={film.kinopoiskId}
            >
              Смотреть трейлер
            </button>
            <h2 className={s.mon}>Первый месяц-бесплатно</h2> <br />
            <p className={s.mon2}>далее 1990руб в год</p>
          </div>
        </div>
      </div>
    </div>
  );
};
