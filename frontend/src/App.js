import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { Box, Flex } from "rebass";

import AppDisplay from "./AppDisplay";
import constants from "./constants";
const { api, contentLimit } = constants;

const App = props => {
  const { history, location } = props;
  const { pathname } = location;
  const [user, setUser] = useState("");
  const [content, setContent] = useState("");
  const [zeroContentFlag, setZeroContentFlag] = useState(false);
  const [notFoundPage, setNotFoundPage] = useState(false);
  const handleUserChange = e => {
    setUser(e.target.value);
  };
  const handleContentChange = e => {
    const content = e.target.value.slice(0, contentLimit);
    setContent(content);
  };
  const handleClear = () => {
    setUser("");
    setContent("");
  };
  const handleBack = () => {
    // setUser("");
    // setContent("");
    setZeroContentFlag(false);
    history.push("/");
  };
  const handleSubmit = async () => {
    try {
      if (content.length === 0) {
        return setZeroContentFlag(true);
      }
      const response = await axios({
        method: "post",
        url: api,
        data: {
          user: user,
          content: content
        }
      });
      const url = response.data.url;
      history.push(url);
    } catch (err) {
      console.error("CreateUrl error");
      console.error(err);
    }
  };
  const handleGet = async () => {
    try {
      const response = await axios({
        method: "get",
        url: api + pathname
      });
      setNotFoundPage(false);
      setUser(response.data.user);
      setContent(response.data.content);
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
      notFoundPage={notFoundPage}
      handleUserChange={handleUserChange}
      handleContentChange={handleContentChange}
      handleClear={handleClear}
      handleBack={handleBack}
      handleSubmit={handleSubmit}
      user={user}
      content={content}
    />
  );
};

export default withRouter(App);
