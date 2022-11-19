import * as React from "react";
import { Link } from "wouter";

import "../styles/styles.css";

import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

import {
  Flex,
  Center,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Button,
  List,
  Text,
  ListItem,
  Tag,
  TagLabel,
  TagCloseButton,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";

export default function Signup() {
  const [tabIndex, setTabIndex] = React.useState(0);
  const [query, setQuery] = React.useState("");
  const [autocomplete, setAutocomplete] = React.useState([]);
  const [conditions, setConditions] = React.useState([]);
  const [description, setDescription] = React.useState("");
  const [sex, setSex] = React.useState("Male");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const addCondition = async (value) => {
    setConditions([...conditions, value[0]]);
  };

  const removeCondition = async (value) => {
    setConditions([...conditions].filter((e) => e !== value));
  };

  const search = async (event) => {
    //fix the fetch happening before query
    setQuery(event.target.value);
    let res = await fetch(
      `https://clinicaltables.nlm.nih.gov/api/conditions/v3/search?terms=${query}`
    );
    res = await res.json();
    setAutocomplete(res[3]);
  };

  const signup = async () => {
    //add form control
    console.log(username, password, conditions, description, sex);
    let body = {
      username: "elliotts",
      password: "pass",
      conditions: conditions,
      description: description,
      sex: sex,
    };
    let res = await fetch("https://Fomite-API.elliottstorey2.repl.co/signup", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(body),
    });
    if (await res.ok) {
      window.location.href = '/login';
    } else {
      //add error toast
    }
  };

  return (
    <Flex grow="1" align="center" justify="center">
      <Card>
        <CardHeader>
          {description}
          <Heading>RealTalk Signup</Heading>
        </CardHeader>
        <CardBody>
          <Tabs index={tabIndex} onChange={setTabIndex}>
            <TabList>
              <Tab>Condition(s)</Tab>
              <Tab>Other Info</Tab>
              <Tab>Account</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Input type="text" onChange={search} />
                <List>
                  {autocomplete.map((value, i) => (
                    <ListItem key={i}>
                      <Flex justify="space-between" margin="10px">
                        <Text>{value}</Text>
                        <Button
                          variant="outline"
                          size="xs"
                          onClick={() => addCondition(value)}
                        >
                          I Have This
                        </Button>
                      </Flex>
                    </ListItem>
                  ))}
                </List>
                <Flex wrap="wrap" w="35rem">
                  {conditions.map((value) => (
                    <Tag marginRight="5px" marginBottom="5px">
                      <TagLabel>{value}</TagLabel>
                      <TagCloseButton onClick={() => removeCondition(value)} />
                    </Tag>
                  ))}
                </Flex>
                <Center>
                  <Button margin="20px" onClick={() => setTabIndex(1)}>
                    Next
                  </Button>
                </Center>
              </TabPanel>
              <TabPanel>
                <FormLabel>Description</FormLabel>
                <Input
                  type="text"
                  value={description}
                  onChange={() => setDescription(event.target.value)}
                />
                <FormLabel>Sex</FormLabel>
                <RadioGroup value={sex} onChange={setSex}>
                  <Flex direction="column">
                    <Radio value="Male">Male</Radio>
                    <Radio value="Female">Female</Radio>
                    <Radio value="Other">Other</Radio>
                  </Flex>
                </RadioGroup>
                <Center>
                  <Button margin="20px" onClick={() => setTabIndex(2)}>
                    Next
                  </Button>
                </Center>
              </TabPanel>
              <TabPanel>
                <FormControl>
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="email"
                    value={username}
                    onChange={() => setUsername(event.target.value)}
                  />
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    value={password}
                    onChange={() => setPassword(event.target.value)}
                  />
                  <FormLabel>Confirm Password</FormLabel>
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={() => setConfirmPassword(event.target.value)}
                  />
                  <Center>
                    <Button margin="20px" onClick={signup}>
                      Signup
                    </Button>
                  </Center>
                </FormControl>
              </TabPanel>
            </TabPanels>
          </Tabs>
          <Center>
            <Link href="/">
              <a>Back To Log In</a>
            </Link>
          </Center>
        </CardBody>
      </Card>
    </Flex>
  );
}
