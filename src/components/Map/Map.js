import React, {Component} from 'react';

import GoogleMap from 'google-map-react';
import './Map.css';

const ZERO_RESULT = 'ZERO_RESULTS';

class SimpleMapPage extends Component {

    static defaultProps = {
        center: [53.90453979999999, 27.5615244],
        zoom: 12,
        apiKey: 'AIzaSyC2KMjrNE3GpU8xFnZwwa0_ic5tGjDW2cg',
        isMapVisible: false,
    };

    state = {
        isAddressSelect: false,
    };

    constructor(props) {
        super(props);
        this.inputRef = null;
        this.position = {
            lat: null,
            long: null,
        }
    }

    render() {

        console.log('map render');

        return (
            <div className='map-container'>
                <input ref={(ref) => {this.inputRef = ref}} type="text" className={'map-input'}/>

                <GoogleMap className='map-container'
                    apiKey={this.props.apiKey}
                    center={this.props.center}
                    zoom={this.props.zoom}
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

                <div className='map-marker'>Маркер</div>

                <div className={this.state.isAddressSelect ? 'map-button map-button--active' : 'map-button'} onClick={()=>{
                    this.props.handler(this.inputRef.value, this.position);
                }}>Готово</div>
            </div>
        );
    }
}


export default SimpleMapPage;