import React from "react";
import copy from "copy-to-clipboard";
import { Box, Flex, Heading, Button } from "rebass";
import { Label, Input, Textarea } from "@rebass/forms";
import { FaRegClipboard } from "react-icons/fa";

import theme from "./theme";

const AppDisplay = ({
  pathname,
  notFoundPage,
  handleUserChange,
  handleContentChange,
  handleSubmit,
  user,
  content
}) => {
  const copyPathToClipboard = () => {
    copy(window.location.href)
  }
  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      style={{
        width: "100vw",
        height: "100vh",
        background: theme.colors.background
      }}
    >
      <Heading color="primary">EasyCopy</Heading>
      <Box width={0.5} py={3}>
        <Label htmlFor="user">User</Label>
        <Input
          id="user"
          name="user"
          type="text"
          placeholder="johnDoe"
          onChange={handleUserChange}
          value={user}
        />
      </Box>
      <Box width={0.5} py={3}>
        <Flex width={1} justifyContent="space-between">
          <Label htmlFor="content">Content</Label>
          <span>{`${content.length}/10000`}</span>
        </Flex>
        <Textarea
          id="content"
          name="content"
          type="text"
          onChange={handleContentChange}
          value={content}
          style={{
            minHeight: "25vh"
          }}
        />
      </Box>
      {pathname === "/" && !notFoundPage && (
        <Button onClick={handleSubmit}>Submit</Button>
      )}
      {pathname !== "/" && !notFoundPage && (
        <Flex width={0.5} py={3} flexDirection="row" alignItems="center">
          <Input width={1} type="text" value={window.location.href} />
          <FaRegClipboard
            onClick={copyPathToClipboard}
            size={32}
            style={{
              cursor: "pointer"
            }}
          />
        </Flex>
      )}
      {pathname !== "/" && notFoundPage && <Heading>Not Found</Heading>}
    </Flex>
  );
};
export default AppDisplay;
