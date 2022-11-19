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
                
              </TabPanel>
              <TabPanel>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Input type="description" />
                  <FormLabel>Password</FormLabel>
                  <Input type="password" />
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
        </CardBody>
      </Card>
    </Flex>
  );
}
