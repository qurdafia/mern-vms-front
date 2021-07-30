import React from "react";

class Step3 extends React.Component {

    render() {
    
    if (this.props.currentStep !== 2) { // Prop: The current step
      return null
    }

    const from_time_arr = this.props.fromTime.split(":");
    const end_time_arr = this.props.endTime.split(":");
    const from_seconds = (parseInt(from_time_arr[0], 10) * 60 * 60) + (parseInt(from_time_arr[1], 10) * 60);
    const end_seconds = (parseInt(end_time_arr[0], 10) * 60 * 60) + (parseInt(end_time_arr[1], 10) * 60);

    const total_seconds = end_seconds - from_seconds;
    const total_hours = Math.ceil(total_seconds / 3600);

    const fName = this.props.firstName.toUpperCase();
    const lName = this.props.lastName.toUpperCase();
    const comp = this.props.company.toUpperCase();
    const contact = this.props.contactPerson.toUpperCase();
    const face = this.props.face;
    const mob = this.props.mobile;
    const temp = this.props.temperature;

    // The markup for the Step 2 UI
    return(
        <div>
            <p><strong>Check Visitor Details</strong></p>
            <img alt="face should be here" width="200px" src={face} />
            <p>
                <strong>{fName ? fName : "Full name should be here"}&nbsp;{lName}</strong><br />
                {comp ? "Company: " + comp : "Company should be here" }<br />
                {mob ? "Mobile: " + mob : "Mobile number should be here"}<br />
                {temp ? "Temperature: " + temp : "Temperature should be here"}<br />
                {contact ? "Contact Person: " + contact : "Contact person name should be here"}<br />
                Visit Duration: {total_hours} Hour(s)
            </p>
            
            <input
                id="submit-button"  
                type="submit"
                value="Enroll Visitor"
            />
                
        </div> 
    )}
}
export default Step3;