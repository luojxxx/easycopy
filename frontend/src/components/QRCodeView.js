import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Box, Flex, Text } from "rebass";
import { FiXSquare, FiSquare } from "react-icons/fi";
import QRCode from "qrcode";

import theme from "../theme";

const QRCodeViewContainer = styled(Box)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
`;

const QRCodeView = ({ text, handleClose }) => {
  const [qrCode, setQrCode] = useState('');
  useEffect(() => {
    QRCode.toDataURL(text, { errorCorrectionLevel: "H" }, function (err, url) {
      setQrCode(url);
      console.log(url);
    });
  })
  return (
    <QRCodeViewContainer>
      <Flex width={1} p={3} justifyContent="flex-end">
        <FiXSquare
          onClick={handleClose}
          size={48}
          style={{
            cursor: "pointer",
            color: theme.colors.primary,
          }}
          title="Go back"
        />
      </Flex>
      <Flex width={1} style={{ flex: "1 1 auto", border: "0px solid white" }} justifyContent="center" alignItems="center">
        <img src={qrCode} style={{ width: '75%', height: '75%',  zIndex: 5 }} />
      </Flex>
    </QRCodeViewContainer>
  );
};

QRCodeView.propTypes = {
  text: PropTypes.string,
  handleClose: PropTypes.func,
};
QRCodeView.defaultProps = {
  text: "",
};

export default QRCodeView;
