import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import MovieCard from "./components/MovieCard";

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    useEffect(() => {
        const getMovies = async () => {
            try {
                let result = await axios.get(
                    "https://sometimes-maybe-flaky-api.gdshive.io/"
                );

                setMovies(result.data);
            } catch (error) {
                setErrorMessage(
                    error.message + ", please try refreshing the browser!"
                );
            }
        };

        getMovies();
    }, []);

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
    }

    return (
        <div className="container">
            <div className="row mt-3">
                {errorMessage}
                {movies.map((movie) => {
                    return <MovieCard key={movie.name} movie={movie} />;
                })}
                }
            </div>
        </div>
    );
};

export default Home;
