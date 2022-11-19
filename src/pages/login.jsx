import * as React from "react";
import { Link } from "wouter";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Center
} from "@chakra-ui/react";

export default function Login() {
  return (
    <Center h='100' >
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input type="email" />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>
    </Center>
  );
}
