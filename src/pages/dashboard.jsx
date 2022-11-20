import * as React from "react";
import { Link } from "wouter";

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
  const [connects, setConnects] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [diagnosisGroup, setDiagnosisGroup] = React.useState("");

  React.useEffect(async () => {
    await getUserInfo();
  }, []);
  
  const getMessages = async () => {
    const body = {
      username: username,
      password: password,
      diagnosisGroup: diagnosisGroup
    };
    let res = await fetch(
      "https://ShareDx-API.elliottstorey2.repl.co/getmessages",
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(body),
      }
    );
    res = await res.json();
    setMessages(res);
  };

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

  const connectSearch = async () => {
    const body = {
      username: username,
      password: password,
    };
    let res = await fetch(
      "https://ShareDx-API.elliottstorey2.repl.co/connectSearch",
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(body),
      }
    );
    res = await res.json();
    setConnects(res);
  };

  const connect = async (value) => {
    console.log(value)
    await setDiagnosisGroup(value);
    onOpen();
    const body = {
      username: username,
      password: password,
      diagnosisGroup: value,
      message: `${username} Joined The Group`,
    };
    let res = await fetch(
      "https://ShareDx-API.elliottstorey2.repl.co/sendMessage",
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(body),
      }
    );
    res = await res.json();
    await setMessages(res);
  };

  const sendMessage = async () => {
    const body = {
      username: username,
      password: password,
      diagnosisGroup: diagnosisGroup,
      message: message,
    };
    let res = await fetch(
      "https://ShareDx-API.elliottstorey2.repl.co/sendMessage",
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(body),
      }
    );
    res = await res.json();
    setMessages(res);
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
              <Button size="lg" marginTop="10rem" onClick={connectSearch}>
                Search For a Shared Experience!
              </Button>
              <List>
                {connects.map((value) => (
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
                      <Text fontSize="lg">
                        {value}
                        <Button
                          marginLeft="2rem"
                          onClick={() => connect(value)}
                        >
                          Connect
                        </Button>
                      </Text>
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
          <ModalHeader>Support Group for {diagnosisGroup}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <List spacing="0.5rem">
              {messages.map((value) => (
                <ListItem>
                  <Card>
                    <CardBody>
                      <Heading size="xs">{value.id}</Heading>
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
