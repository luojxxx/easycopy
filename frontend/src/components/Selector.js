import React, { Fragment } from "react";
import styled from "styled-components";
import { Box, Flex, Text } from "rebass";

import theme from "../theme";

const Selection = styled.span`
  background-color: ${p =>
    p.highlight ? "rgba(255,255,255,0.5)" : theme.colors.transparent};
  color: ${p =>
    p.highlight ? theme.colors.transparent : theme.colors.primary};
  border-radius: 4px;
  padding: 0px 4px;
  margin: 0px 2px;
  cursor: pointer;
`;

const Selector = ({ items, selected, handleSelect }) => {
  return (
    <Flex flexDirection="row" justifyContent="center" alignItems="center">
      <span>
        <Text color="primary">(</Text>
      </span>
      {items.map((ele, idx) => (
          <Selection
            key={ele}
            highlight={ele === selected}
            onClick={() => handleSelect(ele)}
          >
            <Text color="primary">{ele}</Text>
          </Selection>
      ))}
      <span>
        <Text color="primary">)</Text>
      </span>
    </Flex>
  );
};

export default Selector;
