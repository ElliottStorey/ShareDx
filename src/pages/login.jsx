import * as React from "react";
import { Link } from "wouter";

import "../styles/styles.css";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Center,
  Flex
} from "@chakra-ui/react";

export default function Login() {
  return (
    <Flex justify='center' align='center'>
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input type="email" />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>
    </Flex>
  );
}
