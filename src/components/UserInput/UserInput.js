import React, { Component } from "react";
import { View, Button, StyleSheet, TextInput } from "react-native";

class UserInput extends Component {
  state = {
    placeName: ""
  };

  placeNameChanged = val => {
    this.setState({ placeName: val });
  };

  placeSubmitHandler = () => {
    if (this.state.placeName.trim() === "") {
      return;
    }
    this.props.placeChangeAdd(this.state.placeName);
    this.setState({ placeName: "" });
    return;
  };

  render() {
    return (
      <View style={styles.inputContainer}>
        <TextInput
          value={this.state.placeName}
          onChangeText={this.placeNameChanged}
          placeholder="An awesome place testing"
          style={styles.placeInput}
        />
        <Button
          title="Add"
          onPress={this.placeSubmitHandler}
          style={styles.placeButton}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  placeInput: {
    width: "70%"
  },
  placeButton: {
    width: "30%"
  }
});

export default UserInput;
