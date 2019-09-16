import React from "react";
import { StyleSheet, Text, View } from "react-native";
import RSP from "./src/RSP";

export default function App() {
  return <RSP />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
