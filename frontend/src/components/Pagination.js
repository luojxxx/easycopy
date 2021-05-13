import React from "react";
import styled from "styled-components";
import { Button, Box, Flex, Text } from "rebass";

const Pagination = ({ total, pageSize, setPage, page }) => {
  return (
    <Flex flexDirection="row" alignItems="center">
      <Text color="primary" pr={1} flexWrap="wrap">
        Page
      </Text>
      {Array.apply(null, Array(Math.ceil(total / pageSize)))
        .map((x, i) => (i + 1))
        .map((ele, idx) => (
          <Box p={1} style={{ cursor: "pointer" }} onClick={() => {setPage(ele - 1)}}>
            <Text color="primary" style={{textDecoration: idx === page ? 'underline' : 'none' }}>
              {ele}
            </Text>
          </Box>
        ))}
    </Flex>
  );
};

export default Pagination;
