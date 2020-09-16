import React, { useState, useEffect } from "react";
import axios from "axios";

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
            {movies.map((movie) => {
                const {
                    name,
                    productionYear,
                    genre,
                    synopsisShort,
                    image
                } = movie;
                return (
                    <div>
                        <p>{name}</p>
                        <p>{image}</p>
                    </div>
                );
            })}
        </div>
    );
}

export default App;
