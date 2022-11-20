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
  Input
} from "@chakra-ui/react";

const peerInit = async () => {

};

export default function Chat() {
  return (
    <Flex grow="1" direction="column">
      <Flex grow="1" justify="center" align="center">
        <Heading>Chat With cheetahgirl</Heading>
      </Flex>
      <Flex grow="5"></Flex>
      <Flex grow="1"  justify="space-around" align="center">
        <Input type="text"></Input>
        <Button>Send</Button>
      </Flex>
    </Flex>
  );
}