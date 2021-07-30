import React from "react";
// import Webcam from "react-webcam";

class Step2 extends React.Component {

  // constructor(props){
  //   super(props);
  //   this.state = { imageSrc: null }
  // }

  // setRef = webcam => {
  //   this.webcam = webcam;
  // };

  // capture = () => {
  //   const imageSrc = this.webcam.getScreenshot();
  //   this.setState({imageSrc: imageSrc});
  //   // console.log(imageSrc);
  // };

  render() {
    if (this.props.currentStep !== 2) { // Prop: The current step
      return null
    }

    // const captureStyle = {
    //   textAlign: "center",
    //   backgroundColor: "#333333",
    //   height: "25px",
    //   width: "25px",
    //   marginLeft: "auto",
    //   marginRight: "auto",
    //   padding: "15px",
    //   borderRadius: "100%",
    // }

    // const snapStyle = {
    //   backgroundColor: "#ccc",
    //   height: "25px",
    //   width: "25px",
    //   borderRadius: "100%",
    //   marginLeft: "auto",
    //   marginRight: "auto",
    //   cursor: "pointer"
    // }

    // const videoConstraints = {
    //   width: 1280,
    //   height: 720,
    //   facingMode: "user"
    // };

    // const visitorImage = this.state.imageSrc;

    return (
      <p>None</p>
      // <div>
      //   <Webcam
      //     audio={false}
      //     height={350}
      //     ref={this.setRef}
      //     screenshotFormat="image/jpeg"
      //     width={"100%"}
      //     videoConstraints={videoConstraints}
      //   />
      //   <div className="snap-cam" style={captureStyle}>
      //     <div style={snapStyle} onClick={this.capture}></div>
      //   </div>
      //   {/* { this.state.imageSrc ? <img src={this.state.imageSrc} /> : null } */}
      //   { visitorImage ? <p className="capture-message">Image is captured!!!</p> : null }
      //   <p id="face-string">{visitorImage}</p>
      // </div>
      
    );
  }
}

export default Step2;