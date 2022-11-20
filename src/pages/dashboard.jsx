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
  Divider,
  ModalCloseButton,
  Input,
  CardHeader,
  Card,
  CardBody,
} from "@chakra-ui/react";

export default function Dashboard() {
  const [userInfo, setUserInfo] = React.useState();
  const [peers, setPeers] = React.useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");

  const [peer, setPeer] = React.useState();
  const [friendId, setFriendId] = React.useState();
  const [messages, setMessages] = React.useState([]);
  const [message, setMessage] = React.useState();

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
    peer.on("open", (id) => {
      setPeer(peer);
    });
    peer.on("connection", (connection) => {
      connection.on("data", (data) => {
        setMessages([...messages, data]);
        connect(connection.peer);
      });
    });
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
    setFriendId(value);
    onOpen();
  };

  const sendMessage = async () => {
    const connection = peer.connect(friendId);
    connection.on("open", () => {
      const msgObj = {
        sender: peer.id,
        message: message,
      };
      connection.send(msgObj);
      setMessages([...messages, msgObj]);
      setMessage("");
    });
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
            <List spacing="0.5rem">
                <ListItem>
                  <Card>
                    <CardBody>
                      <Heading size="xs" textTransform="uppercase">
                        Username
                      </Heading>
                      <Text pt="2" fontSize="sm">
                        {username}
                      </Text>
                    </CardBody>
                  </Card>
                </ListItem>
              <ListItem>
                  <Card>
                    <CardBody>
                      <Heading size="xs" textTransform="uppercase">
                        Diagnoses
                      </Heading>
                      <Text pt="2" fontSize="sm">
                        {userInfo.diagnoses.map((value) => (
                          {value}
                        ))}
                      </Text>
                    </CardBody>
                  </Card>
                </ListItem>
            </List>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Private Chat with {friendId}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {messages.toString()}
            <List spacing="0.5rem">
              {messages.map((value) => (
                <ListItem>
                  <Card>
                    <CardBody>
                      <Heading size="xs" textTransform="uppercase">
                        {value.sender}
                      </Heading>
                      <Text pt="2" fontSize="sm">
                        {value.message}
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
