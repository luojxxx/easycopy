import React from "react";
import { Text } from "rebass";

import Template from "./components/Template";
import Textarea from "./components/Textarea";

const TermsOfService = () => (
  <Template subheading="Terms Of Service">
    <Textarea
      type="text"
      value={"Placeholder text"}
      readOnly
      style={{
        minHeight: "25vh"
      }}
    />
  </Template>
);

export default TermsOfService;
