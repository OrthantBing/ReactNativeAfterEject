import React from "react";

import { StyleSheet, View, FlatList } from "react-native";
import ListItem from "../ListItem/ListItem";

const placeList = props => {
  const placesOutput = props.places.map((place, id) => {
    return (
      <ListItem
        key={id}
        placeName={place}
        onItemPressed={() => props.onItemSelected(id)}
      />
    );
  });

  return (
    <FlatList
      style={styles.listContainer}
      data={props.places}
      renderItem={info => {
        return (
          <ListItem
            placeName={info.item.name}
            placeImage={info.item.image}
            onItemPressed={() => props.onItemSelected(info.item.key)}
          />
        );
      }}
    >
      {placesOutput}
    </FlatList>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    width: "100%"
  }
});

export default placeList;
