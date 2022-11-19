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
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const login = async () => {
    console.log(username, password);
    let res = await fetch();
  };

  return (
    <Flex height="100%" grow="1" align="center" justify="center">
      <Card>
        <CardHeader>
          <Heading>Fomite Login</Heading>
        </CardHeader>
        <CardBody>
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
            <Center>
              <Button margin="20px" onClick={login}>
                Login
              </Button>
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
