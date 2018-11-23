import React, { Component } from 'react';
import Point from '../FavoritePoint/FavoritePoint';
import connect from "react-redux/es/connect/connect";
import TopBar from "../../TopBar/TopBar";



class FavoritePoints extends Component {

    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div>
                <TopBar/>
                {this.props.favoritePoints.points.map(el => <Point props={el} />)}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        favoritePoints: state.favoritePoints
    };
};


export default connect(mapStateToProps)(FavoritePoints);