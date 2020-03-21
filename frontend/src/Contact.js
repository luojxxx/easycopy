import React from "react";
import { Text } from "rebass";

import Template from "./components/Template";
import Textarea from "./components/Textarea";

const text = "email: contact@easycopy.com"

const Contact = () => (
  <Template subheading="Contact">
    <Textarea
      type="text"
      value={text}
      readOnly
      style={{
        minHeight: "25vh"
      }}
    />
  </Template>
);

export default Contact;
