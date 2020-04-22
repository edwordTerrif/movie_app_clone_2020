import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./Movie.css";

function Movie({
  id,
  year,
  title,
  summary,
  poster,
  background,
  genres,
  trailer,
}) {
  const mexText = summary.slice(0, 200);
  return (
    <Link
      to={{
        pathname: `/movie/${id}`,
        state: {
          year,
          title,
          summary,
          poster,
          background,
          genres,
          trailer,
        },
      }}
    >
      <div className="front block">
        <div className="movie">
          <img src={poster} alt={title} title={title} draggable="false" />
          <div className="movie_data">
            <h3 className="movie_title">{title}</h3>
            <h5 className="movie_year">{year}</h5>
            <p className="movie_summary">{mexText}...</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

/*
<ul className="genres">
          {genres.map((
            genre,
            index //map func is give me another arguments
          ) => (
            <li key={index} className="genre">
              {genre}
            </li>
          ))}
        </ul>
*/

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Movie;
