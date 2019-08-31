import React, { Component } from "react";
import Toolbar from "../toolbar/ToolbarContainer";
import Canvas from "../canvas/CanvasContainer";
import { Switch, Route, Link } from "react-router-dom";

import "./App.scss";
import WebCamRecorder from "../Recorder/WebcamRecorder";
import Scribble from "../Scribble/scribble";
import ScreenRecorderContainer from "../Recorder/ScreenRecorderContainer";
import Home from "./home/home";

/**
 * Root app component whenever the app starts.
 * @class App
 * @extends React.Component
 * @example <App />
 */
class App extends Component {
  /**
   * @method render
   * @returns JSX.Element[]
   */
  render() {
    return (
      <>
        <Switch>
          <Route exact path="/webcam" component={WebCamRecorder} />
          <Route exact path="/scribble" component={Scribble} />
          <Route path="/screenrec" component={ScreenRecorderContainer} />
          <Route exact path="/" component={Home} />
        </Switch>
      </>
    );
  }
}

export default App;
