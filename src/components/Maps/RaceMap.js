import React from 'react';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import car from "../../assets/img/car.png";

const MyMapComponent = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC2KMjrNE3GpU8xFnZwwa0_ic5tGjDW2cg&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `100%` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)((props) =>{

    let lat =  53.90453979999999,
        lon = 27.5615244;

    try {
        lat = props.location.lat;
        lon = props.location.lon;
    }
    catch (e) {}

        return(
            <GoogleMap
                defaultZoom={8}
                defaultCenter={{ lat: lat, lng: lon }}
                options = {{
                        disableDefaultUI: true,
                        gestureHandling: 'greedy',
                    }}
            >
                <Marker options={{icon: car}} position={{ lat: props.location.lat || -34.397, lng: props.location.lon || 150.644 }} />
            </GoogleMap>
        )
    }
);

export default MyMapComponent;




