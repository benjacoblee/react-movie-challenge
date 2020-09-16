import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./components/Layout";

function App() {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        const getMovies = async () => {
            let result = await axios.get(
                "https://sometimes-maybe-flaky-api.gdshive.io/"
            );

            setMovies(result.data);
        };

        getMovies();
    }, []);
    return (
        <div className="App">
            <Layout>
                <div className="container">
                    <div className="row mt-3">
                        {movies.map((movie) => {
                            const {
                                name,
                                productionYear,
                                genre,
                                synopsisShort,
                                image
                            } = movie;
                            return (
                                <div className="col-6 mb-3">
                                    <div
                                        className="card d-flex justify-content-between"
                                        style={{
                                            width: "18rem",
                                            height: "300px"
                                        }}
                                    >
                                        <img
                                            src="..."
                                            className="card-img-top"
                                            alt="..."
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                {name}
                                            </h5>
                                            <p className="card-text">
                                                {synopsisShort}
                                            </p>
                                            <a href="#">Read More</a>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Layout>
        </div>
    );
}

export default App;
