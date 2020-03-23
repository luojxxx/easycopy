import React, { useState } from "react";
import dayjs from "dayjs";
import copy from "copy-to-clipboard";
import { Box, Flex, Heading, Text } from "rebass";
import { Label } from "@rebass/forms";
import { FiXSquare, FiStar, FiCornerUpLeft, FiCopy } from "react-icons/fi";

import theme from "./theme";
import Template from "./components/Template";
import Input from "./components/Input";
import Textarea from "./components/Textarea";
import Button from "./components/Button";
import Clock from "./components/Clock";

const CopiedText = ({ pathname, copied }) => {
  if (pathname !== "/" && copied) {
    return <Text color="primary">copied url</Text>;
  } else {
    return <Text>&nbsp;</Text>;
  }
};

const dateFormat = "YYYY-MM-DD HH:mm:ss A";

const AppDisplay = ({
  pathname,
  zeroContentFlag,
  notFoundPage,
  handleUserChange,
  handleContentChange,
  handleClear,
  handleBack,
  handleSubmit,
  user,
  content,
  date
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
  const dateDisplay = date === '' ? '' : dayjs(date).format(dateFormat)
  return (
    <Template subheading="Copy text to human readable urls">
      <Box width={1} pb={3}>
        <Text color="primary">
          {isViewPage ? `Date: ${dateDisplay}` : <Clock format={dateFormat} />}
        </Text>
      </Box>
      <Box width={1} pb={3}>
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
      <Box width={1} pb={3}>
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
          placeholder={!zeroContentFlag ? "" : "Must have content"}
          onChange={handleContentChange}
          value={content}
          readOnly={isViewPage}
          style={{
            minHeight: "25vh"
          }}
        />
      </Box>
      {pathname === "/" && (
        <Flex
          width={1}
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
        >
          {/* <FiXSquare
            onClick={handleClear}
            size={32}
            style={{
              cursor: "pointer",
              color: theme.colors.primary
            }}
            title="Clear"
          /> */}
          <Button
            variant="primary"
            width={1}
            // ml={2}
            mb={1}
            onClick={handleSubmit}
            style={{ cursor: "pointer" }}
          >
            <Flex
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
            >
              <Text pr={2}>Submit</Text>
              <FiStar />
            </Flex>
          </Button>
        </Flex>
      )}
      {pathname !== "/" && !notFoundPage && (
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
      )}
      {pathname !== "/" && notFoundPage && (
        <Flex
          width={1}
          mb={1}
          justifyContent="center"
          style={{ height: "36px" }}
        >
          <Heading color="primary">Not Found</Heading>
        </Flex>
      )}
      <Flex width={1} justifyContent="center">
        <CopiedText pathname={pathname} copied={copied} />
      </Flex>
    </Template>
  );
};
export default AppDisplay;
