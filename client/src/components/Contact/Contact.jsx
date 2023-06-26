import "./Contact.css";
import React, { useState } from "react";
import { useForm, ValidationError } from '@formspree/react';
import { useNavigate } from "react-router";


const Contact = () => {
  const navigate = useNavigate();
  // const [open, setOpen] = useState(false);
  const [state, handleSubmit] = useForm("xjvdnakj");
  const headBack = () => {
    navigate('/');
  }
  if (state.succeeded) {
    return (
      <div className="main">
        <h3>Thanks For Your Feedback!</h3>
        <button onClick={headBack}>Back to Homepage</button>
      </div>
    )

  }

  return (
    <>
      <div className="main_container">
        <form className="signinform" onSubmit={handleSubmit}>
          <div className="name">
            <div className="name1">
              <div className="fname">First Name</div>
              <input className="fnamein"></input>
            </div>
            <div className="name2">
              <div className="lname">Last Name</div>
              <input className="lnamein"></input>
            </div>
          </div>
          <div className="mailpass">
            <div className="email">Email Address</div>
            <input className="emailin" id="email" type="email" name="email" />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
            <textarea
              rows="4"
              style={{ resize: "none" }}
              className="emailarea"
              placeholder="Enter query / message.."
              id="message"
              name="message"
            ></textarea>
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
          </div>
          <button className="submit" type="submit" disabled={state.submitting}>SEND</button>
        </form>
      </div>

    </>
  );
};

export default Contact;
