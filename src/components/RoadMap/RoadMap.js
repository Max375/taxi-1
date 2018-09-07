/*
import React from "react";
import ReactDOM from "react-dom";
import {
    Marker
}
    from "react-google-maps";
import Driver from "../Driver/Driver";

const google = window.google;
let STORAGE = null;
let START = null;

const _DRIVER = {
    lat: 53.904,
    lng: 27.535,
};

let RESULT = null;

const {
    compose, withProps, lifecycle
} = require("recompose");
const {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    DirectionsRenderer
} = require("react-google-maps");

const {
    DrawingManager
} = require("react-google-maps/lib/components/drawing/DrawingManager");

const MapWithADirectionsRenderer = compose(
    withProps({
        loadingElement: < div style = {
            {
                height: `100%`
            }
        }
        />,
        containerElement: < div style = {
            {
                height: `400px`
            }
        }
        />,
        mapElement: < div style = {
            {
                height: `100%`
            }
        }
        />
    }),
    withScriptjs,
    withGoogleMap,
    lifecycle({
        componentDidMount() {
            const DirectionsService = new google.maps.DirectionsService();

            DirectionsService.route({
                origin: new google.maps.LatLng(53.900404009119, 27.535882670411),
                destination: new google.maps.LatLng(53.902403009119, 27.432882670411),
                travelMode: google.maps.TravelMode.DRIVING
            }, (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    console.log(JSON.stringify(result));
                    STORAGE = result.routes[0].legs[0].steps;
                    START = result.routes[0].legs[0].start_location;
                    this.setState({
                        directions: result
                    });
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            });
        }
    })
)(props => {

    let _POINTS = [];
    if (STORAGE != null) {
        _POINTS = STORAGE.map((val) => {
            return ( < Marker position = {
                {
                    lat: val.end_location.lat(),
                    lng: val.end_location.lng()
                }
            }
            />) });

        const _POINT_A = {
            lat: STORAGE[0].end_location.lat(),
            lng: STORAGE[0].end_location.lng(),
        };

        const _POINT_B = {
            lat: STORAGE[1].end_location.lat(),
            lng: STORAGE[1].end_location.lng(),
        };

        const _POINT_C = {
            lat: START.lat(),
            lng: START.lng(),
        };

        console.log(_POINT_A, _POINT_B, _POINT_C);

        function lng(x, y) {

            return Math.sqrt(Math.pow(x.lng - y.lng, 2) + Math.pow(x.lat - y.lat, 2));
        }

        function calc(end_point, start_point, driver_point) {
            /*
const long_osn  = lng(end_point,start_point);
const long_r = lng(driver_point, end_point);
const long_l = lng(start_point, driver_point);

const x = Math.pow(long_r,2)-Math.pow(long_l,2)+Math.pow(long_osn,2)/(2*long_osn);
console.log(x,'x');

const l  = Math.pow(long_r,2) - Math.pow(x,2);
console.log(l,'l');
const k = (end_point.lng - start_point.lng)/(end_point.lat-start_point.lat);

const b = k* end_point.lat - end_point.lng;

console.log(b,'b');

console.log(k,'k');
const k2 = 1/k;
console.log(k2,'k2');
const b2 = k2*driver_point.lat - driver_point.lng;
console.log(b2,'b2');

const x_r = -(b2-b)/(k-k2);

console.log(x_r,'x_r');

console.log('y_r',k*x_r+b);

console.log(long_osn,long_r,long_l);

if (end_point.lat > start_point.lat) {
    const buf = end_point;
    end_point = start_point;
    start_point = buf;
}
console.log(start_point.lat);
console.log(end_point.lat);

const k1 = (start_point.lng - end_point.lng) / (start_point.lat - end_point.lat);

console.log(k1, 'k1');

const b1 = start_point.lng - k1 * start_point.lat;

console.log(b1, 'b1');

const k2 = -1 / k1;
console.log(k2, 'k2');

const b2 = driver_point.lng - k2 * driver_point.lat;

console.log(b2, 'b2');

const x_res = (b2 - b1) / (k1 - k2);
console.log(x_res, 'x_res');

console.log(k1 * x_res + b1, 'y_res');

//const k1 =

RESULT = {
    lat: x_res,
    lng: k1 * x_res + b1
};
}

calc(_POINT_A, _POINT_B, _DRIVER);

}
return (

    < GoogleMap defaultZoom = {
        12
    }
                defaultCenter = {
                    new google.maps.LatLng(53.900404009119, 27.535882670411)
                } >

        {
            false && < DirectionsRenderer directions = {
                props.directions
            }
            />} < /GoogleMap>
        )
        });

        export default MapWithADirectionsRenderer;
 */
/*

import React, {Component} from 'react';
import { withGoogleMap, withScriptjs, GoogleMap} from "react-google-maps"
import Marker from '../../assets/img/marker.png'
import _ from 'underscore'
const OK = 'OK';

const DirectionsRenderer = require("react-google-maps");
const google = window.google;

let STORAGE = null;
let START = null;





const MyMapComponent = withGoogleMap(withScriptjs((props) =>{
        return <GoogleMap
            defaultZoom = {props.zoom}
            defaultCenter = {props.center}
            options = {
                {
                    gestureHandling: 'greedy',
                }
            }
        >
            {props.directions !== undefined && <DirectionsRenderer directions={props.directions} />}
        </GoogleMap>
    }
));





class RoadMap extends Component {

    static defaultProps = {
        center: {
            lat: 53.90453979999999,
            lng: 27.5615244
        },
        zoom: 12,
        isMapVisible: false
    };


    state = {
        direction: null
    };



    constructor(props) {
        super(props);
        this.position = {
            lat: null,
            long: null,
        };
        this.map = null;
    }

    componentDidMount(){
        const DirectionsService = new google.maps.DirectionsService();

        DirectionsService.route({
            origin: new google.maps.LatLng(53.900404009119, 27.535882670411),
            destination: new google.maps.LatLng(53.902403009119, 27.432882670411),
            travelMode: google.maps.TravelMode.DRIVING
        }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                console.log(JSON.stringify(result));
                STORAGE = result.routes[0].legs[0].steps;
                START = result.routes[0].legs[0].start_location;
                this.setState({
                    directions: result,
                });
            } else {
                console.error(`error fetching directions ${result}`);
            }
        });
    }




    render() {
        return (
            <div className='map-container'>

                <MyMapComponent
                    ref = {map => (this.map = map)}
                    center = {this.props.center}
                    zoom = {this.props.zoom}
                    geocoderHandler = {_.throttle(this.geocoderHandler,400)}
                    containerElement = {<div style={{ height: `100%` }} />}
                    mapElement = {<div style={{ height: `100%` }} />}
                    directions={this.state.directions}
                    />


            </div>
        );
    }
}


export default RoadMap;

*/
import React, {Component} from 'react';

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
                origin: new google.maps.LatLng(41.8507300, -87.6512600),
                destination: new google.maps.LatLng(41.8525800, -87.6514100),
                travelMode: google.maps.TravelMode.DRIVING,
            }, (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    this.setState({
                        directions: result,
                    });
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            });
        }
    })
)(props =>
    <GoogleMap
        defaultZoom={7}
        defaultCenter={new google.maps.LatLng(41.8507300, -87.6512600)}
        options = {{
            disableDefaultUI: true
        }}
    >
        {props.directions && <DirectionsRenderer directions={props.directions} />}
    </GoogleMap>
);

export default MapWithADirectionsRenderer;