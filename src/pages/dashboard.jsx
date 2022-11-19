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
  Text
} from "@chakra-ui/react";

export default function Dashboard() {
  
  const [peers, setPeers] = React.useState([]);
  
  return (
    <Tabs h="100%" w="100%" align="center" isFitted>
      <TabList>
        <Tab>Connect</Tab>
        <Tab>Support Groups</Tab>
        <Tab>Account Settings</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Flex grow='1' align='center' justify='center'>
            <Button size="lg">Connect!</Button>
            <List>
              {peers.map((value) => (
                <ListItem>
                  <Text></Text>
                </ListItem>
              ))};
            </List>
          </Flex>
        </TabPanel>
        <TabPanel>
          <Heading>Your Groups</Heading>
          <List>
            
          </List>
        </TabPanel>
        <TabPanel>
          <p>three!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
