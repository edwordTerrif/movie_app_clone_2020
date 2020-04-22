import React from "react";
import axios from "axios";
import Movies from "../components/Movies";
import "./Home.css";
import { string } from "prop-types";

class Home extends React.Component {
  state = {
    isLoading: true,
    movies: [],
  };

  slide = (x, movies) => {
    if (Math.sign(x) === 1) {
      document.num += 20;
      movies.style.transform = `translateX(${document.num}px)`;
      this.blockPosition();
    } else if (Math.sign(x) === -1) {
      document.num -= 20;
      movies.style.transform = `translateX(${document.num}px)`;
      this.blockPosition();
    }
  };

  blockPosition = () => {
    document.querySelectorAll(".block").forEach((e) => {
      const x = e.getBoundingClientRect().x;
      if (x > 550 && x < 850) {
        e.style.transform = "rotateY(0deg)";
      } else if (x > 850) {
        e.style.transform = "rotateY(-30deg)";
      } else if (x < 550) {
        e.style.transform = "rotateY(30deg)";
      }
    });
  };

  getMovies = async () => {
    const {
      data: {
        data: { movies },
      },
    } = await axios.get(
      "https://yts-proxy.now.sh/list_movies.json?sort_by=rating"
    );

    this.setState({ movies, isLoading: false });
  };

  componentDidMount() {
    this.getMovies();
  }

  render() {
    const { isLoading, movies } = this.state;
    console.log(movies);
    let evListener;
    return (
      <section
        onMouseDown={() => {
          const block = document.getElementsByClassName("movies")[0];
          document.addEventListener(
            "mousemove",
            (evListener = (e) => {
              console.log(e.movementX);
              this.slide(e.movementX, block);
            })
          );
        }}
        onMouseUp={() => {
          document.removeEventListener("mousemove", evListener);
        }}
        onMouseLeave={() => {
          document.removeEventListener("mousemove", evListener);
        }}
        className="container"
      >
        {isLoading ? (
          <div className="loader">
            <span className="loader_text">Loading...</span>
          </div>
        ) : (
          <div className="movies">
            {movies.map((movie) => (
              <Movies
                key={movie.id}
                id={movie.id}
                year={movie.year}
                title={movie.title}
                summary={movie.summary}
                poster={movie.medium_cover_image}
                background={movie.background_image_original}
                genres={movie.genres}
                trailer={movie.yt_trailer_code}
              />
            ))}
          </div>
        )}
      </section>
    );
  }
}

export default Home;
