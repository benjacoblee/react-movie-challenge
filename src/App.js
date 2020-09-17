import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./Home";
import Movie from "./Movie";

function App() {
    const [movies, setMovies] = useState([]);
    const liftHelper = (data) => {
        setMovies(data);
    };
    return (
        <div className="App">
            <Router>
                <Layout movies={movies}>
                    <Switch>
                        <Route exact path="/">
                            <Home liftHelper={liftHelper} />
                        </Route>
                        <Route path="/movies/:name">
                            <Movie />
                        </Route>
                    </Switch>
                </Layout>
            </Router>
        </div>
    );
}

export default App;
