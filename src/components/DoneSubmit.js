import React from "react";
import check from "../assets/check.png";

class DoneSubmit extends React.Component {

  render() {
    const backToMain = {
      backgroundColor: "#33a3be",
      marginLeft: "auto",
      marginRight: "auto",
      width: "200px",
      padding: "2px 5px",
    }

    return (
      <div className="register-done">
        <img alt="check-graphic" src={check} width="200px" />
        <p>Successfully registered!</p>
        <div id="back-to-main-button" style={backToMain}>
          <p><a href="/">BACK TO MAIN SCREEN</a></p>
        </div>
      </div>
      
    );
  }
}

export default DoneSubmit;