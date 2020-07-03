import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Flex, Heading, Text } from "rebass";

import theme from "../theme";

const AppContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

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

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  width: 100%;
  position: absolute;
  bottom: 1em;
`;

const Template = ({ subheading, children }) => {
  const resetHeight = () => {
    // reset the body height to that of the inner browser
    const container = document.getElementById("appContainer");
    container.style.height = window.innerHeight + "px";
  };
  useEffect(() => {
    window.addEventListener("resize", resetHeight);
    resetHeight();
    return () => {
      window.removeEventListener("resize", resetHeight);
    };
  }, []);
  return (
    <AppContainer id="appContainer">
      <Link to="/">
        <Heading color="primary" pb={3}>
          EasyCopy.io
        </Heading>
      </Link>
      <Box width={[0.95, 0.7, 0.5]}>
        <Flex width={1} justifyContent="center">
          <Box width={0.8} style={{ textAlign: "center" }}>
            <Text color="primary" pb={3}>
              {subheading}
            </Text>
          </Box>
        </Flex>
        {children}
      </Box>
      <Footer>
        <Link to="/">
          <Text px={1} color="primary">
            Home
          </Text>
        </Link>
        <Link to="/contact">
          <Text px={1} color="primary">
            Contact
          </Text>
        </Link>
        <Link to="/privacy">
          <Text px={1} color="primary">
            Privacy
          </Text>
        </Link>
        <Link to="/termsofservice">
          <Text px={1} color="primary">
            Terms
          </Text>
        </Link>
        {/* <Link to="/donate">
          <Text px={1} color="primary">
            Donate
          </Text>
        </Link> */}
      </Footer>
    </AppContainer>
  );
};

Template.propTypes = {
  children: PropTypes.node.isRequired,
  subheading: PropTypes.string.isRequired
};

export default Template;
