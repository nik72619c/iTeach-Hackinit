import React from "react";
import Canvas from "../canvas/CanvasContainer";
import Toolbar from "../toolbar/ToolbarContainer";
import WebCamRecorder from "../Recorder/WebcamRecorder";

class Scribble extends React.Component {
  state = { recording: false };

  setRecording(bool: any) {
    this.setState({
      recording: bool,
    });
  }

  render() {
    return (
      <>
        <Toolbar setRecording={this.setRecording.bind(this)} key="toolbar" />
        <Canvas isRecording={this.state.recording} key="canvas" />
      </>
    );
  }
}

export default Scribble;
