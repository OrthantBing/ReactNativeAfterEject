import React, { Component } from "react";
import { connect } from "react-redux";
import {
    View, Text, Button,
    TextInput,
    StyleSheet,
    ImageBackground,
    Dimensions,
    KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard
} from "react-native";

import { tryAuth } from "../../store/actions/index";
import DefaultInput from "../../components/UI/DefaultInput";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import MainText from "../../components/UI/MainText/MainText";
import ButtonWithBackground from "../../components/UI/ButtonWithBackground/ButtonWithBackground";
import backgroundImage from "../../assets/background.jpg";

import startMainTabs from "../MainTabs/startMainTabs";
import Validate from "../../utility/utility";

class AuthScreen extends Component {
    state = {
        viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape",
        controls: {
            email: {
                value: "",
                valid: false,
                validationRules: {
                    isEmail: true
                },
                touched: false,
            },
            password: {
                value: "",
                valid: false,
                validationRules: {
                    minLength: 6
                },
                touched: false,
            },
            confirmPassword: {
                value: "",
                valid: false,
                validationRules: {
                    equalTo: "password"
                },
                touched: false,
            }
        },
        authMode: "login",
    }

    updateStyles = (dims) => {
        this.setState({
            viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape"
        })
    }

    constructor(props) {
        super(props);
        Dimensions.addEventListener("change", this.updateStyles);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener("change", this.updateStyles);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                authMode: prevState.authMode === "login" ? "signup" : "login"
            }
        })
    }


    loginHandler = () => {
        const authData = {
            email: this.state.controls.email.value,
            password: this.state.controls.password.value
        };
        this.props.onLogin(authData);
        startMainTabs();
    }

    updateInputState = (key, value) => {
        let connectedValues = {};
        if (this.state.controls[key].validationRules.equalTo) {
            const equalControl = this.state.controls[key].validationRules.equalTo;
            const equalValue = this.state.controls[equalControl].value;
            connectedValues = {
                ...connectedValues,
                equalTo: equalValue
            }
        }

        if (key === "password") {
            const equalControl = "password";
            connectedValues = {
                ...connectedValues,
                equalTo: value
            }
        }
        this.setState((prevState) => {
            return {
                controls: {
                    ...prevState.controls,
                    confirmPassword: {
                        ...prevState.controls.confirmPassword,
                        valid: key === "password"
                            ? Validate(
                                prevState.controls.confirmPassword.value,
                                prevState.controls.confirmPassword.validationRules,
                                connectedValues
                            )
                            : prevState.controls.confirmPassword.valid

                    },
                    [key]: {
                        ...prevState.controls[key],
                        value: value,
                        valid: Validate(value, prevState.controls[key].validationRules, connectedValues),
                        touched: true
                    },

                }
            }
        })
    }

    render() {
        let headingText = null;
        let confirmPasswordControl = null;

        if (this.state.viewMode === "portrait") {
            headingText = (
                <MainText>
                    <HeadingText>Please Log In</HeadingText>
                </MainText>
            );
        }

        if (this.state.authMode === "signup") {
            confirmPasswordControl = (
                <View style={this.state.viewMode === "portrait" ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}>
                    <DefaultInput
                        secureTextEntry={true}

                        placeholder="Confirm Password"
                        style={styles.input}
                        value={this.state.controls.confirmPassword.value}
                        valid={this.state.controls.confirmPassword.valid}
                        touched={this.state.controls.confirmPassword.touched}
                        onChangeText={(value) => { this.updateInputState("confirmPassword", value) }}
                    />
                </View>
            );
        }
        return (

            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>

                <KeyboardAvoidingView style={styles.container} behavior="padding">
                    {/* <Text style={styles.textHeading}>Please Log In</Text> */}
                    {headingText}
                    {/* <Button title="Switch to Login" style={{ backgroundColor: "transparent" }} /> */}
                    <ButtonWithBackground color="#29aaf4" onPress={this.switchAuthModeHandler}>Switch to {this.state.authMode === "login" ? "Sign Up" : "Login"}</ButtonWithBackground>

                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.inputContainer} >

                            <DefaultInput
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="email-address"
                                placeholder="Your E-Mail Address"
                                style={styles.input}
                                value={this.state.controls.email.value}
                                valid={this.state.controls.email.valid}
                                touched={this.state.controls.email.touched}
                                onChangeText={(value) => { this.updateInputState("email", value) }} />
                            {/* <View style={styles.passwordContainer}> */}
                            <View style={this.state.viewMode === "portrait" || this.state.authMode === "login"
                                ? styles.portraitPasswordContainer : styles.landscapePasswordContainer} >
                                {/* <View style={styles.passwordWrapper}> */}
                                <View style={this.state.viewMode === "portrait" || this.state.authMode === "login" ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}>
                                    <DefaultInput
                                        placeholder="Password"
                                        secureTextEntry={true}
                                        style={styles.input}
                                        value={this.state.controls.password.value}
                                        valid={this.state.controls.password.valid}
                                        touched={this.state.controls.password.touched}
                                        onChangeText={(value) => { this.updateInputState("password", value) }}
                                    />
                                </View>
                                {/* <View style={styles.passwordWrapper}> */}
                                {confirmPasswordControl}
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    {/* <Button title="SUBMIT" onPress={this.loginHandler} /> */}

                    <ButtonWithBackground color="#29aaf4" onPress={this.loginHandler} disabled={
                        !this.state.controls.confirmPassword.valid && this.state.authMode === "signup" ||
                        !this.state.controls.email.valid ||
                        !this.state.controls.password.valid
                    }> SUBMIT </ButtonWithBackground>

                </KeyboardAvoidingView >
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
    },

    landscapePasswordContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },

    portraitPasswordContainer: {
        flexDirection: "column",
        justifyContent: "flex-start"
    },


    landscapePasswordWrapper: {
        width: "45%"
    },

    portraitPasswordWrapper: {
        width: "100%"
    }

})

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (authData) => dispatch(tryAuth(authData))
    }
}

export default connect(null, mapDispatchToProps)(AuthScreen);