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
  const [userInfo, setUserInfo] = React.useState({});
  const [peer, setPeer] = React.useState({});
  const [peers, setPeers] = React.useState([]);

  React.useEffect(() => {
    getUserInfo();
    peerInit();
  }, []);

  const getUserInfo = async () => {
    const body = {
      username: localStorage.getItem("username"),
      password: localStorage.getItem("password"),
    };
    let res = await fetch(
      "https://ShareDx-API.elliottstorey2.repl.co/userinfo",
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(body),
      }
    );
    res = await res.json();
    setUserInfo(res);
  };

  const peerInit = async () => {
    const username = localStorage.getItem("username");
    const peer = new Peer(username, {
      host: "ShareDx-API.elliottstorey2.repl.co",
      port: 443,
      path: "/",
    });
  };
  
  const connect = async () => {
    let res = fetch('');
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
