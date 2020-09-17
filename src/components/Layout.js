import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Layout = (props) => {
    const [yearFilters, setYearFilters] = useState([]);
    const [genreFilters, setGenreFilters] = useState([]);
    useEffect(() => {
        try {
            const getMovies = async () => {
                let result = await axios.get(
                    "https://sometimes-maybe-flaky-api.gdshive.io/"
                );

                const yearFilterArr = [];
                const genreFilterArr = [];

                result.data.forEach((el) => {
                    if (yearFilterArr.indexOf(el.productionYear) === -1) {
                        yearFilterArr.push(el.productionYear);
                    }
                    if (genreFilterArr.indexOf(el.genre) === -1) {
                        genreFilterArr.push(el.genre);
                    }
                });

                yearFilterArr.sort((a, b) => a - b);
                genreFilterArr.sort();

                setYearFilters(yearFilterArr);
                setGenreFilters(genreFilterArr);
            };

            getMovies();
        } catch (error) {
            console.log(error.message);
        }
    }, []);
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
                        <li className="nav-item dropdown">
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
                        <li className="nav-item dropdown">
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
