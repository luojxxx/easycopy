import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import theme from "../theme";

const AppContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;

  font-family: Source Code Pro;

  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  div::-webkit-scrollbar {
    width: 9px;
  }
  div::-webkit-scrollbar-track {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0);
  }
  div::-webkit-scrollbar-thumb {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.4);
  }
  div::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.6);
  }
  div::-webkit-scrollbar-thumb:window-inactive {
    background: rgba(255, 255, 255, 0.2);
  }

  a:link {
    text-decoration: none;
  }
  a:visited {
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
    text-decoration-color: ${theme.colors.primary};
  }
  a:active {
    text-decoration: none;
  }
`;

const Theme = ({ children }) => {
  return (
    <AppContainer id="appContainer">
      {children}
    </AppContainer>
  );
};

Theme.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Theme;
