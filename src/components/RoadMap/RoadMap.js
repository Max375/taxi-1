import React from "react";
import ReactDOM from "react-dom";
import { Marker } from "react-google-maps";

const google = window.google;
let STORAGE = null;

const { compose, withProps, lifecycle } = require("recompose");
const {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    DirectionsRenderer
} = require("react-google-maps");

const MapWithADirectionsRenderer = compose(
    withProps({
        googleMapURL:
            "https://maps.googleapis.com/maps/api/js?key=AIzaSyC2KMjrNE3GpU8xFnZwwa0_ic5tGjDW2cg&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />
    }),
    withScriptjs,
    withGoogleMap,
    lifecycle({
        componentDidMount() {
            const DirectionsService = new google.maps.DirectionsService();

            DirectionsService.route(
                {
                    origin: new google.maps.LatLng(53.900404009119, 27.535882670411),
                    destination: new google.maps.LatLng(53.902403009119, 27.432882670411),
                    travelMode: google.maps.TravelMode.DRIVING
                },
                (result, status) => {
                    if (status === google.maps.DirectionsStatus.OK) {
                        console.log(result.routes[0].legs[0].steps);
                        STORAGE = result.routes[0].legs[0].steps;
                        this.setState({
                            directions: result
                        });
                    } else {
                        console.error(`error fetching directions ${result}`);
                    }
                }
            );
        }
    })
)(props => {

    let _POINTS = [];
    if (STORAGE != null){

        _POINTS = STORAGE.map((val)=>{ return (<Marker position={{lat: val.end_location.lat(),lng: val.end_location.lng()}} />) });

        console.log(_POINTS,'points');
    }
    return(

    <GoogleMap
        defaultZoom={7}
        defaultCenter={new google.maps.LatLng(53.900404009119, 27.535882670411)}
    >
        {_POINTS!=null && _POINTS}
        {props.directions && <DirectionsRenderer directions={props.directions} />}
    </GoogleMap>
)});

export default MapWithADirectionsRenderer;