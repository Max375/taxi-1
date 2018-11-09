import React, {Component} from 'react';
import './Map.css';
import { withGoogleMap, withScriptjs, GoogleMap} from "react-google-maps"
import Marker from '../../../assets/img/marker.png'
import {throttle} from "../../../utils";


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


    state = {
        isAddressSelect: false,
    };

    position = {
        lat: null,
        long: null,
    };

    map = null;

    inputRef = null;

    constructor(props) {
        super(props);
    }



    geocoder = throttle(() => {
        const geocoder = new window.google.maps.Geocoder;

        const location = {
            lat: this.map.state.map.center.lat(),
            long: this.map.state.map.center.lng()
        };


        geocoder.geocode({'location': {lat: location.lat, lng: location.long,}}, (results,status) => {

            try{
                if(status === 'OK' && this.inputRef !=null){
                    this.inputRef.value = results[0].address_components[1].long_name;

                    this.position = {
                        lat: location.lat,
                        lon: location.long,
                    };

                    this.setState({isAddressSelect: true});
                }
            }catch (e) {

            }
        });

    },400);



    render() {

        return (
            <div class='map-container'>
                <input ref={(ref) => {this.inputRef = ref;}} type="text" class={'map-input'}/>

                <MyMapComponent
                    ref = {map => (this.map = map)}
                    center = {this.props.center}
                    zoom = {this.props.zoom}
                    geocoder = {this.geocoder}
                    googleMapURL = {"https://maps.googleapis.com/maps/api/js?key=AIzaSyC2KMjrNE3GpU8xFnZwwa0_ic5tGjDW2cg&v=3.exp&libraries=geometry,drawing,places"}
                    containerElement = {<div style={{ height: `100%` }} />}
                    mapElement = {<div style={{ height: `100%` }} />}
                />

                <div class='map-marker'><img src={Marker} alt=""/></div>

                <div class={this.state.isAddressSelect ? 'map-button map-button--active' : 'map-button'} onClick={()=>{

                    this.props.addressSelect({
                        data: {
                            value: this.position,
                            label: this.inputRef.value
                        }
                    });
                }}>Готово</div>
            </div>
        );
    }
}


export default OrderMap;

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