import React from "react";
import { View, Button, StyleSheet, TextInput } from "react-native";
import DefaultInput from "../../components/UI/DefaultInput";

const placeInput = props => (
    <DefaultInput
        placeholder="Place Name"
        value={props.placeData.value}
        valid={props.placeData.valid}
        touched={props.placeData.touched}
        onChangeText={props.onChangeText}
    />
);

export default placeInput;
