import React from "react";
import TextField from '@material-ui/core/TextField';
// import Datetime from "react-datetime";
// import "react-datetime/css/react-datetime.css";

class Step1 extends React.Component {render() {
    if (this.props.currentStep !== 1) { // Prop: The current step
      return null
    }

    // The markup for the Step 1 UI
    return(
      <div className="form-group">
        {this.props.formErrors ? <div className="form-error"> {this.props.formErrors} </div> : null}
        <label htmlFor="firstName">First Name</label>
        <input 
          className="form-control"
          id="firstName"
          name="firstName"
          type="text"
          placeholder="Enter first name"
          value={this.props.firstName} 
          onChange={this.props.handleChange}
          required
        />
        <label htmlFor="last-name">Last Name</label>
        <input 
          className="form-control"
          id="lastName"
          name="lastName"
          type="text"
          placeholder="Enter last name"
          value={this.props.lastName} // Prop: The last name input data
          onChange={this.props.handleChange} // Prop: Puts data into state
          required
        />
        <label htmlFor="company">Company</label>
        <input 
          className="form-control"
          id="company"
          name="company"
          type="text"
          placeholder="Enter company name"
          value={this.props.company} // Prop: The company input data
          onChange={this.props.handleChange} // Prop: Puts data into state
          required
        />
        <div className="spec-section">
          <label htmlFor="mobile">Mobile Number</label>
            <input 
            className="form-control"
            id="mobile"
            name="mobile"
            type="text"
            placeholder="Enter mobile number"
            value={this.props.mobile} // Prop: The mobile number input data
            onChange={this.props.handleChange} // Prop: Puts data into state
            required
          />
        </div>
        <div className="spec-section">
          <label htmlFor="temperature">Temperature</label>
          <input 
            className="form-control"
            id="temperature"
            name="temperature"
            type="text"
            placeholder="Enter temperature"
            value={this.props.temperature} // Prop: The mobile number input data
            onChange={this.props.handleChange} // Prop: Puts data into state
            required
          />
        </div>
        
        <label htmlFor="contactPerson">Contact Person</label>
        <input 
          className="form-control"
          id="contactPerson"
          name="contactPerson"
          type="text"
          placeholder="Enter contact person name"
          value={this.props.contactPerson} // Prop: The mobile number input data
          onChange={this.props.handleChange} // Prop: Puts data into state
          required
        />
        <label htmlFor="visitDuration">Visit Duration</label><br /><br />
        <TextField
          className="time-picker"
          clearable="true"
          id="fromTime"
          name="fromTime"
          type="time"
          label="From"
          placeholder="08:00 AM"
          // mask="__:__ _M"
          value={this.props.fromTime} // Prop: The mobile number input data
          onChange={this.props.handleChange} // Prop: Puts data into state
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          className="time-picker"
          clearable="true"
          id="endTime"
          name="endTime"
          type="time"
          placeholder="08:00 AM"
          // mask="__:__ _M"
          label="To"
          value={this.props.endTime} // Prop: The mobile number input data
          onChange={this.props.handleChange} // Prop: Puts data into state
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br /><br />
      </div>
    )}
  }

export default Step1;