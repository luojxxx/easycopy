import React, { useState } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import copy from "copy-to-clipboard";
import { Box, Flex, Heading, Text } from "rebass";
import { Label } from "@rebass/forms";
import { FiXSquare, FiCornerUpLeft, FiCopy } from "react-icons/fi";

import theme from "../theme";
import Template from "../components/Template";
import Clock from "../components/Clock";
import Input from "../components/Input";
import Selector from "../components/Selector";
import Textarea from "../components/Textarea";
import Button from "../components/Button";
import StarIcon from "../components/StarIcon";
import Loader from "../components/Loader";
import TextView from "../components/TextView";
import UrlView from '../components/UrlView'

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
  submissionProcessing,
  submissionError,
  notFoundPage,
  handleUserChange,
  handleContentChange,
  handleTypeChange,
  handleClear,
  handleBack,
  handleSubmit,
  user,
  content,
  type,
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
  const dateDisplay = date === "" ? "" : dayjs(date).format(dateFormat);
  return (
    <Template subheading="Copy stuff to human readable urls">
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
          <Flex flexDirection="row" justifyContent="center" alignItems="center">
            <Label htmlFor="content" style={{ width: "auto" }}>
              Content
            </Label>
            &nbsp;
            <Selector
              items={["text", "url"]}
              selected={type}
              handleSelect={isViewPage ? () => {} : handleTypeChange}
            />
          </Flex>
          <span>
            <Text color="primary">{`${content.length}/10000`}</Text>
          </span>
        </Flex>
        {!isViewPage && (
          <Textarea
            id="content"
            name="content"
            type="text"
            placeholder={!zeroContentFlag ? "" : "Must have content"}
            onChange={handleContentChange}
            value={content}
            style={{
              minHeight: "25vh"
            }}
          />
        )}
        {isViewPage && type === 'text' && (
          <TextView text={content} />
        )}
        {isViewPage && type === 'url' && (
          <UrlView url={content} />
        )}
      </Box>
      {pathname === "/" && !submissionProcessing && (
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
          >
            <Flex
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
            >
              <Text pr={2}>Submit</Text>
              <StarIcon />
            </Flex>
          </Button>
        </Flex>
      )}
      {pathname === "/" && submissionProcessing && (
        <Flex
          width={1}
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          style={{ height: "40px" }}
        >
          <Loader />
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
      <Flex width={1} justifyContent="center" style={{ textAlign: "center" }}>
        {submissionError ? (
          <Text color="primary">
            Sorry there was an error, we'll be fixing it soon
          </Text>
        ) : (
          <CopiedText pathname={pathname} copied={copied} />
        )}
      </Flex>
    </Template>
  );
};

AppDisplay.propTypes = {
  pathname: PropTypes.string.isRequired,
  zeroContentFlag: PropTypes.bool.isRequired,
  submissionProcessing: PropTypes.bool.isRequired,
  submissionError: PropTypes.bool.isRequired,
  notFoundPage: PropTypes.bool.isRequired,
  handleUserChange: PropTypes.func.isRequired,
  handleContentChange: PropTypes.func.isRequired,
  handleTypeChange: PropTypes.func.isRequired,
  handleClear: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
};

export default AppDisplay;
