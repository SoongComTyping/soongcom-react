import './App.css';
import React from 'react'
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Header from './components/Header';
import type from "./type";

function App() {
  return (
    <div className="App">
      <Router>
        <main>
          <Header />
          <Switch>
            <Route path="/type" component={type} />
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
