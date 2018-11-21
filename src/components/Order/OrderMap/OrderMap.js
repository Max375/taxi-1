import React, {Component} from 'react';
import './OrderMap.css';
import { withGoogleMap, GoogleMap} from "react-google-maps"
import {throttle} from "../../../utils";
import Marker from '../../../assets/img/map-locator.png'

const MyMapComponent = withGoogleMap((props) =>
    <GoogleMap
        defaultZoom = {props.zoom}
        defaultCenter = {props.center}
        options = {
            {
                disableDefaultUI: true,
                gestureHandling: 'greedy',
                center_changed: props.geocoder,
            }
        }
    >
    </GoogleMap>
);




class OrderMap extends Component {

    static defaultProps = {
        center: {
            lat: 53.90453979999999,
            lng: 27.5615244
        },
        zoom: 12,
        isMapVisible: false
    };


    map = null;


    constructor(props) {
        super(props);
    }


    geocoder = throttle(() => {
        const geocoder = new window.google.maps.Geocoder;

        const location = {
            lat: this.map.state.map.center.lat(),
            lon: this.map.state.map.center.lng()
        };


        geocoder.geocode({'location': {lat: location.lat, lng: location.lon}}, (results,status) => {

                if(status === 'OK'){
                    this.props.onChange({label: results[0].address_components[1].long_name, value: location });
                }
        });

    },400);



    render() {

        return (
            <div className='map-container'>

                <MyMapComponent
                    ref = {map => (this.map = map)}
                    center = {this.props.center}
                    zoom = {this.props.zoom}
                    geocoder = {this.geocoder}
                    googleMapURL = {"https://maps.googleapis.com/maps/api/js?key=AIzaSyC2KMjrNE3GpU8xFnZwwa0_ic5tGjDW2cg&v=3.exp&libraries=geometry,drawing,places"}
                    containerElement = {<div style={{ height: `100%` }} />}
                    mapElement = {<div style={{ height: `100%` }} />}
                />

                <div className='map-marker'><img src={Marker}  alt=""/></div>
            </div>
        );
    }
}


export default OrderMap;

/*
                <input ref={(ref) => {this.inputRef = ref;}} type="text" class={'map-input'}/>

 */

/*
       <GoogleMap class='map-container'
                           defaultCenter = {this.props.center}
                           defaultZoom = {this.props.zoom}
                    options={
                        {
                            gestureHandling: 'greedy'
                        }
                    }
                    onChange= {
                        (currentState) => {

                            fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng='+ currentState.center.lat +',' + currentState.center.lng +'&key=' + this.props.apiKey)
                                .then(resp => resp.json())
                                .then(data =>{
                                    if (data.status === ZERO_RESULT) return;
                                    this.inputRef.value = data.results[0].formatted_address;
                                    this.position = {
                                        lat: currentState.center.lat,
                                        long: currentState.center.lng,
                                    };
                                    this.setState({isAddressSelect: true});
                                });
                        }
                    }
                    >
                </GoogleMap>
 */

/*
<div class={this.state.isAddressSelect ? 'map-button map-button--active' : 'map-button'} onClick={()=>{

                    this.props.addressSelect({
                        data: {
                            value: this.position,
                            label: this.inputRef.value
                        }
                    });
                }}>Готово</div>
 */