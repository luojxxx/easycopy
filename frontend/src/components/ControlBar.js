import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Box, Flex, Heading, Text } from "rebass";
import { FiCornerUpLeft, FiCopy } from "react-icons/fi";
import { FaQrcode } from "react-icons/fa";

import Input from "../components/Input";
import Button from "../components/Button";
import StarIcon from "../components/StarIcon";
import Loader from "../components/Loader";

const clip = require("clipboardy");

const getTruncatedUrl = (url) => {
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
  return `${path.substring(substringIdx)}/${url}`;
};

const ControlBar = ({
  isCreatePage,
  handleSubmit,
  submissionProcessing,
  notFoundPage,
  url,
  handleBack,
  setCopied,
  showRecaptcha,
  showQRCode,
}) => {
  const handleSelect = () => {
    document.getElementById("pathField").select();
  };
  const handleClickBack = () => {
    setCopied(false);
    handleBack();
  };
  const copyPathToClipboard = () => {
    const truncatedUrl = getTruncatedUrl(window.location.href);
    clip.write(truncatedUrl);
    document.getElementById("pathField").focus();
    setCopied(true);
  };
  return (
    <Flex
      width={1}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      {isCreatePage && !submissionProcessing && (
        <Button variant="primary" width={1} mb={1} onClick={handleSubmit}>
          <Flex flexDirection="row" justifyContent="center" alignItems="center">
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
              value={getTruncatedUrl(url)}
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
            <Button variant="primary" width={1} mb={1} onClick={showQRCode}>
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
  );
};

ControlBar.propTypes = {
  isCreatePage: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submissionProcessing: PropTypes.bool.isRequired,
  notFoundPage: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  handleBack: PropTypes.func.isRequired,
  setCopied: PropTypes.func.isRequired,
  showQRCode: PropTypes.func.isRequired,
  showRecaptcha: PropTypes.bool.isRequired,
};

export default ControlBar;
