import React, { Component } from "react";

import Step1 from "../components/Step1";
import Step3 from "../components/Step3";

import ctclogo from "../assets/ctclogo.png";
import techgraphics from "../assets/techgraphics.jpg";

import Webcam from "react-webcam";

import { withRouter } from "react-router-dom";
 
class Main extends Component {

  constructor(props) {
    super(props)
    
    // Bind new functions for next and previous
    this._next = this._next.bind(this)
    this._prev = this._prev.bind(this)

    // Set the initial input values

    this.state = {
      currentStep: 1,
      firstName: '',
      lastName: '',
      company: '',
      mobile: '',
      contactPerson: '',
      temperature: '',
      fromTime: '',
      endTime: '',
      formErrors: [],
      imageSrc: null
    }

    // Bind the submission to handleChange() 
    this.handleChange = this.handleChange.bind(this);
    this.validateField = this.validateField.bind(this);
  }

  setRef = webcam => {
    this.webcam = webcam;
  };

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    this.setState({imageSrc: imageSrc});
    // console.log(imageSrc);
  };

  // Test current step with ternary
  // _next and _previous functions will be called on button click
  _next() {
    let currentStep = this.state.currentStep
    // If the current step is 1 or 2, then add one on "next" button click
    currentStep = currentStep >= 1? 2: currentStep + 1
    this.setState({
      currentStep: currentStep
    })
  }

  _prev() {
    let currentStep = this.state.currentStep
    // If the current step is 2 or 3, then subtract one on "previous" button click
    currentStep = currentStep <= 0? 1: currentStep - 1
    this.setState({
      currentStep: currentStep
    })
  }

  // The "next" and "previous" button functions
  get previousButton(){
    let currentStep = this.state.currentStep;
    // If the current step is not 1, then render the "previous" button
    if(currentStep !== 1){
      return (
        <button 
        className="btn btn-secondary" 
        type="button" 
        onClick={this._prev}>
            Previous
        </button>
      )
    }
    // ...else return nothing
    return null;
  }

  get nextButton(){
    let currentStep = this.state.currentStep;
    let fName = this.state.firstName;
    let lName = this.state.lastName;
    let comp = this.state.company;
    let mob = this.state.mobile;
    let temp = this.state.temperature;
    let contact = this.state.contactPerson;
    let fromT = this.state.fromTime;
    let toT = this.state.endTime;
    let scan = this.state.imageSrc;

    let allIsFilled = false;

    if ((
      fName,
      lName,
      comp,
      mob,
      temp,
      contact,
      fromT,
      toT
     ) !== "" && scan !== null) {
       allIsFilled = true;
     }

    // If the current step is not 3 and allIsFilled is true, then render the "next" button

    if(currentStep < 2 && allIsFilled){
      return (
        <button 
        className="btn btn-primary float-right" 
        type="button" 
        onClick={this._next}>
          Next
        </button> 
      )
    }
    // ...else render nothing
    return null;
  }

  // Use the submitted data to set the state

  handleChange(event) {
    
    const {
      name,
      value
    } = event.target

    this.setState(
      {[name]: value,},
      () => {this.validateField(name, value)}
    );
  }

  validateField(fieldName, value) {
    let validationRuleOne = /^[a-zA-Z_]+( [a-zA-Z_]+)*$/;
    let validationRuleTwo = /^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*$/;
    // let validationRuleThree = /^(?=.*[0-9])[- +()0-9]+$/;
    let validationRuleThree = /^[0-9-()]+(\s+[0-9-()]+)*$/;
    let fieldValidationErrors = this.state.formErrors;
    let nameValid = this.state.nameValid;

    switch(fieldName) {
      case 'firstName':
        nameValid = validationRuleOne.test(value);
        fieldValidationErrors.name = nameValid ? '': '* First name must contain alphabet, no space at the start and end *';
        break;
      case 'lastName':
        nameValid = validationRuleOne.test(value);
        fieldValidationErrors.name = nameValid ? '': '* Last name must contain alphabet, no space at the start and end *';
        break;
      case 'company':
        nameValid = validationRuleTwo.test(value);
        fieldValidationErrors.name = nameValid ? '': '* Company must contain alphanumeric, no space at the start and end *';
        break;
      case 'mobile':
        nameValid = validationRuleThree.test(value);
        fieldValidationErrors.name = nameValid ? '': '* Enter a valid mobile number *';
        break;
      case 'contactPerson':
        nameValid = validationRuleOne.test(value);
        fieldValidationErrors.name = nameValid ? '': '* Contact person must contain alphabet, no space at the start and end *';
        break;
      case 'temperature':
        let temp = parseFloat(value);
        nameValid = temp <= 37.2;
        fieldValidationErrors.name = nameValid ? '': '* Your entry is invalid or temperature exceeds limit *';
        break;
      default:
        break;
      
    }
    this.setState({formErrors: fieldValidationErrors,
      nameValid: nameValid,
      formValid: this.state.nameValid
    });
  }

  // Trigger an alert on form submission
  handleSubmit = (event) => {
    event.preventDefault()
    let { 
      firstName,
      lastName, 
      company,
      mobile,
      imageSrc,
      contactPerson,
      temperature,
      fromTime,
      endTime
    } = this.state;

    let self = this;
    // Time Calc

    const from_time_arr = fromTime.split(":");
    const end_time_arr = endTime.split(":");
    const from_seconds = (parseInt(from_time_arr[0], 10) * 60 * 60) + (parseInt(from_time_arr[1], 10) * 60);
    const end_seconds = (parseInt(end_time_arr[0], 10) * 60 * 60) + (parseInt(end_time_arr[1], 10) * 60);

    const total_seconds = end_seconds - from_seconds;
    const total_hours = total_seconds / 3600;
    
    const date = new Date();
    const isoDateTimeNow = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0, -1);
    const isoDateTimeEnd = new Date((date.getTime() + (total_hours*60*60*1000)) - (date.getTimezoneOffset() * 60000)).toISOString().slice(0, -1);

    firstName = firstName.toUpperCase();
    lastName = lastName.toUpperCase();
    company = company.toUpperCase();
    contactPerson = contactPerson.toUpperCase();
    
    console.log(isoDateTimeNow);
    console.log(isoDateTimeEnd);
    

    // End Time Time Calc

    const visits = {
      firstName: firstName,
      lastName: lastName,
      company: company,
      mobile: mobile,
      temperature: temperature,
      contactPerson: contactPerson,
      face: imageSrc
    };

    async function postData() {

        const axios = require('axios');

        await axios.post('https://sgctc-frmgtsys.sgctc.corp/visits', visits)
            .then(response => {
                // const new_b64 = response.data.face.replace('data:image/jpeg;base64,', '');
                // console.log(new_b64);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }
    
    const faceToMatch = imageSrc.replace('data:image/jpeg;base64,', '');
    
    const payloadMatching = {
        "image": {
            "imageBuffer": faceToMatch,
            "imageFormat": "jpeg",
            "imageWidth": 680,
            "imageHeight": 906,
            "imageSize": 92147
          },
          "templateType": ""
    }

    async function postDataMatching() {

        const axios = require('axios');

        await axios.post('https://sgctc-frapp02.sgctc.corp:5051/api/v1/BioAuth/Faces/CreateFaceTemplate', payloadMatching)
            .then(response => {
                const res = response.data;
                console.log("Sending request...")
                //console.log(res);

                const templateBuffer = res.template.templateBuffer;
                const templateSize = res.template.templateSize;
                const templateType = res.template.templateType;

                // console.log(templateBuffer);

                // Post to ISS API
                
                async function postISSFace() {
                    
                    const payloadFace = {
                        "Name": firstName + " " + lastName,
                        "Alias": "",
                        "FirstName": firstName,
                        "LastName": lastName,
                        "Gender": "",
                        "Nationality": "",
                        "Issuer": "CTC",
                        "Company": company,
                        "EffectiveFrom": isoDateTimeNow,
                        "EffectiveTo": isoDateTimeEnd,
                        "StaffId": mobile,
                        "DocumentType": "Visitor",
                        "FacialFlag": true,
                        "EmailAddress": "",
                        "HPNumber": mobile,
                        "OfficeNumber": "",
                        "UserStatus": "Active",
                        "Remark": "",
                        "ProfileImage": faceToMatch,
                        "FacialImages": [
                          {
                            "FacialImage": faceToMatch,
                            "ImageFormat": "jpg",
                            "ImageQuality": 0,
                            "FacialIndex": 0,
                            "Thumbnail": faceToMatch,
                            "FacialTemplates": [
                              {
                                "FacialTemplate": templateBuffer,
                                "TemplateType": templateType,
                                "TemplateSize": templateSize,
                                "ImageId": 0,
                                "Id": 0,
                                "RowVersion": "",
                                "CreateBy": "mark.christian@ctc-g.com.sg",
                                "CreateDateTime": isoDateTimeNow,
                                "UpdateBy": "mark.christian@ctc-g.com.sg",
                                "UpdateDateTime": isoDateTimeNow
                              }
                            ],
                            "Id": 0,
                            "RowVersion": "",
                            "CreateBy": "mark.christian@ctc-g.com.sg",
                            "CreateDateTime": isoDateTimeNow,
                            "UpdateBy": "mark.christian@ctc-g.com.sg",
                            "UpdateDateTime": isoDateTimeNow
                          }
                        ],
                        "AccessGroups": [
                          {
                            "Id": 33
                          }
                        ],
                        "EnableScreeningCheck": false,
                        "Id": 0,
                        "RowVersion": "",
                        "CreateBy": "mark.christian@ctc-g.com.sg",
                        "CreateDateTime": isoDateTimeNow,
                        "UpdateBy": "mark.christian@ctc-g.com.sg",
                        "UpdateDateTime": isoDateTimeNow
                      }
                      

                    const headers = {
                        "x-api-key": "SCYb7VmF6wzVYurMtk2xPpzE"
                    };
            
                    const axios = require('axios');

                    await axios.post('https://sgctc-frapp02.sgctc.corp:8081/api/v1/AccessUsers', payloadFace, { headers: headers })
                        .then(response => {
                            console.log("Response is ok.");
                            self.props.history.push("/submitted");
                        })
                        .catch(error => {
                            alert('There was an error!', error);
                        });
                }

                postISSFace();

                // End Post to ISS API
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    if (window.confirm('Is everything correct?')) {

      postData();
      postDataMatching();

      // this.setState({
      //   firstName: '',
      //   lastName: '', 
      //   company: '',
      //   mobile: '',
      //   temperature: '',
      //   contactPerson: '',
      //   fromTime: '',
      //   endTime: '',
      //   imageSrc: ''
      // });

    } else {
      console.log('Submission was cancelled.');
    }
    
  }

  render() {
    const limitterStyle = {
      backgroundColor: "#eeeeee",
      boxSizing: "border-box",
      boxShadow: "1px 1px 15px 10px #ccc",
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: "600px",
      padding: "10px 30px 30px 30px",
      width: "100%",
    }
    const hrStyle = {
      borderTop: "dotted 1px #aaaaaa",
      borderLeft: "0px",
      borderRiht: "0px",
      borderBottom: "0px"
    }

    const captureStyle = {
      textAlign: "center",
      backgroundColor: "#333333",
      height: "25px",
      width: "25px",
      marginLeft: "auto",
      marginRight: "auto",
      padding: "15px",
      borderRadius: "100%",
    }

    const snapStyle = {
      backgroundColor: "#ccc",
      height: "25px",
      width: "25px",
      borderRadius: "100%",
      marginLeft: "auto",
      marginRight: "auto",
      cursor: "pointer"
    }

    // const videoConstraints = {
    //   width: 360,
    //   height: 480,
    //   facingMode: "user"
    // };

    const messageCamStyle = {
      textAlign: "center",
      textTransform: "uppercase",
      fontSize: "10px"
    }

    const visitorImage = this.state.imageSrc;

    const refreshPage = () => {
      window.location.reload();
    }
    
    return (
        <div>
            <div className="header-graphics">
            <img alt="header-graphics" src={techgraphics} width="100%" />
            </div>
            <div className="main-wrapper" style={limitterStyle}>
            <h1>Visitor Registration</h1>
        
            Step <strong>{this.state.currentStep}</strong>
            <span onClick={refreshPage} >
              <svg className="refresh-page" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.5 2c-5.621 0-10.211 4.443-10.475 10h-3.025l5 6.625 5-6.625h-2.975c.257-3.351 3.06-6 6.475-6 3.584 0 6.5 2.916 6.5 6.5s-2.916 6.5-6.5 6.5c-1.863 0-3.542-.793-4.728-2.053l-2.427 3.216c1.877 1.754 4.389 2.837 7.155 2.837 5.79 0 10.5-4.71 10.5-10.5s-4.71-10.5-10.5-10.5z"/></svg>
            </span>

            <hr style={hrStyle} />
            <form onSubmit={this.handleSubmit} method='POST' encType="multipart/form-data">
                <Step1 
                currentStep={this.state.currentStep} 
                handleChange={this.handleChange}
                firstName={this.state.firstName}
                lastName={this.state.lastName}
                company={this.state.company}
                mobile={this.state.mobile}
                temperature={this.state.temperature}
                contactPerson={this.state.contactPerson}
                fromTime={this.state.fromTime}
                endTime={this.state.endTime}
                formErrors={this.state.formErrors.name}
                />
                {/* <Step2
                parentCallback = {this.handleCallback}
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
                face={this.state.face}
                /> */}

                <Step3 
                currentStep={this.state.currentStep}
                firstName={this.state.firstName}
                lastName={this.state.lastName}
                company={this.state.company}
                mobile={this.state.mobile}
                temperature={this.state.temperature}
                contactPerson={this.state.contactPerson}
                fromTime={this.state.fromTime}
                endTime={this.state.endTime}
                face={this.state.imageSrc}
                />
                
            </form>
            <div className="camera-icon-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-camera" viewBox="0 0 16 16">
                <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z"/>
                <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
                </svg>
                <span id="myBtn"> Open Camera</span>
            </div>
            </div>
            <div className="get-around">
            <span id="prev">{this.previousButton}</span>
            {this.state.formErrors.name ? null : <span id="next">{this.nextButton}</span>}
            </div>
            <div className="modal" id="myModal">
            <div className="modal-content">
              <span className="close">&times;</span>
              <p style={messageCamStyle}>Please take off your mask while taking photo. Thanks.</p>
              <Webcam
              className="vms-webcam"
              audio={false}
              height={480}
              ref={this.setRef}
              screenshotFormat="image/jpeg"
              width={360}
              // videoConstraints={videoConstraints}
              />
              <div className="snap-cam" style={captureStyle}>
              <div style={snapStyle} onClick={this.capture}></div>
              </div>
              {/* { this.state.imageSrc ? <img src={this.state.imageSrc} /> : null } */}
              { visitorImage ? <p className="capture-message">Image is captured!!!</p> : null }
              {/* <p id="face-string">{visitorImage}</p> */}
            </div>
            </div>
            <br />
            <div className="logo-section">
              <p className="powered-by">POWERED BY</p>
              <img alt="ctc-logo" src={ctclogo} width="100px" />
            </div>
        </div>
    );
  }
}

export default withRouter(Main);