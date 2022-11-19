import * as React from "react";
import { Link } from "wouter";

import "../styles/styles.css";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Button,
} from "@chakra-ui/react";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Center,
  Flex,
} from '@chakra-ui/react';

export default function Login() {
  return (
    <Flex height='100%' grow='1' direction='row' align='center' justify='center'>
      <Card>
        <CardHeader>
          <Heading>Fomite Login</Heading>
        </CardHeader>
        <CardBody>
          <FormControl>
            
            <FormLabel>Username</FormLabel>
            <Input type='email' />
            <FormLabel>Password</FormLabel>
            <Input type='password' />
            <Center>
              <Button margin='20px' >Login</Button>
            </Center>
          </FormControl>
        </CardBody>
      </Card>
    </Flex>
  );
}
