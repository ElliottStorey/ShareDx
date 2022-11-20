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
  const peerId = localStorage.getItem("peer");
  const self = localStorage.getItem("self");

  const [messages, setMessages] = React.useState([]);
  const [message, setMessage] = React.useState([]);

  const peerInit = async () => {
    const conn = self.connect(peerId);
    conn.on("open", function () {
      conn.on("data", function (data) {
        const body = {
          id: peerId,
          message: data,
        };
        setMessages(...messages, body);
      });
      conn.send(`${self.id} joined the chat.`);
    });
    conn.on("close", function () {
      conn.send(`${self.id} left the chat.`);
      const body = {
      id: peerId,
      message: `${peerId} left the chat.`,
    };
    setMessages(...messages, body);
    });
  };

  const sendMessage = async () => {
    const body = {
      id: "Me",
      message: message,
    };
    setMessages(...messages, body);
  };

  return (
    <Flex grow="1" direction="column">
      <Flex grow="1" justify="space-around" align="center">
        <Button>Thank 🎉</Button>
        <Heading>Private Chat With {peerId}</Heading>
        <Button>Leave</Button>
      </Flex>
      <Flex grow="10">
        <List>
          {messages.map((value) => (
            <ListItem><Text>{value.id} | {value.message}</Text></ListItem>
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
        <Button marginRight="5rem" onClick={sendMessage}>
          Send
        </Button>
      </Flex>
    </Flex>
  );
}
