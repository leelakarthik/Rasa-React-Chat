import React, { Component } from "react";
import "./App.css";
import Form from "./components/form";
// import { getMsgs } from "./service";
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="container" id="main">
          <div className="row">
            <h3 id="title">
              Rasa powered Chat Bot
            </h3>
          </div>
          <Form />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
