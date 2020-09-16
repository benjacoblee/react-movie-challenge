import React from "react";

const MovieCard = ({
    movie: { name, productionYear, genre, synopsisShort }
}) => {
    return (
        <div className="col-6 mb-3">
            <div
                className="card d-flex justify-content-between"
                style={{
                    width: "18rem",
                    maxHeight: "450px"
                }}
            >
                <img
                    src="https://source.unsplash.com/random/400x200"
                    className="card-img-top"
                    alt="..."
                />
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">{synopsisShort}</p>
                    <a href="#">Read More</a>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
