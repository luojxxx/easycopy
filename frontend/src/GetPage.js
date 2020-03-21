import React from "react";
import copy from "copy-to-clipboard";
import { Box, Flex, Heading, Button, Text } from "rebass";
import { Label, Input, Textarea } from "@rebass/forms";
import { FaRegClipboard } from "react-icons/fa";

const GetPage = ({ user, content }) => {
  const handleCopyClipboard = () => {
    copy(window.location.href)
  }
  return (
    <React.Fragment>
      <Heading color="primary">EasyCopy</Heading>
      <Box width={0.5} py={3}>
        <Label htmlFor="user">User</Label>
        <Text>{user}</Text>
      </Box>
      <Box width={0.5} py={3}>
        <Label htmlFor="content">Content</Label>
         <Text>{content}</Text>
      </Box>
      <Flex width={0.5} py={3} flexDirection="row" alignItems="center">
        <Input width={1} type="text" value={window.location.href} />
        <FaRegClipboard onClick={handleCopyClipboard} size={32} style={{
          cursor: 'pointer'
        }} />
      </Flex>
    </React.Fragment>
  );
};

export default GetPage;
