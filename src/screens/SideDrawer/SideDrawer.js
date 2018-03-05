import react, { Component } from "react";
import { View, Text, Dimensions } from "react-native";

class SideDrawer extends Component {
    render() {
        return (
            <View
                style={{ flex: 1, justifyContent: 'center', height: '100%', width: 100, backgroundColor: 'rgb(240,239,245)' }}
            >
                <Text>SideDrawer</Text>
            </View >);
    }
}

export default SideDrawer;