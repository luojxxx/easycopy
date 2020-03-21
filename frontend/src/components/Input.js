import React from "react";
import styled from "styled-components";
import { Input } from "@rebass/forms";

import theme from "../theme";

const InputComponent = styled(Input)`
  :focus {
    outline-color: ${theme.colors.primary};
  }
  :-webkit-autofill {
    -webkit-transition-delay: 9999s;
    -webkit-transition: color 9999s ease-out, background-color 9999s ease-out;
  }
`;

export default InputComponent;
