import './App.css';
import React from 'react'
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Header from './components/Header';
import AddScript from "./features/scripts/AddScript";
import ShowScript from "./features/scripts/ShowScript";
import SimpleSlider from "./features/practices/paragraphs";
import WordPractice from "./features/practices/words";
import KeyPractice from "./features/practices/keys";
import PracticeSentence from "./features/practices/sentences/PracticeSentence"
import PracticeScript from "./features/practices/scripts/PracticeScript"
import PracticeResult from "./components/PracticeResult"

function App() {
  return (
    <div className="App">
      <Router>
        <main>
          <Header />
          <Switch>
            <Route path="/add-script" component={AddScript} />
            <Route path="/show-script" component={ShowScript} />
            <Route exact path="/" component={SimpleSlider} />
            <Route exact path="/practice-key" component={KeyPractice} />
            <Route exact path="/practice-word" component={WordPractice} />
            <Route exact path="/practice-sentence" component={PracticeSentence} />
            <Route exact path="/practice-script/list" component={ShowScript} />
            <Route path="/practice-script" component={PracticeScript} />
            <Route exact path="/practice-result" component={PracticeResult} />
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
