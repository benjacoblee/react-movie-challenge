import React, { useState, useEffect, Fragment } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import queryString from "query-string";
import MovieCard from "./components/MovieCard";

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const location = useLocation();
    useEffect(() => {
        const getMovies = async () => {
            setMovies([]);
            let filteredMovies;

            try {
                let result = await axios.get(
                    "https://sometimes-maybe-flaky-api.gdshive.io/"
                );

                const yearQuery = queryString.parse(location.search).year;
                const genreQuery = queryString.parse(location.search).genre;

                if (!yearQuery || !genreQuery) {
                    setMovies(result.data);
                }
                if (yearQuery) {
                    filteredMovies = result.data.filter((el) => {
                        if (
                            el.productionYear.toString() ===
                            yearQuery.toString()
                        ) {
                            return el;
                        }
                    });

                    setMovies(filteredMovies);
                } else if (genreQuery) {
                    filteredMovies = result.data.filter((el) => {
                        if (el.genre === genreQuery) {
                            return el;
                        }
                    });

                    setMovies(filteredMovies);
                }

                setErrorMessage("");
            } catch (error) {
                setErrorMessage(
                    error.message + ", please try refreshing the browser!"
                );
            }
        };

        getMovies();
    }, [location]);

    if (!movies.length) {
        return (
            <Fragment>
                {errorMessage ? (
                    <div className="container">
                        <div className="mt-3 text-center ">{errorMessage}</div>
                    </div>
                ) : (
                    <div className="alert alert-info">
                        Loading movies, please wait..
                    </div>
                )}
            </Fragment>
        );
    } else {
        return (
            <div className="container">
                <div className="row mt-3">
                    {errorMessage}
                    {movies.map((movie) => {
                        return <MovieCard key={movie.name} movie={movie} />;
                    })}
                </div>
            </div>
        );
    }
};

export default Home;
