import React, { useState } from "react";
import copy from "copy-to-clipboard";
import { Box, Flex, Heading, Button, Text } from "rebass";
import { Label, Input, Textarea } from "@rebass/forms";
import { FaRegClipboard } from "react-icons/fa";

import theme from "./theme";

const CopiedText = ({ pathname, copied }) => {
  if (pathname !== "/" && copied) {
    return <Text>copied url</Text>;
  } else {
    return <Text>&nbsp;</Text>;
  }
};

const AppDisplay = ({
  pathname,
  notFoundPage,
  handleUserChange,
  handleContentChange,
  handleSubmit,
  user,
  content
}) => {
  const [copied, setCopied] = useState(false);
  const copyPathToClipboard = () => {
    copy(window.location.href);
    document.getElementById("pathField").focus();
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 5000);
  };
  const isViewPage = pathname !== "/";
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
      <Heading color="primary" pb={3}>EasyCopy</Heading>
      <Box width={0.5} pb={3}>
        <Label htmlFor="user">User</Label>
        <Input
          id="user"
          name="user"
          type="text"
          placeholder="johnDoe"
          onChange={isViewPage ? () => {} : handleUserChange}
          value={user}
        />
      </Box>
      <Box width={0.5} pb={3}>
        <Flex width={1} justifyContent="space-between">
          <Label htmlFor="content">Content</Label>
          <span>{`${content.length}/10000`}</span>
        </Flex>
        <Textarea
          id="content"
          name="content"
          type="text"
          onChange={isViewPage ? () => {} : handleContentChange}
          value={content}
          style={{
            minHeight: "25vh"
          }}
        />
      </Box>
      {pathname === "/" && !notFoundPage && (
        <Button variant="primary" mb={1} onClick={handleSubmit}>
          Submit
        </Button>
      )}
      {pathname !== "/" && !notFoundPage && (
        <Flex width={0.5} flexDirection="column">
          <Flex width={1} pb={1} flexDirection="row" alignItems="center">
            <Input
              id="pathField"
              width={1}
              mr={2}
              type="text"
              value={window.location.href}
            />
            <FaRegClipboard
              onClick={copyPathToClipboard}
              size={32}
              style={{
                cursor: "pointer"
              }}
            />
          </Flex>
        </Flex>
      )}
      {pathname !== "/" && notFoundPage && (
        <Box mb={1} style={{ height: '36px'}}>
          <Heading>Not Found</Heading>
        </Box>
      )}
      <CopiedText pathname={pathname} copied={copied} />
    </Flex>
  );
};
export default AppDisplay;
