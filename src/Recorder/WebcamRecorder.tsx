import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

interface State {
  recording: boolean;
  videos: String[];
}
const videoType = "video/webm";
export default class WebCamRecorder extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      recording: false,
      videos: [],
    };
  }

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
    // save the video to memory
    this.saveVideo();
  }
  uploadFile = async (e: any) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'Sick-fits');
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dv95rctxg/video/upload',
      {
        method: 'POST',
        body: data
      }
    ).then(d => d.json())
    .then(res=>{
      console.log(res.eager[0].secure_url);
    });
  }
  saveVideo=()=> {
    // convert saved chunks to blob
    const blob = new Blob((this as any).chunks, { type: videoType });
    // generate video url from blob
    this.uploadFile(blob);
    const videoURL = window.URL.createObjectURL(blob);
    localStorage.setItem("video_url_webcam", videoURL);
    (window as any).Swal.fire(
      "Video Saved Successfully",
      `Here's your video `+videoURL,
      "success"
    );
    (this as any).video.srcObject = null;
    (this as any).video.src = videoURL;
    (this as any).video.muted=false;
    // append videoURL to list of saved videos for rendering
    const videos = (this as any).state.videos.concat([videoURL]);
    this.setState({ videos });
  }

  deleteVideo(videoURL: any) {
    // filter out current videoURL from the list of saved videos
    const videos = this.state.videos.filter(v => v !== videoURL);
    this.setState({ videos });
  }

  render() {
    const { recording, videos } = this.state;
    return (
      <div className="camera">
      <Link to="/">
          <img
            src="../../../assets/images/Capture.PNG"
            style={{ width: "200vh", height: 70 }}
            alt=""
          />
        </Link>
      <img
          src='../assets/images/Artboard – 7.png'
          style={{ position:'absolute',left:0,top:82 }}
          alt=''
        />
        <video
          controls={!recording}
          muted
          style={{ width: 800, marginLeft: 528, marginTop: 36,height:500 }}
          ref={v => {
            (this as any).video = v;
          }}
        >
          Video stream not available.
        </video>
        <div style={{display: 'flex',flexDirection: 'row', justifyContent: 'center'}}>
        <div><img src="../assets/images/recordicon.PNG" style={{width: 63, height: 40,marginLeft: 20}} alt=""/></div>
        <div>
          {!recording && (
            <div><button
              onClick={e => this.startRecording(e)}
              style={{ marginLeft: 10,marginTop: 10 }}
            >
              Record
            </button></div>
          )}
          {recording && (
            <div><button
              onClick={e => this.stopRecording(e)}
              style={{ marginLeft: 10,marginTop: 10 }}
            >
              Stop
            </button></div>
          )}
           
          
        </div>
        <div><img src="../assets/images/time.PNG" style={{width: 63, height: 40,marginLeft: 20}} alt=""/></div>
        </div>
        <div />
      </div>
    );
  }
}
