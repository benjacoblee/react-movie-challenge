import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./Home";
import Movie from "./Movie";

function App() {
    return (
        <div className="App">
            <Router>
                <Layout>
                    <Switch>
                        <Route exact path="/">
                            <Home />
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
