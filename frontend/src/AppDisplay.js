import React, { useState } from "react";
import copy from "copy-to-clipboard";
import styled from "styled-components";
import { Box, Flex, Heading, Button, Text } from "rebass";
import { Label } from "@rebass/forms";
import { FiCornerUpLeft, FiCopy } from "react-icons/fi";

import theme from "./theme";
import Input from "./components/Input";
import Textarea from "./components/Textarea";

const AppContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;

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

const CopiedText = ({ pathname, copied }) => {
  if (pathname !== "/" && copied) {
    return <Text color="primary">copied url</Text>;
  } else {
    return <Text>&nbsp;</Text>;
  }
};

const AppDisplay = ({
  pathname,
  zeroContentFlag,
  notFoundPage,
  handleUserChange,
  handleContentChange,
  handleBack,
  handleSubmit,
  user,
  content
}) => {
  const [copied, setCopied] = useState(false);
  const copyPathToClipboard = () => {
    copy(window.location.href);
    document.getElementById("pathField").focus();
    setCopied(true);
  };
  const handleSelect = () => {
    document.getElementById("pathField").select();
  };
  const handleClickBack = () => {
    setCopied(false);
    handleBack();
  };
  const isViewPage = pathname !== "/";
  return (
    <AppContainer>
      <Heading color="primary" pb={3}>
        EasyCopy
      </Heading>
      <Box width={0.5} pb={3}>
        <Label htmlFor="user">User (optional)</Label>
        <Input
          id="user"
          name="user"
          type="text"
          onChange={handleUserChange}
          value={user}
          readOnly={isViewPage}
        />
      </Box>
      <Box width={0.5} pb={3}>
        <Flex width={1} justifyContent="space-between">
          <Label htmlFor="content">Content</Label>
          <span>
            <Text color="primary">{`${content.length}/10000`}</Text>
          </span>
        </Flex>
        <Textarea
          id="content"
          name="content"
          type="text"
          placeholder={!zeroContentFlag ? "" : 'Must have content'}
          onChange={handleContentChange}
          value={content}
          readOnly={isViewPage}
          style={{
            minHeight: "25vh"
          }}
        />
      </Box>
      {pathname === "/" && !notFoundPage && (
        <Button
          variant="primary"
          mb={1}
          onClick={handleSubmit}
          style={{ cursor: "pointer" }}
        >
          Submit
        </Button>
      )}
      {pathname !== "/" && !notFoundPage && (
        <Flex width={0.5} flexDirection="column">
          <Flex width={1} pb={1} flexDirection="row" alignItems="center">
            <FiCornerUpLeft
              onClick={handleClickBack}
              size={32}
              style={{
                cursor: "pointer",
                color: theme.colors.primary
              }}
              title="Go back"
            />
            <Input
              id="pathField"
              width={1}
              mx={2}
              type="text"
              onClick={handleSelect}
              value={window.location.href}
              readOnly
            />
            <FiCopy
              onClick={copyPathToClipboard}
              size={32}
              style={{
                cursor: "pointer",
                color: theme.colors.primary
              }}
              title="Copy to clipboard"
            />
          </Flex>
        </Flex>
      )}
      {pathname !== "/" && notFoundPage && (
        <Box mb={1} style={{ height: "36px" }}>
          <Heading color="primary">Not Found</Heading>
        </Box>
      )}
      <CopiedText pathname={pathname} copied={copied} />
    </AppContainer>
  );
};
export default AppDisplay;
