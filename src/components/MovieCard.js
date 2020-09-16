import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({
    movie: { name, productionYear, genre, synopsisShort }
}) => {
    return (
        <div className="col-6 mb-3">
            <div className="card d-flex justify-content-between">
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">{synopsisShort}</p>
                    <Link to={`/movies/${name}`}>Read More</Link>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
