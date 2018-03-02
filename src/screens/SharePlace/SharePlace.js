import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {connect} from "react-redux";

import PlaceInput from "../../components/UserInput/UserInput";
import { addPlace } from "../../store/actions/index";

class SharePlaceScreen extends Component {
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