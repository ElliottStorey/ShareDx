import * as React from "react";
import { Link } from "wouter";
import Peer from "peerjs";

import "../styles/styles.css";

import {
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  Flex,
  List,
  ListItem,
  Text,
  Input,
} from "@chakra-ui/react";

export default function Chat() {
  const connection = JSON.parse(localStorage.getItem("connection"));

  const [messages, setMessages] = React.useState([]);
  const [message, setMessage] = React.useState([]);

  return (
    <Flex grow="1" direction="column">
      <Flex grow="1" justify="space-around" align="center">
        <Button>Thank 🎉</Button>
        <Heading>Private Chat With {connection.id}</Heading>
        <Button>Leave</Button>
      </Flex>
      <Flex grow="10">
        <List>
          {messages.map((value) => (
            <ListItem>
              <Text>
                {value.id} | {value.message}
              </Text>
            </ListItem>
          ))}
        </List>
      </Flex>
      <Flex grow="1" justify="center" align="center">
        <Input
          type="text"
          marginLeft="5rem"
          value={message}
          onChange={() => setMessage(event.target.value)}
        ></Input>
        <Button marginRight="5rem" onClick={console.log()}>
          Send
        </Button>
      </Flex>
    </Flex>
  );
}
