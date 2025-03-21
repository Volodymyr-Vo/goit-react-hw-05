import css from "./MovieDetailsPage.module.css";
import { useEffect, useState, Suspense } from "react";
import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import { fetchMovieDetails } from "../../services/api";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const backLink = location.state?.from ?? "/movies";

  useEffect(() => {
    fetchMovieDetails(movieId).then((data) => {
      setMovie(data);
    });
  }, [movieId]);

  if (!movie) {
    return <p>Loading...</p>;
  }

  const { title, overview, genres, vote_average, poster_path } = movie;
  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w300${poster_path}`
    : "https://via.placeholder.com/300x450?text=No+Image";

  return (
    <div className={css.container}>
      <Link to={backLink} className={css.goBack}>
        &larr; Go back
      </Link>
      <div className={css.movieDetails}>
        <img src={posterUrl} alt={title} className={css.poster} />
        <div>
          <h2>
            {title} ({new Date(movie.release_date).getFullYear()})
          </h2>
          <p>User Score: {Math.round(vote_average * 10)}%</p>
          <h3>Overview</h3>
          <p>{overview}</p>
          <h3>Genres</h3>
          <p>{genres.map((genre) => genre.name).join(" ")}</p>
        </div>
      </div>
      <div>
        <h3>Additional information</h3>
        <ul>
          <li>
            <Link to="cast" state={{ from: backLink }}>
              Cast
            </Link>
          </li>
          <li>
            <Link to="reviews" state={{ from: backLink }}>
              Reviews
            </Link>
          </li>
        </ul>
      </div>
      <Suspense fallback={<p>Loading...</p>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
