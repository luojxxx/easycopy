import React from "react";
import styled from "styled-components";
import { Button } from "rebass";

import theme from "../theme";

const ButtonComponent = styled(Button)`
  outline-color: ${theme.colors.primary};
  cursor: pointer;
`;

export default ButtonComponent;
