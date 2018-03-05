import React, { Component } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";

class SideDrawer extends Component {
    render() {
        alert(Dimensions.get("window").width)
        return (
            <View
                style={[
                    styles.container,
                    { width: Dimensions.get("window").width * 0.9 }
                ]}
            >
                <Text>SideDrawer</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 22,
        backgroundColor: "white",
        flex: 1
    }
});

export default SideDrawer;
