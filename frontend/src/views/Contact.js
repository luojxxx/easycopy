import React from "react";

import Template from "../components/Template";
import Textarea from "../components/Textarea";

const text = "email: contact@quickshift.io"

const Contact = () => (
  <Template subheading="Contact">
    <Textarea
      type="text"
      value={text}
      readOnly
      style={{
        minHeight: "25vh",
        marginBottom: '1em'
      }}
    />
  </Template>
);

export default Contact;
