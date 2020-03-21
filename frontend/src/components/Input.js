import React from "react";
import styled from "styled-components";
import { Input } from "@rebass/forms";

import theme from "../theme";

const InputComponent = styled(Input)`
  :focus {
    outline-color: ${theme.colors.primary};
  }
`;

export default InputComponent;
