import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Box, Flex, Text } from "rebass";
import { Label } from "@rebass/forms";

import constants from "./../constants";
import Selector from './Selector'
import Textarea from "./Textarea";

import TextView from './TextView'
import UrlView from './UrlView'

const UserField = ({
  content,
  handleContentChange,
  type,
  handleTypeChange,
  pasteContentToClipboard,
  copyContentToClipboard,
  isCreatePage,
  zeroContentFlag,
}) => {
  return (
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
              isCreatePage ? pasteContentToClipboard : copyContentToClipboard
            }
            style={{ cursor: "pointer" }}
          >
            <Text color="primary">{isCreatePage ? "[paste]" : "[copy]"}</Text>
          </Box>
        </Flex>
        <span>
          <Text color="primary">{`${constants.contentLimit - content.length}`}</Text>
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
  );
};

UserField.propTypes = {
  content: PropTypes.string.isRequired,
  handleContentChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  handleTypeChange: PropTypes.func.isRequired,
  pasteContentToClipboard: PropTypes.func.isRequired,
  copyContentToClipboard: PropTypes.func.isRequired,
  isCreatePage: PropTypes.bool.isRequired,
  zeroContentFlag: PropTypes.bool.isRequired,
};

export default UserField;
