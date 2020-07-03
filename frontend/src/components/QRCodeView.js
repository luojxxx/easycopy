import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Box, Flex, Text, Button } from "rebass";
import { FiXSquare, FiSquare } from "react-icons/fi";
import QRCode from "qrcode";

import theme from "../theme";

const QRCodeViewContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const QRCodeView = ({ text, handleClose }) => {
  const [qrCode, setQrCode] = useState("");
  useEffect(() => {
    const canvasElement = document.getElementById("QRCanvas");
    QRCode.toDataURL(
      canvasElement,
      text,
      {
        errorCorrectionLevel: "H",
        color: { light: "red", dark: "#ffffff" },
        scale: 10,
      },
      function (err, url) {
        setQrCode(url);
        console.log(url);
      }
    );
  });
  return (
    <QRCodeViewContainer>
      <Flex
        width={1}
        style={{ flex: "1 1 auto", border: "0px solid white" }}
        justifyContent="center"
        alignItems="center"
      >
        <canvas id="QRCanvas"></canvas>
      </Flex>
      <Button
        variant="primary"
        width={0.5}
        mb={1}
        onClick={handleClose}
        style={{ cursor: "pointer" }}
      >
        <Text pr={2}>Close</Text>
      </Button>
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
