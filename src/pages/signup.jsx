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
              <Tab>Account</Tab>
              <Tab>Condition(s)</Tab>
              <Tab>Description</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <p>one!</p>
              </TabPanel>
              <TabPanel>
                <p>two!</p>
              </TabPanel>
              <TabPanel>
                <p>three!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </CardBody>
      </Card>
    </Flex>
  );
}
