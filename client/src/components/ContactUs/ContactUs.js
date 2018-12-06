import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./contact.css";
import { validateForm, Loader } from "./helper.js";
import axios from "axios";

class Copyright extends Component {
  state = {
    data: {
      firstName: "",
      lastName: "",
      contactNumber: "",
      message: "",
      email: ""
    }
  };

  handleChnage = e => {
    const { name, value } = e.target;
    // this.setState({ [name]: value })
    let { data, errors } = this.state;
    data[name] = value;
    this.setState({
      data,
      errors: validateForm("each", data, name, errors)
    });
  };
  onSubmit = () => {
    let { data } = this.state;
    const {
      firstName,
      lastName,
      contactNumber,
      message,
      email
    } = this.state.data;
    let validate = validateForm("all", data);
    if (validate.hasError) {
      this.setState({ errors: validate });
      return;
    }
    this.setState({showLoader:true});
    axios
      .post("http://localhost:3001/contactform", {
        firstName,
        lastName,
        phoneNumber: contactNumber,
        description: message,
        email
      })
      .then(response => {
        console.log("response from server ", response);
        this.setState({
          data: {
            showLoader:false,
            firstName: "",
            lastName: "",
            contactNumber: "",
            message: "",
            email: ""
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    const {
      firstName,
      lastName,
      contactNumber,
      message,
      email,
      errors,
      showLoader
    } = this.state;
    return (
      <div>
        {showLoader ? <Loader /> : <div />}
        <div className="container" style={{ padding: 0 }}>
          <div className="Rectangle-58 col-md-12">
            <div id="myForm" style={{ width: "70vw" }}>
              <h1 className="APPLICATION-FORM">Contact Us</h1>
              <div className="row">
                <div className="col-md-6 row2mail">
                  <label className="label">
                    First Name:
                    {errors && errors.errorsObj.firstName && (
                      <span className="errorContact staric">*</span>
                    )}
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={this.handleChnage}
                    name="firstName"
                    className="form-control input11"
                    placeholder="First name"
                  />
                  {errors && errors.errorsObj.firstName && (
                    <p className="errorContact">
                      {errors.errorsObj.firstName.message}
                    </p>
                  )}
                </div>
                <div className="col-md-6 row2mail">
                  <label className="label">
                    Last Name:
                    {errors && errors.errorsObj.lastName && (
                      <span className="errorContact staric">*</span>
                    )}
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={this.handleChnage}
                    name="lastName"
                    className="form-control input11"
                    placeholder="Last name"
                  />
                  {errors && errors.errorsObj.lastName && (
                    <p className="errorContact">
                      {errors.errorsObj.lastName.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 row2mail">
                  <label className="label">
                    Contact #:
                    {errors && errors.errorsObj.contactNumber && (
                      <span className="errorContact staric">*</span>
                    )}
                  </label>
                  <input
                    type="number"
                    value={contactNumber}
                    name="contactNumber"
                    onChange={this.handleChnage}
                    className="form-control input11"
                    placeholder="03XX-XXXXXXX"
                  />
                  {errors && errors.errorsObj.contactNumber && (
                    <p className="errorContact">
                      {errors.errorsObj.contactNumber.message}
                    </p>
                  )}
                </div>
                <div className="col-md-6 row2mail">
                  <label className="label">
                    Email Address:
                    {errors && errors.errorsObj.email && (
                      <span className="errorContact staric">*</span>
                    )}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={this.handleChnage}
                    name="email"
                    className="form-control input11"
                    placeholder="example@abc.com"
                  />
                  {errors && errors.errorsObj.email && (
                    <p className="errorContact">
                      {errors.errorsObj.email.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 row2mail">
                  <label className="label">
                    Your Message:
                    {errors && errors.errorsObj.message && (
                      <span className="errorContact staric">*</span>
                    )}
                  </label>
                  <textarea
                    type="text"
                    rows={8}
                    maxlength="250"
                    onChange={this.handleChnage}
                    className="form-control textArea"
                    placeholder="Message here"
                    value={message}
                    name="message"
                  />
                  {errors && errors.errorsObj.message && (
                    <p className="errorContact">
                      {errors.errorsObj.message.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="row btnRow">
                <div className="col-md-3">
                  <button
                    onClick={this.onSubmit}
                    className=" btn Rectangle-112 col-md-12"
                  >
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Copyright;