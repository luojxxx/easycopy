import React from "react";
import PropTypes from 'prop-types'
import styled from "styled-components";
import { Box, Text } from 'rebass';

import theme from "../theme";

const TextViewContainer = styled(Box)`
  border: 1px solid ${theme.colors.primary};
  border-radius: 4px;
  padding: 8px;
  height: 25vh;
  overflow-y: scroll;
  white-space: pre-wrap;
`;

const TextView = ({ text }) => (
  <TextViewContainer>
    <Text color="primary">{text}</Text>
  </TextViewContainer>
)

TextView.propTypes = {
  text: PropTypes.string
}
TextView.defaultProps = {
  text: ''
}

export default TextView;
