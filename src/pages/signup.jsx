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
} from "@chakra-ui/react";

export default function Signup() {
  const [query, setQuery] = React.useState("");
  const [autocomplete, setAutocomplete] = React.useState([]);
  const [conditions, setConditions] = React.useState([]);
  const [description, setDescription] = React.useState("");
  const [sex, setSex] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const search = async () => {
    let res = await fetch(`https://clinicaltables.nlm.nih.gov/api/conditions/v3/search?terms=${query}`);
    res = await res.json()[3];
    console.log(res);
  };

  return (
    <Flex height="100%" grow="1" align="center" justify="center">
      <Card>
        <CardHeader>
          <Heading>Fomite Signup</Heading>
        </CardHeader>
        <CardBody>
          <Tabs>
            <TabList>
              <Tab>Condition(s)</Tab>
              <Tab>Other Info</Tab>
              <Tab>Account</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Input type="text" onChange={search} />
                <Center>
                  <Button margin="20px">Next</Button>
                </Center>
              </TabPanel>
              <TabPanel>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Input type="text" />
                  <FormLabel>Sex</FormLabel>
                  <Center>
                    <Button margin="20px">Next</Button>
                  </Center>
                </FormControl>
              </TabPanel>
              <TabPanel>
                <FormControl>
                  <FormLabel>Username</FormLabel>
                  <Input type="email" />
                  <FormLabel>Password</FormLabel>
                  <Input type="password" />
                  <FormLabel>Confirm Password</FormLabel>
                  <Input type="password" />
                  <Center>
                    <Button margin="20px">Signup</Button>
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
