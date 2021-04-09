import './App.css';
import React from 'react'
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Header from './components/Header';
import type from "./type";
import PracticeSentence from "./practice/PracticeSentence"

function App() {
  return (
    <div className="App">
      <Router>
        <main>
          <Header />
          <Switch>
            <Route path="/practice-key" component={type} />
            <Route path="/practice-sentence" component={PracticeSentence} />
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
