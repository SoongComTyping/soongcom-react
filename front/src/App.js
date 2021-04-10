import './App.css';
import React from 'react'
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Header from './components/Header';
import ParagraphPractice from "./features/practices/paragraphs";

function App() {
  return (
    <div className="App">
      <Router>
        <main>
          <Header />
          <Switch>
            <Route exact path="/practice-key" component={ParagraphPractice} />
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
