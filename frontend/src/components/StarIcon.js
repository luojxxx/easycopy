import React from "react";
import styled from "styled-components";
import { Flex } from "rebass";
import { FaRegStar, FaStar } from "react-icons/fa";

import Button from './Button'

const StarOutline = styled(FaRegStar)`
  position: absolute;
  top: 50%;
  margin-top: -50%;
  left: 50%;
  margin-left: -50%;
`;
const StarFilled = styled(FaStar)`
  position: absolute;
  top: 50%;
  margin-top: -50%;
  left: 50%;
  margin-left: -50%;
  color: rgba(0, 0, 0, 0);

  -webkit-transition: color 0.25s;
  ${Button}:hover & {
    color: rgba(255,255,255,1);
    -webkit-transition: color 0.25s;
  }
`;

const StarIcon = () => (
  <Flex
    flexDirection="row"
    justifyContent="center"
    alignItems="center"
    style={{
      position: "relative",
      width: '18px',
      height: '15px',
      marginTop: '3px'
    }}
  >
    <StarOutline />
    <StarFilled />
  </Flex>
);

export default StarIcon;
