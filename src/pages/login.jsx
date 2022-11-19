import * as React from "react";
import { Link } from "wouter";

import "../styles/styles.css";

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

export default function Login() {
  return (
    <Flex
      height="100%"
      grow="1"
      direction="row"
      align="center"
      justify="center"
    >
      <Card>
        <CardHeader>
          <Heading>Fomite Login</Heading>
        </CardHeader>
        <CardBody>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input type="email" />
            <FormLabel>Password</FormLabel>
            <Input type="password" />
            <Center>
              <Button margin="20px">Login</Button>
            </Center>
          </FormControl>
          <Center>
            <Link href="/signup">
              <a>Or Sign Up</a>
            </Link>
          </Center>
        </CardBody>
      </Card>
    </Flex>
  );
}
