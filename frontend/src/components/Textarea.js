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

  ::-webkit-scrollbar {
    width: 9px;
  }

  ::-webkit-scrollbar-track {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.0);
  }

  ::-webkit-scrollbar-thumb {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.4);
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.6);
  }

  ::-webkit-scrollbar-thumb:window-inactive {
    background: rgba(255, 255, 255, 0.2);
  }
`;

export default TextareaComponent;
