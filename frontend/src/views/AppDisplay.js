import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { Box, Flex } from "rebass";

import Template from "../components/Template";
import DateField from "../components/DateField";
import UserField from "../components/UserField";
import ContentField from "../components/ContentField";
import ControlBar from "../components/ControlBar";
import MessageField from "../components/MessageField";
import QRCodeView from "../components/QRCodeView";

import { dateFormat } from '../constants'

const AppDisplay = ({
  pathname,
  zeroContentFlag,
  submissionProcessing,
  submissionError,
  notFoundPage,
  showRecaptcha,
  handleUserNameChange,
  handleContentChange,
  handleTypeChange,
  handleBack,
  handleSubmit,
  url,
  userName,
  content,
  type,
  date,
}) => {
  const [copied, setCopied] = useState(false);
  const [displayQRCode, setDisplayQRCode] = useState(false);

  const showQRCode = () => {
    setDisplayQRCode(true);
  };

  const closeQRCode = () => {
    setDisplayQRCode(false);
  };
  
  const isCreatePage = pathname === "/";
  const dateDisplay = date === "" ? "" : dayjs(date).format(dateFormat);
  return (
    <Template subheading="Online clipboard with human readable sharelinks and camera scannable QR codes">
      {!displayQRCode && (
        <Fragment>
          <DateField
            dateFormat={dateFormat}
            dateDisplay={dateDisplay}
            isCreatePage={isCreatePage}
          />
          <UserField
            userName={userName}
            handleUserNameChange={handleUserNameChange}
            isCreatePage={isCreatePage}
          />
          <ContentField
            content={content}
            handleContentChange={handleContentChange}
            type={type}
            handleTypeChange={handleTypeChange}
            zeroContentFlag={zeroContentFlag}
            isCreatePage={isCreatePage}
          />
          <ControlBar
            isCreatePage={isCreatePage}
            handleSubmit={handleSubmit}
            submissionProcessing={submissionProcessing}
            notFoundPage={notFoundPage}
            url={url}
            handleBack={handleBack}
            setCopied={setCopied}
            showRecaptcha={showRecaptcha}
            showQRCode={showQRCode}
          />
          <MessageField
            isCreatePage={isCreatePage}
            copied={copied}
            submissionError={submissionError}
          />
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
  handleUserNameChange: PropTypes.func.isRequired,
  handleContentChange: PropTypes.func.isRequired,
  handleTypeChange: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default AppDisplay;
