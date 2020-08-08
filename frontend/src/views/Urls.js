import React, { useState, useEffect } from "react";
import { Flex, Box, Heading, Text } from "rebass";
import { Label } from "@rebass/forms";
import axios from "axios";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { FiX } from "react-icons/fi";

import { api } from "../constants";
import Template from "../components/Template";
import Input from "../components/Input";
import Button from "../components/Button";

import { dateFormat } from "../constants";

const Urls = () => {
  const [urls, setUrls] = useState([]);
  const [page, setPage] = useState(0);
  useEffect(() => {
    try {
      const result = axios({
        method: "post",
        url: api + "/getuserurls",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        data: {},
      }).then((result) => {
        setUrls(result.data);
      });
    } catch (err) {
      console.log(err);
    }
  }, [page]);
  const handleDelete = async (urlId) => {
    try {
      await axios({
        method: "post",
        url: api + "/deleteuserurl",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        data: {
          urlId: urlId,
        },
      });
      setUrls(urls.filter((ele) => ele.urlId !== urlId));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Template>
      <Flex flexDirection="column" alignItems="center" width={1}>
        <Heading color="primary" pb={3}>
          Urls
        </Heading>
        <Flex flexDirection="column">
          {urls.length === 0 && (
            <Heading color="primary" fontSize={3}>
              [New links you create will show up here]
            </Heading>
          )}
          {urls.map((ele) => (
            <Flex
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              width={1}
            >
              <Link to={ele.url}>
                <Flex flexDirection="row" alignItems="center" width={1}>
                  <Text color="primary">
                    {dayjs(ele.createdAt).format(dateFormat)}
                  </Text>
                  &nbsp;
                  <Text color="primary">{ele.url} </Text>&nbsp;
                  <Text color="primary">{ele.content} </Text>
                </Flex>
              </Link>
              <Text color="primary">
                <FiX
                  size={24}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDelete(ele.urlId)}
                />
              </Text>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Template>
  );
};

export default Urls;
