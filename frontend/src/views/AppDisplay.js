import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { Box, Flex, Heading, Text } from "rebass";
import { Label } from "@rebass/forms";
import { FiXSquare, FiCornerUpLeft, FiCopy } from "react-icons/fi";
import { FaQrcode } from "react-icons/fa";

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
import QRCodeView from "../components/QRCodeView";

const clip = require("clipboardy");

const dateFormat = "YYYY-MM-DD hh:mm:ss A";
const userCharLimit = 256;
const contentCharLimit = 10000;

const getFormattedUrl = (url) => {
  const path = window.location.host;
  const wwwIdx = window.location.host.indexOf("www.");
  const localhostIdx = window.location.host.indexOf("localhost");
  let substringIdx = 0;
  if (wwwIdx !== -1) {
    substringIdx = wwwIdx + 4;
  }
  if (localhostIdx !== -1) {
    substringIdx = localhostIdx;
  }
  return `${path.substring(substringIdx)}/${url}`
};

const AppDisplay = ({
  pathname,
  zeroContentFlag,
  submissionProcessing,
  submissionError,
  notFoundPage,
  showRecaptcha,
  handleUserChange,
  handleContentChange,
  handleTypeChange,
  handleClear,
  handleBack,
  handleSubmit,
  url,
  user,
  content,
  type,
  date,
}) => {
  const [copied, setCopied] = useState(false);
  const [displayQRCode, setDisplayQRCode] = useState(false);
  const handleClickBack = () => {
    setCopied(false);
    handleBack();
  };
  const pasteContentToClipboard = async () => {
    const text = await clip.read();
    handleContentChange({ target: { value: text } });
  };
  const copyContentToClipboard = () => {
    clip.write(content);
  };
  const copyPathToClipboard = () => {
    clip.write(window.location.href);
    document.getElementById("pathField").focus();
    setCopied(true);
  };
  const handleSelect = () => {
    document.getElementById("pathField").select();
  };
  const showQRCode = () => {
    setDisplayQRCode(true);
  };
  const closeQRCode = () => {
    setDisplayQRCode(false);
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
    <Template subheading="Copy stuff to human readable urls or camera scannable QR codes">
      {!displayQRCode && (
        <Fragment>
          <Box width={1} pb={3}>
            <Text color="primary">
              {isCreatePage ? (
                <Clock format={dateFormat} />
              ) : (
                `Date: ${dateDisplay}`
              )}
            </Text>
          </Box>
          <Box width={1} pb={3}>
            <Flex
              flexDirection="row"
              justifyContent="space-between"
              style={{ userSelect: "None" }}
            >
              <Label htmlFor="user">User (optional)</Label>
              <span>
                <Text color="primary">{`${userCharLimit - user.length}`}</Text>
              </span>
            </Flex>
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
              <Flex
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                style={{ userSelect: "None" }}
              >
                <Label htmlFor="content" style={{ width: "auto" }}>
                  Content
                </Label>
                &nbsp;
                <Selector
                  items={["text", "url"]}
                  selected={type}
                  handleSelect={isCreatePage ? handleTypeChange : () => {}}
                />
                &nbsp;
                <Box
                  onClick={
                    isCreatePage
                      ? pasteContentToClipboard
                      : copyContentToClipboard
                  }
                  style={{ cursor: "pointer" }}
                >
                  <Text color="primary">
                    {isCreatePage ? "[paste]" : "[copy]"}
                  </Text>
                </Box>
              </Flex>
              <span>
                <Text color="primary">{`${
                  contentCharLimit - content.length
                }`}</Text>
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
                  minHeight: "25vh",
                }}
              />
            )}
            {!isCreatePage && type === "text" && <TextView text={content} />}
            {!isCreatePage && type === "url" && <UrlView url={content} />}
          </Box>
          <Flex
            width={1}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
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
            {isCreatePage && submissionProcessing && !showRecaptcha && <Loader />}
            {!isCreatePage && !notFoundPage && (
              <Fragment>
                <Flex width={1} pb={2}>
                  <Input
                    id="pathField"
                    width={1}
                    type="text"
                    onClick={handleSelect}
                    value={getFormattedUrl(url)}
                    readOnly
                  />
                </Flex>
                <Flex width={1} justifyContent="space-around">
                  <Button
                    variant="primary"
                    width={1}
                    mb={1}
                    onClick={handleClickBack}
                  >
                    <Flex
                      flexDirection="row"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Text pr={2}>Back</Text>
                      <FiCornerUpLeft />
                    </Flex>
                  </Button>
                  <Button
                    variant="primary"
                    width={1}
                    mb={1}
                    mx={1}
                    onClick={copyPathToClipboard}
                  >
                    <Flex
                      flexDirection="row"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Text pr={2}>Copy</Text>
                      <FiCopy />
                    </Flex>
                  </Button>
                  <Button
                    variant="primary"
                    width={1}
                    mb={1}
                    onClick={showQRCode}
                  >
                    <Flex
                      flexDirection="row"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Text pr={2}>QR</Text>
                      <FaQrcode />
                    </Flex>
                  </Button>
                </Flex>
              </Fragment>
            )}
            {!isCreatePage && notFoundPage && (
              <Heading color="primary">Not Found</Heading>
            )}
          </Flex>
          <Flex
            width={1}
            justifyContent="center"
            style={{ textAlign: "center" }}
          >
            <Text color="primary">
              {generateMsg(isCreatePage, copied, submissionError) || (
                <span>&nbsp;</span>
              )}
            </Text>
          </Flex>
        </Fragment>
      )}
      {displayQRCode && (
        <QRCodeView text={window.location.href} handleClose={closeQRCode} />
      )}
      {showRecaptcha && (
      <Flex width={1} justifyContent="center" alignItems="center">
        <Box id="recaptchaContainer" />
      </Flex>
      )}
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
  date: PropTypes.string.isRequired,
};

export default AppDisplay;
