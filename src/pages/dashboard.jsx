import * as React from "react";
import { Link } from "wouter";
import Peer from "peerjs";
import { parse, stringify } from "flatted";

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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Card,
  CardBody,
} from "@chakra-ui/react";

export default function Dashboard() {
  const [userInfo, setUserInfo] = React.useState({});
  const [peers, setPeers] = React.useState([]);
  const [peer, setPeer] = React.useState({});
  const [connection, setConnection] = React.useState({});
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");
  let messages2 = ["message", "anotherone"];

  React.useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    const body = {
      username: username,
      password: password,
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

  const peerSearch = async () => {
    const peer = new Peer(username, {
      host: "ShareDx-API.elliottstorey2.repl.co",
      port: 443,
      path: "/",
    });
    peer.on("connection", function (connection) {
      connection.on("open", function (data) {
        connection.send(`${peer.id} Joined The Chat.`);
        setConnection(connection);
        onOpen();
        connection.on("data", function (data) {
          console.log(data)
          messages2.push(data);
        });
      });
    });
    setPeer(peer);
    const body = {
      username: username,
      password: password,
    };
    let res = await fetch(
      "https://ShareDx-API.elliottstorey2.repl.co/peerSearch",
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(body),
      }
    );
    res = await res.json();
    setPeers(res);
  };

  const connect = async (value) => {
    const connection = peer.connect(value);
    connection.on("open", function (data) {
      connection.send(`${peer.id} Joined The Chat.`);
      setConnection(connection);
      onOpen();
      connection.on("data", function (data) {
        console.log(data)
        messages2.push(data);
      });
    });
  };

  const sendMessage = async () => {
    console.log(message)
    messages2.push(message);
    connection.send(message);
  };

  return (
    <>
      <Tabs h="100%" w="100%" align="center" isFitted>
        <TabList>
          <Tab>Connect</Tab>
          <Tab>Support Groups</Tab>
          <Tab>Account Settings</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Flex direction="column" grow="1" align="center" justify="center">
              <Button size="lg" marginTop="10rem" onClick={peerSearch}>
                Search For a Shared Experience!
              </Button>
              <List>
                {peers.map((value) => (
                  <ListItem margin="5rem">
                    <Text fontSize="2xl">
                      {value}
                      <Button marginLeft="2rem" onClick={() => connect(value)}>
                        Connect
                      </Button>
                    </Text>
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
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Private Chat with {connection.peer}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {messages2}
            <List spacing="0.5rem">
              {messages2.map((value) => (
                <ListItem>
                  <Card>
                    <CardBody>
                      <Heading size="xs" textTransform="uppercase">
                        {value}
                      </Heading>
                      <Text pt="2" fontSize="sm">
                        {value}
                      </Text>
                    </CardBody>
                  </Card>
                </ListItem>
              ))}
            </List>
          </ModalBody>
          <ModalFooter>
            <Input
              type="text"
              value={message}
              onChange={() => setMessage(event.target.value)}
            ></Input>
            <Button onClick={sendMessage}>Send</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
