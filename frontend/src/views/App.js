import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";

import AppDisplay from "./AppDisplay";
import { sleep } from "../lib";
import {
  api,
  userNameLimit,
  contentLimit,
  acceptedTypes,
  recaptchaSiteKeyV3,
  recaptchaSiteKeyV2,
} from "../constants";
import { AccountContextConsumer } from "../providers/AccountProvider";

const App = ({ accountContext }) => {
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;
  const [url, setUrl] = useState("");
  const [userName, setUserName] = useState(accountContext.userName || "");
  const [content, setContent] = useState("");
  const [type, setType] = useState("text");
  const [date, setDate] = useState("");
  const [zeroContentFlag, setZeroContentFlag] = useState(false);
  const [submissionProcessing, setSubmissionProcessing] = useState(false);
  const [submissionError, setSubmissionError] = useState(false);
  const [notFoundPage, setNotFoundPage] = useState(false);
  const [showRecaptcha, setShowRecaptcha] = useState(false);
  let threshold = 0.5;

  const handleUserNameChange = (e) => {
    const userName = e.target.value.slice(0, userNameLimit);
    setUserName(userName);
  };

  const handleContentChange = (e) => {
    const content = e.target.value.slice(0, contentLimit);
    setContent(content);
  };

  const handleTypeChange = (rawType) => {
    const type = acceptedTypes.includes(rawType) ? rawType : "text";
    setType(type);
  };

  const handleClear = () => {
    setUserName("");
    setContent("");
  };

  const handleBack = () => {
    setZeroContentFlag(false);
    history.push("/");
  };

  const handleSubmit = async () => {
    try {
      setNotFoundPage(false);
      if (content.length === 0) {
        return setZeroContentFlag(true);
      }
      setSubmissionProcessing(true);
      setSubmissionError(false);
      setShowRecaptcha(false);

      window.grecaptcha.ready(async function () {
        const token = await window.grecaptcha.execute(recaptchaSiteKeyV3, {
          action: "submit",
        });
        const recaptchaResult = await axios({
          method: "post",
          url: api + "/verifyRecaptcha",
          data: {
            token: token,
          },
        });
        const score = recaptchaResult.data.data.score;
        const recaptchaToken = recaptchaResult.data.recaptchaToken;

        if (score >= threshold) {
          setShowRecaptcha(false);
          const userToken = localStorage.getItem("userToken");
          const response = await axios({
            method: "post",
            url: api + "/create",
            data: {
              recaptchaToken: recaptchaToken,
              userName: userName.toString(10),
              content: content.toString(10),
              type: type.toString(10),
            },
            headers: {
              ...(userToken ? { Authorization: `Bearer ${userToken}` } : {}),
            },
          });
          setSubmissionProcessing(false);
          const url = response.data.url;
          history.push(url);
          threshold = 0.5;
        } else {
          threshold = 0;
          setShowRecaptcha(true);
          const recaptchaContainer = document.getElementById(
            "recaptchaContainer"
          );
          const id = window.grecaptcha.render(recaptchaContainer, {
            sitekey: recaptchaSiteKeyV2,
            callback: handleSubmit,
          });
        }
      });
    } catch (err) {
      console.error("CreateUrl error");
      console.error(err);
      setSubmissionProcessing(false);
      setSubmissionError(true);
      setShowRecaptcha(false);
    }
  };

  const handleGet = async () => {
    try {
      const response = await axios({
        method: "get",
        url: api + pathname,
      });
      setNotFoundPage(false);
      setUrl(response.data.url);
      setUserName(response.data.userName);
      setContent(response.data.content);
      setType(response.data.type);
      setDate(response.data.createdAt);
    } catch (err) {
      if (err.response.status === 404) {
        setNotFoundPage(true);
      } else {
        console.error("GetUrl error");
        console.error(err);
      }
    }
  };

  useEffect(() => {
    if (pathname !== "/") {
      handleGet();
    }
  }, [pathname]);

  return (
    <AppDisplay
      pathname={pathname}
      zeroContentFlag={zeroContentFlag}
      submissionProcessing={submissionProcessing}
      submissionError={submissionError}
      notFoundPage={notFoundPage}
      showRecaptcha={showRecaptcha}
      handleUserNameChange={handleUserNameChange}
      handleContentChange={handleContentChange}
      handleTypeChange={handleTypeChange}
      handleBack={handleBack}
      handleSubmit={handleSubmit}
      url={url}
      userName={userName}
      content={content}
      type={type}
      date={date}
    />
  );
};

const WrappedApp = () => (
  <AccountContextConsumer>
    {(accountContext) => <App accountContext={accountContext} />}
  </AccountContextConsumer>
);

export default WrappedApp;
