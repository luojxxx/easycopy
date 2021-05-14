import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Box, Flex, Text } from "rebass";

import theme from "../theme";

const UrlViewContainer = styled(Box)`
  border: 1px solid ${theme.colors.primary};
  border-radius: 4px;
  padding: 8px;
  height: 25vh;
  overflow-y: scroll;
  word-break: break-all;
  text-align: center;
`;

const UrlView = ({ url }) => {
  let href;
  if (!url.includes("http")) {
    href = "https://" + url;
  } else {
    href = url;
  }
  return (
    <UrlViewContainer>
      <a href={href}>
        <Flex
          justifyContent="center"
          alignItems="center"
          style={{ height: "100%" }}
        >
          <Text color="primary">{url}</Text>
        </Flex>
      </a>
    </UrlViewContainer>
  );
};

UrlView.propTypes = {
  text: PropTypes.string,
};
UrlView.defaultProps = {
  text: "",
};

export default UrlView;
