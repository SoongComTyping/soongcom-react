import './App.css';
import React from 'react'
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Header from './components/Header';
import type from "./type";
import AddScript from "./scripts/AddScript";

function App() {
  return (
    <div className="App">
      <Router>
        <main>
          <Header />
          <Switch>
            <Route path="/practice-key" component={type} />
            <Route path="/add-script" component={AddScript} />
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
