import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { connect } from "react-redux";
import PlaceList from "../../components/PlaceList/PlaceList";

class FindPlaceScreen extends Component {
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
        console.log(event);
    }

    itemSelectedHandler = key => {
        const setPlace = this.props.places.find(place => {
            return place.key === key
        })
        this.props.navigator.push({
            screen: "awesome-places.PlaceDetailScreen",
            title: setPlace.name,
            passProps: {
                selectedPlace: setPlace
            }
        })
    }

    render() {
        return (
            <View>
                <Text>On Find Place Screen</Text>
                <PlaceList places={this.props.places} onItemSelected={this.itemSelectedHandler} />
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        places: state.places.places
    }
}

export default connect(mapStateToProps)(FindPlaceScreen);