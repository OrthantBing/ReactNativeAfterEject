import {
  ADD_PLACE,
  DELETE_PLACE,

} from "../actions/actionTypes";

const initialState = {
  places: [
    {
      key: 1,
      name: "fuckyou",
      image: {
        uri:
          "https://vignette.wikia.nocookie.net/naruto/images/4/42/Naruto_Part_III.png/revision/latest/scale-to-width-down/300?cb=20180117103539"
      }
    }
  ],
  selectedPlace: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      const placeName = action.placeName;

      return {
        ...state,
        places: [
          ...state.places,
          {
            key: Math.random(),
            name: placeName,
            image: {
              uri:
                "https://vignette.wikia.nocookie.net/naruto/images/4/42/Naruto_Part_III.png/revision/latest/scale-to-width-down/300?cb=20180117103539"
            } //narutoImage }
          }
        ]
      };

    case DELETE_PLACE:
      return {
        ...state,
        places: state.places.filter(place => {
          return place.key !== action.placeKey;
        }),
        selectedPlace: null
      };


    default:
      return state;
  }
};

export default reducer;
