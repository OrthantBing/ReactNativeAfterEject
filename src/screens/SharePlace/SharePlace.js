import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image } from 'react-native';
import { connect } from "react-redux";

// import PlaceInput from "../../components/UserInput/UserInput";
import { addPlace } from "../../store/actions/index";
import DefaultInput from "../../components/UI/DefaultInput";
import MainText from "../../components/UI/MainText/MainText";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import ImagePlaceholder from "../../assets/background.jpg"
import ImagePreviewer from "../../components/UI/ImagePreviewer/ImagePreviewer";
import PlaceInput from "../../components/UserInput/PlaceInput";
import PickLocation from "../../components/UI/PickLocation/PickLocation";
import Validate from "../../utility/utility";

class SharePlaceScreen extends Component {
    state = {
        controls: {
            placeName: {
                value: "",
                valid: false,
                touched: false,
                validationRules: {
                    notEmpty: true
                }
            },
            location: {
                value: null,
                valid: false,
            },
            image: {
                value: null,
                valid: false
            }
        }
    }
    static navigatorStyle = {
        navBarButtonColor: "orange"
    }
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.OnNavigatorEvent);
    }

    OnNavigatorEvent = event => {
        if (event.type === "NavBarButtonPress") {
            if (event.id === "sideDrawerToggle") {
                this.props.navigator.toggleDrawer({
                    side: " left"
                });
            }
        }
    }
    placeAddedHandler = placeName => {
        //console.log(placeName);
        this.props.placeChangeAdd(placeName)
    }

    locationPickedHandler = location => {
        console.log(location);
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    location: {
                        value: location,
                        valid: true
                    }
                }
            }
        });
        console.log(this.state);
    }

    /*
     * This was a mistake, 
     * and corrections made.
     * 
     */
    placeNameChangedHandler = val => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    placeName: {
                        ...prevState.controls.placeName,
                        value: val,
                        valid: Validate(val, prevState.controls.placeName.validationRules),
                        touched: true
                    }
                }
            }
        });
        //this.setState({ placeName: val });
    };

    placeSubmitHandler = () => {
        if (this.state.controls.placeName.value.trim() === "") {
            return;
        }

        this.props.placeChangeAdd(
            this.state.controls.placeName.value,
            this.state.controls.location.value,
            this.state.controls.image.value
        );
        //this.setState({ placeName: "" });
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    placeName: {
                        ...prevState.controls.placeName,
                        value: "",
                        valid: false,
                        touched: false
                    }
                }
            }
        });
        return;
    };

    imagePickedHandler = (image) => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    image: {
                        value: image,
                        valid: true
                    }
                }
            }
        })
    }

    render() {
        return (
            <ScrollView >
                <View style={styles.container}>
                    <MainText>
                        <HeadingText> Share a place with us</HeadingText>
                    </MainText>
                    {/* <View style={styles.placeholder}>
                        <Image source={ImagePlaceholder} style={styles.previewImage} />
                    </View>
                    <View style={styles.button}>
                        <Button title="Pickup Image"></Button>
                    </View> */}
                    <ImagePreviewer onImagePicked={this.imagePickedHandler} />
                    {/* <View style={styles.placeholder}>
                        <Text>Map</Text>
                    </View>
                    <View style={styles.button}>
                        <Button title="Locate Me" onPress={() => { }} />
                    </View> */}
                    <PickLocation onLocationPick={this.locationPickedHandler} />
                    {/* <DefaultInput placeholder="Place Name" />
                    <View style={styles.button}>
                        <Button title="Share the Place!" />
                    </View> */}

                    <PlaceInput onChangeText={this.placeNameChangedHandler}
                        placeData={this.state.controls.placeName}
                    />
                    <View style={styles.button}>
                        <Button
                            disabled={!this.state.controls.placeName.valid
                                || !this.state.controls.location.valid
                                || !this.state.controls.image.valid
                            }
                            title="Share the Place!"
                            onPress={this.placeSubmitHandler}
                            style={styles.placeButton}
                        />
                    </View>
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
    },
    placeButton: {
        width: "30%"
    },
})

const mapDispatchToProps = dispatch => {
    return {
        placeChangeAdd: (placeName, location, image) => dispatch(addPlace(placeName, location, image))
    }
}
export default connect(null, mapDispatchToProps)(SharePlaceScreen);