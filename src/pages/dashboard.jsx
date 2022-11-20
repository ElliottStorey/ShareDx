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
} from "@chakra-ui/react";

export default function Dashboard() {
  const [peers, setPeers] = React.useState([]);

  React.useEffect(() => {
    userInfo();
    connect();
  }, []);

  const userInfo = async () => {
    const body = {
      username: localStorage.getItem("username"),
      password: localStorage.getItem("password"),
    };
    let res = await fetch(
      "https://Fomite-API.elliottstorey2.repl.co/userinfo",
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(body),
      }
    );
    res = await res.json();
  };

  const connect = async () => {
    const username = localStorage.getItem("username");
    const peer = new Peer(username, {
      host: "https://Fomite-API.elliottstorey2.repl.co/server",
      port: "3000",
      path: "/peerjs",
    });
  };

  return (
    <Tabs h="100%" w="100%" align="center" isFitted>
      <TabList>
        <Tab>Connect</Tab>
        <Tab>Support Groups</Tab>
        <Tab>Account Settings</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Flex grow="1" align="center" justify="center">
            <Button size="lg" onClick={connect}>
              Find People to Connect With!
            </Button>
            <List>
              {peers.map((value) => (
                <ListItem>
                  <Text>{value}</Text>
                </ListItem>
              ))}
              ;
            </List>
          </Flex>
        </TabPanel>
        <TabPanel>
          <Heading>Your Groups</Heading>
          <List></List>
        </TabPanel>
        <TabPanel>
          <p>three!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
