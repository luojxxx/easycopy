import React, { useState, Fragment } from "react";
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
import UrlView from "../components/UrlView";

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
  const generateMsg = (isCreatePage, copied, submissionError) => {
    if (isCreatePage && !submissionError) {
      return "";
    }
    if (isCreatePage && submissionError) {
      return "Sorry there was an error, we'll be fixing it soon";
    }
    if (!isCreatePage && !copied) {
      return "Expires after a month";
    }
    if (!isCreatePage && copied) {
      return "copied url";
    }
  };
  const isCreatePage = pathname === "/";
  const dateDisplay = date === "" ? "" : dayjs(date).format(dateFormat);
  return (
    <Template subheading="Copy stuff to human readable urls">
      <Box width={1} pb={3}>
        <Text color="primary">
          {isCreatePage ? <Clock format={dateFormat} /> : `Date: ${dateDisplay}` }
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
          readOnly={!isCreatePage}
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
              handleSelect={isCreatePage ? handleTypeChange : () => {}}
            />
          </Flex>
          <span>
            <Text color="primary">{`${content.length}/10000`}</Text>
          </span>
        </Flex>
        {isCreatePage && (
          <Textarea
            id="content"
            name="content"
            type="text"
            placeholder={zeroContentFlag ? "Must have content" : ""}
            onChange={handleContentChange}
            value={content}
            style={{
              minHeight: "25vh"
            }}
          />
        )}
        {!isCreatePage && type === "text" && <TextView text={content} />}
        {!isCreatePage && type === "url" && <UrlView url={content} />}
      </Box>
      <Flex
        width={1}
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        style={{ height: '40px' }}
      >
        {isCreatePage && !submissionProcessing && (
          <Button variant="primary" width={1} mb={1} onClick={handleSubmit}>
            <Flex
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
            >
              <Text pr={2}>Submit</Text>
              <StarIcon />
            </Flex>
          </Button>
        )}
        {isCreatePage && submissionProcessing && <Loader />}
        {!isCreatePage && !notFoundPage && (
          <Fragment>
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
          </Fragment>
        )}
        {!isCreatePage && notFoundPage && (
          <Heading color="primary">Not Found</Heading>
        )}
      </Flex>
      <Flex width={1} justifyContent="center" style={{ textAlign: "center" }}>
        <Text color="primary">
          {generateMsg(isCreatePage, copied, submissionError) || (
            <span>&nbsp;</span>
          )}
        </Text>
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
