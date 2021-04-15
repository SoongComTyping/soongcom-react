import './App.css';
import React from 'react'
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Header from './components/Header';
import AddScript from "./scripts/AddScript";
import ParagraphPractice from "./features/practices/paragraphs";
import WordPractice from "./features/practices/words";
import KeyPractice from "./features/practices/keys";

function App() {
  return (
    <div className="App">
      <Router>
        <main>
          <Header />
          <Switch>
            <Route path="/add-script" component={AddScript} />
            <Route exact path="/" component={ParagraphPractice} />
            <Route exact path="/practice-key" component={KeyPractice} />
            <Route exact path="/practice-word" component={WordPractice} />
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
