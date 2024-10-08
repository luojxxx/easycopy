import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Flex, Heading, Text } from "rebass";

import AccountBar from "./AccountBar";

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;

  width: 100%;
  box-sizing: border-box;
  padding: 8px;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  width: 100%;
  box-sizing: border-box;
  padding: 8px;
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
    <Flex
      width={1}
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      style={{ height: "100%" }}
    >
      <Header id="header">
        <AccountBar />
      </Header>
      <Flex
        id="body"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width={[0.95, 0.8, 0.7]}
        style={{
          flex: '1 1 auto',
          overflowY: 'scroll',
        }}
      >
        {subheading && (
          <Fragment>
            <Link to="/">
              <Heading color="primary" pb={3}>
                EasyCopy.io
              </Heading>
            </Link>
            <Flex width={1} justifyContent="center">
              <Box width={0.8} style={{ textAlign: "center" }}>
                <Text color="primary" pb={3}>
                  {subheading}
                </Text>
              </Box>
            </Flex>
          </Fragment>
        )}
        {children}
      </Flex>
      <Footer id="footer">
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
    </Flex>
  );
};

Template.propTypes = {
  children: PropTypes.node.isRequired,
  subheading: PropTypes.string.isRequired,
};

export default Template;
