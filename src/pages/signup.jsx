import * as React from "react";
import { Link } from "wouter";
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
        </CardBody>
        <CardFooter>
          <Link href="/signup">
            <a className="link">My Account</a>
          </Link>
        </CardFooter>
      </Card>
    </Flex>
  );
}
