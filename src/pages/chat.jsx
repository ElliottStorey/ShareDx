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
  const self = localStorage("self");
  
  const [messages, setMessages] = React.useState([]);

  const peerInit = async () => {
    const conn = self.connect(peerId);
    conn.on("open", function () {
      conn.send(`${self.id} joined the chat.`);
    });
    conn.on("close", function () {
      conn.send(`${self.id} left the chat.`);
    });
    self.on("connection", function (conn) {
      conn.on("data", function (data) {
        const body = {
          id: peerId,
          message: data
        };
        setMessages(...messages, body);
      });
    });
  };
  
  const sendMessage = async () => {
    
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
          <ListItem></ListItem>
        </List>
      </Flex>
      <Flex grow="1" justify="space-between" align="center">
        <Input type="text" marginLeft="5rem"></Input>
        <Button marginRight="5rem">Send</Button>
      </Flex>
    </Flex>
  );
}
