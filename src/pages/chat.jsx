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

const peerInit = async () => {
  const self = localStorage("self");
  const peerId = localStorage.getItem("peer");
  const conn = self.connect(peerId);
  conn.on("open", function () {
    conn.send(`${self.id} joined the chat.`);
  });
  self.on("connection", function (conn) {
    conn.on("data", function (data) {
      console.log(data);
    });
  });
};

export default function Chat() {
  const peerId = localStorage.getItem("peer");

  return (
    <Flex grow="1" direction="column">
      <Flex grow="1" justify="space-around" align="center">
        <Button>Thank 🎉</Button>
        <Heading>Private Chat With {peerId}</Heading>
        <Button>Leave</Button>
      </Flex>
      <Flex grow="5"></Flex>
      <Flex grow="1" justify="space-between" align="center">
        <Input type="text" marginHorizontal ="5rem"></Input>
        <Button marginHorizontal ="5rem">Send</Button>
      </Flex>
    </Flex>
  );
}
