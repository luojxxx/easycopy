import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Flex, Heading, Button, Text } from "rebass";

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
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 100%;
  position: absolute;
  bottom: 1em;

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

const Template = ({ subheading, children }) => (
  <AppContainer>
    <Heading color="primary" pb={3}>
      EasyCopy
    </Heading>
    <Box width={0.5}>
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
          Terms of Service
        </Text>
      </Link>
    </Footer>
  </AppContainer>
);

export default Template;
