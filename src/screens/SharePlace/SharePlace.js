import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from "react-redux";

import PlaceInput from "../../components/UserInput/UserInput";
import { addPlace } from "../../store/actions/index";

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
        console.log(event);
    }
    placeAddedHandler = placeName => {
        this.props.placeChangeAdd(placeName)
    }
    render() {
        return (
            <View>
                <PlaceInput placeChangeAdd={this.placeAddedHandler} />
            </View>
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {
        placeChangeAdd: (placeName) => dispatch(addPlace(placeName))
    }
}
export default connect(null, mapDispatchToProps)(SharePlaceScreen);