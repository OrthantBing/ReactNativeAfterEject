import React, { Component } from "react";
import { View, Image, Button, StyleSheet } from "react-native";
import ImagePicker from "../../../platform/ImagePicker";

class imagePreviewer extends Component {
    state = {
        pickedImage: null
    }

    pickImageHandler = () => {
        ImagePicker.showImagePicker({
            title: "Pick an Image"
        }, res => {
            if (res.didCancel) {
                console.log("User Cancelled!");
            } else if (res.error) {
                console.log("Error", res.error);
            } else {
                this.setState({
                    pickedImage: { uri: res.uri }
                });
                this.props.onImagePicked({
                    uri: res.uri
                })
            }
        })

    }
    render() {
        return (
            <View style={styles.wrapperview}>
                <View style={styles.placeholder}>
                    <Image source={this.state.pickedImage} style={styles.previewImage} />
                </View>
                <View style={styles.button}>
                    <Button title="Pickup Image" onPress={this.pickImageHandler}></Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapperview: {
        width: "100%",
        flexDirection: "column",
        alignItems: "center"
    },
    placeholder: {
        borderWidth: 1,
        borderColor: "black",
        backgroundColor: "#eee",
        width: "80%",
        height: 150
    },
    previewImage: {
        width: "100%",
        height: "100%"
    },
    button: {
        margin: 8
    }
})

export default imagePreviewer;