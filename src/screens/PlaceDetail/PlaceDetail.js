import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
  ScrollView
} from "react-native";
import MapView from "react-native-maps";

import { connect } from "react-redux";
import { deletePlace } from "../../store/actions/index";
import Icon from "react-native-vector-icons/Ionicons";


class PlaceDetail extends Component {

  state = {
    viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape"

  }

  constructor(props) {
    super(props);
    Dimensions.addEventListener("change", this.updateStyles);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.updateStyles);
  }

  updateStyles = (dims) => {
    this.setState({
      viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape"
    })
  }

  placeDeletedHandler = () => {
    this.props.onDeletePlace(this.props.selectedPlace.key);
    this.props.navigator.pop();
  }

  render() {
    let marker = null;
    if (this.props.selectedPlace.location) {
      marker = <MapView.Marker coordinate={this.props.selectedPlace.location} />;
    }
    console.log(this.props.selectedPlace);

    return (
      <ScrollView>
        <View style={[
          styles.Container,
          this.state.viewMode === "portrait"
            ? styles.portraitContainer
            : styles.landscapeContainer
        ]}>
          <View style={styles.placeDetailContainer}>
            <View style={styles.subContainer}>

              <Image source={this.props.selectedPlace.image} style={styles.placeImage} />

            </View >

            <View style={styles.subContainer}>
              <MapView initialRegion={{
                ...this.props.selectedPlace.location,
                latitudeDelta: 0.0122,
                longitudeDelta: Dimensions.get("window").width / Dimensions.get("window").height * 0.0122

              }} style={styles.map}

              >{marker}
              </MapView>

            </View>
          </View>
          <View style={styles.subContainer}>
            <View>
              <Text style={styles.placeName}> {this.props.selectedPlace.name} </Text>
            </View>


            <View>
              <TouchableOpacity onPress={this.placeDeletedHandler}>
                <View style={styles.deleteButton}>
                  <Icon
                    size={30}
                    name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
                    color="red"
                    onPress={this.placeDeletedHandler}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

    );

  }
}

const styles = StyleSheet.create({
  Container: {
    margin: 22,
    flex: 1
  },

  portraitContainer: {
    flexDirection: "column"
  },

  landscapeContainer: {
    flexDirection: "row",

  },
  placeDetailContainer: {
    flex: 2
  },

  placeImage: {
    width: "100%",
    height: 200,
  },
  placeName: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 28
  },
  deleteButton: {

    alignItems: "center"
  },
  subContainer: {

    flex: 1
  },
  map: {
    //...StyleSheet.absoluteFillObject
    width: "100%",
    height: 200
  },
});

const mapDispatchToProps = dispatch => {
  return {
    onDeletePlace: key => dispatch(deletePlace(key))
  };
};

export default connect(null, mapDispatchToProps)(PlaceDetail);


