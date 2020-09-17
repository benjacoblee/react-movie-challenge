import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Layout = (props) => {
    const [yearFilters, setYearFilters] = useState([]);
    const [genreFilters, setGenreFilters] = useState([]);
    useEffect(() => {
        const filteredYears = props.movies.reduce((acc, currVal) => {
            if (acc.indexOf(currVal.productionYear) === -1) {
                acc.push(currVal.productionYear);
            }
            return acc;
        }, []);

        filteredYears.sort((a, b) => a - b);

        const filteredGenres = props.movies.reduce((acc, currVal) => {
            if (acc.indexOf(currVal.genre) === -1) {
                acc.push(currVal.genre);
            }
            return acc;
        }, []);

        filteredGenres.sort();

        setYearFilters(filteredYears);
        setGenreFilters(filteredGenres);
    }, [props]);

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to="/" className="navbar-brand">
                    Movies
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav mr-auto">
                        <li
                            className={`nav-item dropdown ${
                                yearFilters.length > 0 ? null : "d-none"
                            }`}
                        >
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                id="navbarDropdown"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                Filter by Year
                            </a>
                            <div
                                className="dropdown-menu"
                                aria-labelledby="navbarDropdown"
                            >
                                {yearFilters.map((year, index) => {
                                    return (
                                        <Link
                                            key={index}
                                            to={`/?productionYear=${year}`}
                                            className="dropdown-item"
                                        >
                                            {year}
                                        </Link>
                                    );
                                })}
                            </div>
                        </li>
                        <li
                            className={`nav-item dropdown ${
                                genreFilters.length > 0 ? null : "d-none"
                            }`}
                        >
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                id="navbarDropdown"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                Filter by Genre
                            </a>
                            <div
                                className="dropdown-menu"
                                aria-labelledby="navbarDropdown"
                            >
                                {genreFilters.map((genre, index) => {
                                    return (
                                        <Link
                                            key={index}
                                            to={`/?genre=${genre}`}
                                            className="dropdown-item"
                                        >
                                            {genre}
                                        </Link>
                                    );
                                })}
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
            <div>{props.children}</div>
        </div>
    );
};

export default Layout;
