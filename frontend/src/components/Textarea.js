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
`;

export default TextareaComponent;
