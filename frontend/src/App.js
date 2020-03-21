import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { Box, Flex } from "rebass";

import CreatePage from "./CreatePage";
import GetPage from "./GetPage";
import NotFoundPage from "./NotFoundPage";
import theme from "./theme";
import constants from "./constants";
const { api, contentLimit } = constants;

const App = props => {
  console.log(props);
  const { history, location } = props;
  const { pathname } = location;
  const [user, setUser] = useState("");
  const [content, setContent] = useState("");
  const [notFoundPage, setNotFoundPage] = useState(false);
  const handleUserChange = e => {
    setUser(e.target.value);
  };
  const handleContentChange = e => {
    const content = e.target.value.slice(0, contentLimit);
    setContent(content);
  };
  const handleSubmit = async () => {
    try {
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
  }, []);
  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      style={{
        width: "100vw",
        height: "100vh",
        background: theme.colors.background
      }}
    >
      {pathname === "/" && !notFoundPage && (
        <CreatePage
          handleUserChange={handleUserChange}
          handleContentChange={handleContentChange}
          handleSubmit={handleSubmit}
          user={user}
          content={content}
        />
      )}
      {pathname !== "/" && !notFoundPage && (
        <GetPage user={user} content={content} pathname={pathname} />
      )}
      {pathname !== "/" && notFoundPage && (
        <NotFoundPage />
      )}
    </Flex>
  );
};

export default withRouter(App);
