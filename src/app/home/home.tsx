import React from "react";
import { Link, withRouter } from "react-router-dom";

class Home extends React.Component {
  render() {
    return (
      <div>
        <Link to="/">
          <img
            src="../../../assets/images/Capture.PNG"
            style={{ width: "200vh", height: 70 }}
            alt=""
          />
        </Link>
        <img
          src="../assets/images/Artboard – 7.png"
          style={{ position: "absolute", left: 0, top: 82 }}
          alt=""
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            marginLeft: 300,
            flex: 1,
            marginTop: 270,
          }}
        >
          <Link to="/scribble" style={{ width: 100, height: 100, padding: 20 }}>
            <img
              src="../../../assets/images/Artboard – 2.png"
              alt=""
              style={{ width: 100, height: 100 }}
            />
          </Link>
          <Link to="/webcam" style={{ width: 100, height: 100, padding: 20 }}>
            <img
              src="../../../assets/images/Artboard – 1.png"
              alt=""
              style={{ width: 100, height: 100 }}
            />
          </Link>
       
          <Link
            to="/screenrec"
            style={{ width: 100, height: 100, padding: 20 }}
          >
            <img
              src="../../../assets/images/Artboard – 3.png"
              alt=""
              style={{ width: 100, height: 100 }}
            />
          </Link>
        
          <Link to="/scribble" style={{ width: 100, height: 100, padding: 20 }}>
            <img
              src="../../../assets/images/Artboard – 4.png"
              alt=""
              style={{ width: 100, height: 100 }}
            />
          </Link>
          <div
            onClick={() => {
              (this.props as any).history.push("/scribble");
              setTimeout(() => {
                const input = document.getElementById("Image_label");
                input.click();
              }, 1000);
            }}
            style={{ width: 100, height: 100, padding: 20, cursor: "pointer" }}
          >
            <img
              src="../../../assets/images/Artboard – 5.png"
              alt=""
              style={{ width: 100, height: 100 }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Home as any);
