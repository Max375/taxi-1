import React from "react";

import car from '../../../assets/img/car.png'
import {Marker, Polyline} from "react-google-maps";
import connect from "react-redux/es/connect/connect";

const google = window.google;


const { compose, withProps, lifecycle } = require("recompose");
const {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    DirectionsRenderer,
} = require("react-google-maps");

const MapWithADirectionsRenderer = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC2KMjrNE3GpU8xFnZwwa0_ic5tGjDW2cg&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `100%` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap,
    lifecycle({

        componentDidMount() {
            const DirectionsService = new google.maps.DirectionsService();
            DirectionsService.route({
                origin: new google.maps.LatLng(this.props.driver.location.lat,this.props.driver.location.lon),
                destination: new google.maps.LatLng(this.props.order.startPoint.value.lat, this.props.order.startPoint.value.lon),
                travelMode: google.maps.TravelMode.DRIVING,
            }, (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    this.setState({
                        directions: result,
                    });
                }
            });

        }

    })
)(props =>{
        return(
            <GoogleMap
                defaultZoom={7}
                options = {{
                    disableDefaultUI: true
                }}
            >


                {props.directions && <DirectionsRenderer
                    markerOptions = {{icon: car}}
                    directions={props.directions} />
                }
                {
                    props.driver !== null && props.driver.location !==null && <Marker options={{icon: car}} position={{ lat: props.driver.location.lat, lng: props.driver.location.lon}} />
                }
            </GoogleMap>
        )
    }
);



const mapStateToProps = (state) => {
    return {
        order: state.order,
        push: state.push,
        driver: state.driver
    };
};

export default connect(mapStateToProps)(MapWithADirectionsRenderer);


