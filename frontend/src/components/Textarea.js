import React from "react";
import styled from "styled-components";
import { Textarea } from "@rebass/forms";

import theme from "../theme";

const TextareaComponent = styled(Textarea)`
  resize: none;
  :focus {
    outline-color: ${theme.colors.primary};
  }
`;

export default TextareaComponent;
