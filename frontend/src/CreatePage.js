import React from "react";
import { Box, Flex, Heading, Button } from "rebass";
import { Label, Input, Textarea } from "@rebass/forms";

const CreatePage = ({
  handleUserChange,
  handleContentChange,
  handleSubmit,
  user,
  content
}) => (
  <React.Fragment>
    <Heading color="primary">EasyCopy</Heading>
    <Box width={0.5} py={3}>
      <Label htmlFor="user">User</Label>
      <Input
        id="user"
        name="user"
        type="text"
        placeholder="johnDoe"
        onChange={handleUserChange}
        value={user}
      />
    </Box>
    <Box width={0.5} py={3}>
      <Label htmlFor="content">Content</Label>
      <Textarea
        id="content"
        name="content"
        type="text"
        onChange={handleContentChange}
        value={content}
      />
    </Box>
    <Button onClick={handleSubmit}>Submit</Button>
  </React.Fragment>
);

export default CreatePage;
