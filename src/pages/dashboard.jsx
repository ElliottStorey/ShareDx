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
  Box,
  SimpleGrid,
  Tag,
} from "@chakra-ui/react";

export default function Dashboard() {
  const [userInfo, setUserInfo] = React.useState();
  const [peers, setPeers] = React.useState([]);
  const [peer, setPeer] = React.useState({});
  const [friendId, setFriendId] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");
  let messageList = [];
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      connection.on("data", function (data) {
        console.log(data);
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
    onOpen();
    setFriendId(value);
  };

  const sendMessage = async () => {
    const connection = peer.connect(friendId);
    connection.send(message);
    //setMessage("");
  };

  const logout = async () => {
    localStorage.clear();
    window.location.href = "/";
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
            <Heading margin="2rem">Your Groups</Heading>
            <List spacing="5rem">
              {userInfo
                ? userInfo.diagnoses.map((value) => (
                    <ListItem>
                      <Text fontSize="lg">{value} (Coming Soon)</Text>
                    </ListItem>
                  ))
                : "..."}
            </List>
          </TabPanel>
          <TabPanel>
            <SimpleGrid columns={1} spacing={125}>
              <Box>
                <Heading size="md">Username</Heading>
                <Text pt="2" fontSize="md">
                  {username}
                </Text>
              </Box>
              <Box>
                <Heading size="md">Diagnoses</Heading>
                <Text pt="2" fontSize="md">
                  {userInfo
                    ? userInfo.diagnoses.map((value) => (
                        <Tag margin="0.5rem">{value}</Tag>
                      ))
                    : "..."}
                </Text>
              </Box>
              <Box>
                <Heading size="md">Description</Heading>
                <Text pt="2" fontSize="md">
                  {userInfo ? userInfo.description : "..."}
                </Text>
              </Box>
              <Box>
                <Heading size="md">Sex</Heading>
                <Text pt="2" fontSize="md">
                  {userInfo ? userInfo.sex : "..."}
                </Text>
              </Box>
              <Box>
                <Button onClick={logout}>Log Out</Button>
              </Box>
            </SimpleGrid>
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
              {messageList.map((value) => (
                <ListItem>
                  <Card>
                    <CardBody>
                      <Heading size="xs" textTransform="uppercase">
                        {value.id}
                      </Heading>
                      <Text pt="2" fontSize="sm">
                        {value.msg}
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
