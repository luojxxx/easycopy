import React from "react";
import styled from "styled-components";
import { Textarea } from "@rebass/forms";

import theme from "../theme";

const TextareaComponent = styled(Textarea)`
  resize: none;
  ::placeholder {
    color: ${theme.colors.primary};
  }
  :focus {
    outline-color: ${theme.colors.primary};
  }
  :-webkit-autofill {
    -webkit-transition-delay: 9999s;
    -webkit-transition: color 9999s ease-out, background-color 9999s ease-out;
  }
`;

export default TextareaComponent;
