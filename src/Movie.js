import React, { useState, useEffect, Fragment } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Movie = () => {
    const [movie, setMovie] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const location = useLocation();
    const pathArr = location.pathname.split("/");
    const movieName = pathArr[2];
    const movieObjEmpty = Object.keys(movie).length === 0;

    useEffect(() => {
        const getMovies = async () => {
            try {
                let result = await axios.get(
                    "https://sometimes-maybe-flaky-api.gdshive.io/"
                );

                result = result.data.reduce((acc, currVal) => {
                    if (currVal.name === movieName) {
                        acc = currVal;
                    }

                    return acc;
                }, {});

                setMovie(result);
            } catch (error) {
                setErrorMessage(
                    error.message + ", please try refreshing the browser!"
                );
            }
        };

        getMovies();
    }, []);

    const createMarkup = (synopsis) => {
        return { __html: synopsis };
    };

    const { name, productionYear, genre, synopsis } = movie;
    if (movieObjEmpty) {
        return (
            <Fragment>
                {errorMessage ? (
                    <div className="container">
                        <div className="mt-3 text-center ">{errorMessage}</div>
                    </div>
                ) : (
                    <div className="alert alert-info">
                        Loading movie, please wait..
                    </div>
                )}
            </Fragment>
        );
    }

    return (
        <div className="container">
            <div className="mt-2">
                {errorMessage}
                <h2>
                    {name}{" "}
                    <span>
                        <small className="font-weight-light">
                            {productionYear}
                        </small>
                    </span>
                </h2>

                <p className="badge badge-pill badge-light">{genre}</p>
                <div
                    className="mb-5"
                    dangerouslySetInnerHTML={createMarkup(synopsis)}
                ></div>
            </div>
        </div>
    );
};

export default Movie;
