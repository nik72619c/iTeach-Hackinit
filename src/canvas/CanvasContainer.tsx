import React, { Component } from "react";
import { connect } from "react-redux";
import Canvas from "./Canvas";

import { addSnapShot } from "./ducks/canvas";

/**
 * Root app component whenever the app starts.
 * @class CanvasContainer
 * @extends React.Component
 * @example <Canvas />
 */

const videoType = "video/webm";

class CanvasContainer extends Component<any, any> {
  async componentDidMount() {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    // show it to user
    (this as any).video.srcObject = stream;
    (this as any).video.play();
    // init recording
    (this as any).mediaRecorder = new (window as any).MediaRecorder(stream, {
      mimeType: videoType,
    });
    // init data storage for video chunks
    (this as any).chunks = [];
    // listen for data from media recorder
    (this as any).mediaRecorder.ondataavailable = (e: any) => {
      if (e.data && e.data.size > 0) {
        (this as any).chunks.push(e.data);
      }
    };
  }

  startRecording(e: any) {
    e.preventDefault();
    // wipe old data chunks
    (this as any).chunks = [];
    (this as any).video.muted = true;
    // start recorder with 10ms buffer
    (this as any).mediaRecorder.start(10);
    // say that we're recording
    this.setState({ recording: true });
  }

  stopRecording(e: any) {
    e.preventDefault();
    // stop the recorder
    (this as any).mediaRecorder.stop();
    // say that we're not recording
    (this as any).setState({ recording: false });
    // save the video to memor
  }

  render() {
    return (
      <>
        <Canvas {...this.props} />

        <video
          muted
          style={{
            display: this.props.isRecording ? "" : "none",
            position: "absolute",
            right: 0,
            bottom: 0,
            height: "200px",
          }}
          ref={v => {
            (this as any).video = v;
          }}
        >
          Video stream not available.
        </video>
      </>
    );
  }
}

function mapStateToProps(state: any, props: any) {
  const selectedColor = state.toolbar.get("selectedColor");
  const selectedWeight = state.toolbar.get("selectedWeight");
  const version = state.canvas.get("version");
  const snapshots = state.canvas.get("snapshots");
  return {
    version,
    snapshots,
    selectedColor,
    selectedWeight,
  };
}

function mapDispatchToProps(dispatch: any, props: any) {
  console.log(arguments);
  return {
    addSnapShot: (snapshot: string) => {
      dispatch(addSnapShot(snapshot));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CanvasContainer);
