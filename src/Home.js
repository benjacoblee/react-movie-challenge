import React, { useState, useEffect, Fragment } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import queryString from "query-string";
import MovieCard from "./components/MovieCard";

const Home = (props) => {
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const location = useLocation();
    useEffect(() => {
        const getMovies = async () => {
            try {
                let result = await axios.get(
                    "https://sometimes-maybe-flaky-api.gdshive.io/"
                );

                setMovies(result.data);

                props.liftHelper(result.data);

                setErrorMessage("");
            } catch (error) {
                setErrorMessage(
                    error.message + ", please try refreshing the browser!"
                );
            }
        };

        getMovies();
    }, []);

    useEffect(() => {
        setQuery(queryString.parse(location.search));
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
                        if (Object.keys(query).length !== 0) {
                            for (let name in query) {
                                if (
                                    movie[name].toString() ===
                                    query[name].toString()
                                ) {
                                    return (
                                        <MovieCard
                                            key={movie.name}
                                            movie={movie}
                                        />
                                    );
                                }
                            }
                        } else {
                            return <MovieCard key={movie.name} movie={movie} />;
                        }
                    })}
                </div>
            </div>
        );
    }
};

export default Home;
