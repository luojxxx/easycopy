import React from "react";

import Template from "./components/Template";
import Textarea from "./components/Textarea";

const Privacy = () => (
  <Template subheading="Privacy">
    <Textarea
      type="text"
      value={"Placeholder text"}
      readOnly
      style={{
        minHeight: "50vh"
      }}
    />
  </Template>
);

export default Privacy;
