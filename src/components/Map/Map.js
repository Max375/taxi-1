import React, {Component} from 'react';
import './Map.css';
import { withGoogleMap, withScriptjs, GoogleMap} from "react-google-maps"
import Marker from '../../assets/img/marker.png'
import _ from 'underscore'

const OK = 'OK';



const MyMapComponent = withGoogleMap((props) =>
    <GoogleMap
        defaultZoom = {props.zoom}
        defaultCenter = {props.center}
        options = {
            {
                disableDefaultUI: true,
                gestureHandling: 'greedy',
                center_changed: props.geocoderHandler,
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



    constructor(props) {
        super(props);
        this.position = {
            lat: null,
            long: null,
        };
        this.map = null;
        this.inputRef = null;
    }


    geocoderHandler = () => {
        const geocoder = new window.google.maps.Geocoder;

        const location = {
            lat: this.map.state.map.center.lat(),
            lng: this.map.state.map.center.lng()
        };


        geocoder.geocode({
                'location': location
            },
            (results,status) => {
                if(status === OK && this.inputRef !=null){
                    this.inputRef.value = results[0].formatted_address;
                    this.position = location;
                    this.setState({isAddressSelect: true});
                }
            }
        );

        /*
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
         */
    };



    render() {

        return (
            <div className='map-container'>
                <input ref={(ref) => {this.inputRef = ref;}} type="text" className={'map-input'}/>

                <MyMapComponent
                    ref = {map => (this.map = map)}
                    center = {this.props.center}
                    zoom = {this.props.zoom}
                    geocoderHandler = {_.throttle(this.geocoderHandler,400)}
                    containerElement = {<div style={{ height: `100%` }} />}
                    mapElement = {<div style={{ height: `100%` }} />}
                />

                <div className='map-marker'><img src={Marker} alt=""/></div>

                <div className={this.state.isAddressSelect ? 'map-button map-button--active' : 'map-button'} onClick={()=>{
                    this.props.handler(this.inputRef.value, this.position);
                }}>Готово</div>
            </div>
        );
    }
}


export default OrderMap;

/*
       <GoogleMap className='map-container'
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