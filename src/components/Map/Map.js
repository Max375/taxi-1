import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyC2KMjrNE3GpU8xFnZwwa0_ic5tGjDW2cg",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)((props) =>{

    return (
        <GoogleMap
            defaultZoom={13}
            defaultCenter={{ lat: 53.902122, lng: 27.557701}}
        >
            {<Marker position={{ lat: 53.902122, lng: 27.557701}} onClick={props.onMarkerClick}  />}
        </GoogleMap>
    )
}
);

class MyFancyComponent extends React.PureComponent {
    state = {
        isMarkerShown: false,
    };

    componentDidMount() {
        this.delayedShowMarker()
    }

    delayedShowMarker = () => {
        setTimeout(() => {
            this.setState({ isMarkerShown: true })
        }, 3000)
    };

    handleMarkerClick = () => {
        this.setState({ isMarkerShown: false });
        this.delayedShowMarker()
    };

    render() {
        return (
            <MyMapComponent
                isMarkerShown={this.state.isMarkerShown}
                onMarkerClick={this.handleMarkerClick}
            />
        )
    }
}

export default MyMapComponent;