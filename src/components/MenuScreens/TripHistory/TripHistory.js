import React, { Component } from 'react';
import './TripHistory.css';
import HeaderTypeOne from '../../HeaderBack/HeaderBack';
import connect from "react-redux/es/connect/connect";
import {getRacesHistory} from '../../../fetch/fetch'
import Trip from '../Trip/Trip';
import {customConsole, throttle} from "../../../utils";

class TripHistory  extends Component {

    state = {
        history: [],
        page: 0,
    };

    tripHistory = null;

    scrollHandler = throttle((e)=>{
        console.log(window.innerHeight - e.target.scrollTop);
    },300);

    componentDidMount(){
        getRacesHistory(this.state.page, this.props.user.token)
            .then(data=>{
                this.setState({
                    history: this.state.history.concat(data.history),
                    page: ++this.state.page
                })
            })
            .catch((err)=>{
                customConsole.log(err);
            });
        this.tripHistory.addEventListener('scroll',this.scrollHandler);
    }

    componentWillUnmount(){
        this.tripHistory.removeEventListener('scroll',this.scrollHandler);
    }

    render(){
        return(
            <div ref={el=>{this.tripHistory = el}} className={'trip-history container'}>
                <HeaderTypeOne headerTitle={'История поездок'}/>
                <div className="calc-content without-footer">
                    {this.state.history.map(el=><Trip key={el.id} info={el} />)}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps)(TripHistory);
