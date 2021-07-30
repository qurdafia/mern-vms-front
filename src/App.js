import React, { Component } from "react";
import Main from "./components/Main";
import DoneSubmit from "./components/DoneSubmit";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
 
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>

          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
            <Route path="/submitted">
              <DoneSubmit />
            </Route>
          </Switch>
        
        </Router>
      </React.Fragment>
    )
  }
}

export default App;