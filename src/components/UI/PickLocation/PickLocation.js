import React, { Component } from "react";
import { View, Image, Button, StyleSheet, Text, Dimensions, PermissionsAndroid } from "react-native";
import MapView from "react-native-maps";

class PickLocation extends Component {
    state = {
        focusedLocation: {
            latitude: 12.9080659,
            longitude: 80.2167269,
            latitudeDelta: 0.0122,
            longitudeDelta: Dimensions.get("window").width / Dimensions.get("window").height * 0.0122
        },
        locationChosen: false,

    }

    pickLocationHandler = event => {
        const coords = event.nativeEvent.coordinate;
        this.map.animateToRegion({
            ...this.state.focusedLocation,
            latitude: coords.latitude,
            longitude: coords.longitude
        })
        this.setState(prevState => {
            return {
                focusedLocation: {
                    ...prevState.focusedLocation,
                    latitude: coords.latitude,
                    longitude: coords.longitude,

                },
                locationChosen: true
            }
        });
        console.log("reacthed here")
        console.log(this.props.onLocationPick.toString());
        this.props.onLocationPick({
            latitude: coords.latitude,
            longitude: coords.longitude
        })

    }

    getLocationHandlerAsync = () => {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
            'title': "Allow access to location",
            'message': "The application would like to access ur location"
        }).then((granted) => {

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                return this.getLocationHandler();
            } else {
                alert("Access to location denied. Please pick position manually");
            }
        }).catch(err => {
            console.log(err);
            this.getLocationHandler();
        })
    }
    getLocationHandler = () => {
        //console.log("Inside get location handler");
        //console.log(navigator);
        navigator.geolocation.getCurrentPosition((pos) => {
            //console.log(pos);
            const coordsEvent = {
                nativeEvent: {
                    coordinate: {
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude
                    }
                }
            };
            this.pickLocationHandler(coordsEvent)
        }, (err) => {
            console.log(err);
            alert("Fetching position failed, please pick one manually")
        }, { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 })
    }
    render() {
        let marker = null;
        if (this.state.locationChosen) {
            marker = <MapView.Marker coordinate={this.state.focusedLocation} />
        }


        return (
            <View style={styles.wrapperview} >
                {/* <View style={styles.placeholder}>
                    <Text>Map</Text>
                </View> */}
                <MapView initialRegion={this.state.focusedLocation} style={styles.map}
                    onPress={this.pickLocationHandler}
                    ref={ref => this.map = ref}
                >{marker}</MapView>
                <View style={styles.button}>
                    <Button title="Locate Me" onPress={this.getLocationHandlerAsync} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    placeholder: {
        borderWidth: 1,
        borderColor: "black",
        backgroundColor: "#eee",
        width: "80%",
        height: 150
    },
    map: {

        width: "100%",
        height: 250
    },
    button: {
        margin: 8
    },
    wrapperview: {

        width: "100%",
        flexDirection: "column",
        alignItems: "center"
    },
});

export default PickLocation;