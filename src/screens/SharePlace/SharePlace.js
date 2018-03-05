import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image } from 'react-native';
import { connect } from "react-redux";

// import PlaceInput from "../../components/UserInput/UserInput";
import { addPlace } from "../../store/actions/index";
import DefaultInput from "../../components/UI/DefaultInput";
import MainText from "../../components/UI/MainText/MainText";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import ImagePlaceholder from "../../assets/background.jpg"

class SharePlaceScreen extends Component {
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.OnNavigatorEvent);
    }

    OnNavigatorEvent = event => {
        if (event.type === "NavBarButtonPress") {
            if (event.id === "sideDrawerToggle") {
                this.props.navigator.toggleDrawer({
                    side: "left"
                });
            }
        }
    }
    placeAddedHandler = placeName => {
        this.props.placeChangeAdd(placeName)
    }
    render() {
        return (
            <ScrollView >
                <View style={styles.container}>
                    <MainText>
                        <HeadingText> Share a place with us</HeadingText>
                    </MainText>
                    <View style={styles.placeholder}>
                        <Image source={ImagePlaceholder} style={styles.previewImage} />
                    </View>
                    <View style={styles.button}>
                        <Button title="Pickup Image"></Button>
                    </View>
                    <View style={styles.placeholder}>
                        <Text>Map</Text>
                    </View>
                    <View style={styles.button}>
                        <Button title="Locate Me" />
                    </View>
                    <DefaultInput placeholder="Place Name" />
                    <View style={styles.button}>
                        <Button title="Share the Place!" />
                    </View>

                    {/* <PlaceInput placeChangeAdd={this.placeAddedHandler} /> */}
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    previewImage: {
        width: "100%",
        height: "100%"
    },
    container: {
        flex: 1,
        alignItems: "center"
    },
    placeholder: {
        borderWidth: 1,
        borderColor: "black",
        backgroundColor: "#eee",
        width: "80%",
        height: 150
    },
    button: {
        margin: 8
    }
})

const mapDispatchToProps = dispatch => {
    return {
        placeChangeAdd: (placeName) => dispatch(addPlace(placeName))
    }
}
export default connect(null, mapDispatchToProps)(SharePlaceScreen);