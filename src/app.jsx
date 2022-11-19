import React, { useState, useEffect } from "react";
import { Router, Link } from "wouter";
import { ChakraProvider } from "@chakra-ui/react";

import PageRouter from "./components/router.jsx";

export default function App() {
  return (
    <Router>
      <ChakraProvider>
        <PageRouter />
      </ChakraProvider>
    </Router>
  );
}
