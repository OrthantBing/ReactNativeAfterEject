import React, { Component } from "react";
import { View, Text, Button, TextInput, StyleSheet, ImageBackground } from "react-native";
import DefaultInput from "../../components/UI/DefaultInput";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import MainText from "../../components/UI/MainText/MainText";
import ButtonWithBackground from "../../components/UI/ButtonWithBackground/ButtonWithBackground";
import backgroundImage from "../../assets/background.jpg";



import startMainTabs from "../MainTabs/startMainTabs";

class AuthScreen extends Component {
    loginHandler = () => {
        startMainTabs();
    }
    render() {
        return (

            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>

                <View style={styles.container}>
                    {/* <Text style={styles.textHeading}>Please Log In</Text> */}
                    <MainText>
                        <HeadingText>Please Log In</HeadingText>
                    </MainText>
                    {/* <Button title="Switch to Login" style={{ backgroundColor: "transparent" }} /> */}
                    <ButtonWithBackground color="#29aaf4" onPress={() => { alert("pressed") }}>Switch to Login</ButtonWithBackground>
                    <View style={styles.inputContainer} >
                        <DefaultInput placeholder="Your E-Mail Address" style={styles.input} />
                        <DefaultInput placeholder="Password" style={styles.input} />
                        <DefaultInput placeholder="Confirm Password" style={styles.input} />
                    </View>
                    {/* <Button title="SUBMIT" onPress={this.loginHandler} /> */}

                    <ButtonWithBackground color="#29aaf4" onPress={this.loginHandler}> SUBMIT </ButtonWithBackground>

                </View >
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderColor: "red",
        flex: 1,
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center"
    },
    inputContainer: {
        width: "80%"
    },
    textHeading: {
        fontSize: 28,
        fontWeight: "bold",
        color: "black"
    },
    input: {
        backgroundColor: "#eee",
        borderColor: "#bbb"
    },

    backgroundImage: {
        width: "100%",
        flex: 1
    }

})

export default AuthScreen;