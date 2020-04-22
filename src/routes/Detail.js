import React from "react";
import Details from "./Detail.css";

class Detail extends React.Component {
  componentDidMount() {
    const { location, history } = this.props;
    if (location.state === undefined) {
      history.push("/");
    }
  }

  render() {
    const { location } = this.props;

    if (location.state) {
      return (
        <div className="movie_detail">
          <div className="movie_info">
            <img
              draggable="false"
              className="poster"
              src={location.state.poster}
            ></img>
            <img
              draggable="false"
              className="background"
              src={location.state.background}
            ></img>
            <h1 className="title">{location.state.title}</h1>
            <h2 className="year">{location.state.year}</h2>
            {location.state.genres.map((genre) => (
              <h5 key={genre} className="genre">
                {genre}
              </h5>
            ))}
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Detail;
