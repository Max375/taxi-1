import React , {Component} from 'react';

import './DriverWait.css';
import connect from "react-redux/es/connect/connect";
import OrderedCarInfo from '../OrderedCarInfo/OrderedCarInfo'
import HeaderWithMenu from "../../HeaderWithMenu/HeaderWithMenu";
import WaitMap from '../Maps/WaitMap'
import {getDriverWaitInfo, getUserInfo} from '../../../fetch/fetch'
import setDriverLocationAction from "../../../actions/driverActions/setDriverLocationAction";
import CancelOrderMenu from '../CancelOrderMenu/CancelOrderMenu';
import {doSync, setUserInfo, store} from "../../../secondary";
import {carModelCheck, customConsole, getDistanceBetweenToPoints} from "../../../utils";
import changeScreenAction from "../../../actions/changeScreenAction";
import Login from "../../Authorization/Login/Login";
import clearTokenAction from "../../../actions/clearTokenAction";

class DriverRoad extends Component{

    state = {
        isCancelOrderMenuOpen: false,
        interval: null,
    };

    closeMenuCancel = () =>{
        this.setState({
            isCancelOrderMenuOpen: false
        });
    };


    openMenuCancel = () => {
        this.setState({
            isCancelOrderMenuOpen: true
        });
    };


    updateDriverLocation =()=>{
        getDriverWaitInfo(this.props.user.token)
            .then(data=>{
                console.log(data);
                this.props.dispatch(setDriverLocationAction(data.location));


                if(parseInt(data.status) !== 4){
                    getUserInfo(this.props.user.token)
                        .then(data => {
                            setUserInfo(data);
                            doSync();
                        })
                        .catch(err => {
                            customConsole.error(err);
                            this.props.dispatch(changeScreenAction(<Login />));
                            this.props.dispatch(clearTokenAction());
                        });
                }
            })
            .catch(()=>{

            })
    };


    componentDidMount(){
        this.setState({interval : setInterval(this.updateDriverLocation, 1000)});
    }

    componentWillUnmount(){
        clearInterval(this.state.interval);
    }


    render(){
        let time = 0;

        try{
            time = getDistanceBetweenToPoints(this.props.driver.location,this.props.order.startPoint.value)*2;
            if (time <= 1) time = 1;
        }
        catch (e) {
            time = 5;
        }

        return(
            <div className="waiting-for-taxi container">
                <HeaderWithMenu headerTitle={'Ожидание такси'}/>
                <div className="calc-content without-footer container-with-bg-map">
                    <WaitMap location={this.props.driver !== null && this.props.driver.location}/>
                    <div className={'ordered-car-info'}>
                        <div className={'ordered-car-info__top-row'}>
                            <div className={'top-row__left-coll'}>
                                {carModelCheck(this.props.driver.car.model)}
                                <div className={'year-of-manufacture'}>{this.props.driver.car.year} г.в.</div>
                            </div>
                            <div className={'top-row__right-coll'}>
                                <div className={'model-color-flex-wrapper'}>
                                    <div className={'right-coll__car-model'}>{this.props.driver.car.version}</div>
                                    <div  style={{backgroundColor: this.props.driver.car.colorCode}} className={'right-coll__car-color'}>{this.props.driver.car.color}</div>
                                </div>
                                <div className={'right-coll__car-rating'}>
                                    <div className="little-star"></div>
                                    <div className="right-coll__car-point">{this.props.driver.rating}</div>
                                </div>

                                <div className="arrival-time">
                                    Будет через: <span>{time} мин.</span>
                                </div>
                            </div>
                        </div>
                        <div className={'ordered-car-info__bottom-row'}>
                            <a className={'button-call'} href={`tel:+${this.props.driver.phone}`}>позвонить</a>
                            <button onClick={this.openMenuCancel} className={'button-cancel'}>отменить</button>
                        </div>
                    </div>
                </div>
                <CancelOrderMenu token={this.props.user.token} closeMenu={this.closeMenuCancel} isVisible={this.state.isCancelOrderMenuOpen} />
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.user,
        order: state.order,
        driver: state.driver
    };
};

export default connect(mapStateToProps)(DriverRoad);