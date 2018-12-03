import React, { Component } from 'react';
import './Expectation.css';
import signHyundaiBig from '../../../assets/img/sign_hyundai_big.png';
import {carModelCheck, collapseSection, customConsole, expandSection} from "../../../utils";
import {getDriverLocation, getUserInfo, sendTimeToDriver} from "../../../fetch/fetch";
import setDriverLocationAction from "../../../actions/driverActions/setDriverLocationAction";
import {doSync, setUserInfo} from "../../../secondary";
import changeScreenAction from "../../../actions/changeScreenAction";
import Login from "../../Authorization/Login/Login";
import clearTokenAction from "../../../actions/clearTokenAction";
import connect from "react-redux/es/connect/connect";


/*

<div className={'ordered-car-info'}>
    <div className={'ordered-car-info__top-row'}>
        <div className={'top-row__left-coll'}>
            {carModelCheck(this.props.driver.car.model)}
            <div className={'year-of-manufacture'}>{this.props.driver.car.year} г.в.</div>
        </div>
        <div className={'top-row__right-coll'}>
            <div className={'model-color-flex-wrapper'}>
                Время: {(this.state.time/60).toFixed(0)} : {this.state.time%60}
                <div className={'right-coll__car-model'}>{this.props.driver.car.version}</div>
                <div  style={{backgroundColor: this.props.driver.car.colorCode}} className={'right-coll__car-color'}>{this.props.driver.car.color}</div>
            </div>
            <div className={'right-coll__car-rating'}>
                <div className="little-star"></div>
                <div className="right-coll__car-point">{this.props.driver.rating}</div>
            </div>

            <div className="arrival-time">
                Будет через: <span>{} мин.</span>
            </div>
        </div>
    </div>
    <div className={'ordered-car-info__bottom-row'}>
        <a className={'button-call'} href={`tel:+${this.props.driver.phone}`}>позвонить</a>
        <button onClick={this.openMenuCancel} className={'button-cancel'}>отменить</button>
    </div>
</div>


 */


class Expectation extends React.Component {

    interval = null;
    timer = null;
    buttons = null;

    state = {
        time: 0,
        isUserAnswered: null
    };

    tick = () => {
        this.setState({time: this.state.time+1});
    };


    updateDriverLocation =()=>{
        getDriverLocation(this.props.user.token)
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

                if(this.state.time < parseInt(data.last_modification)-10 || this.state.time > parseInt(data.last_modification)+10){

                    this.setState({time: parseInt(data.last_modification)})
                }
                if(this.state.isUserAnswered === null){
                    this.setState({isUserAnswered: Boolean(parseInt(data.is_user_answer))});
                }

            })
            .catch(()=>{

            })
    };


    componentDidMount(){
        this.setState({
            time: 0
        });

        this.interval = setInterval(this.updateDriverLocation, 1000);
        this.timer = setInterval(this.tick, 1000);
    }

    componentWillUnmount(){
        clearInterval(this.interval);
        clearInterval(this.timer);
    }

    componentDidUpdate(prevProps, prevState,){

        if(prevState.isUserAnswered !== this.state.isUserAnswered){
            if(this.state.isUserAnswered){
                collapseSection(this.buttons);
            }
            else{
                expandSection(this.buttons);
            }
        }
    }


    render() {
        return (
            <div className={'expectation'}>
                <div className={'expectation__top-row'}>
                    <div className={'top-row__left-coll'}>
                        {carModelCheck(this.props.driver.car.model)}
                        <div className={'year-of-manufacture'}>{this.props.driver.car.year} г.в.</div>
                    </div>
                    <div className={'top-row__right-coll'}>
                        <div className={'waiting-time-wrapper'}>
                            <div className={'expecting-time'}>Вас ожидает</div>
                            <div className="expecting-time-value">{Math.floor((this.state.time/60)).toString().padStart(2,0)}:{(this.state.time%60).toString().padStart(2,0)}</div>
                        </div>
                        <div className={'model-color-flex-wrapper'}>
                            <div className={'right-coll__car-model'}>{this.props.carModel}</div>
                            <div style={{backgroundColor: this.props.driver.car.colorCode}} className={'right-coll__car-color'}>{this.props.driver.car.color}</div>
                        </div>
                        <div className="rating-number-wrapper">
                            <div className={'right-coll__car-rating'}>
                                <div className="little-star"></div>
                                <div className="right-coll__car-point">{this.props.driver.rating}</div>
                            </div>
                            <div className="state-number">{this.props.driver.car.carNumber}</div>
                        </div>
                    </div>
                </div>

                <div ref={el=>{this.buttons = el;}} className="buttons-time-left">
                    <button onClick={()=>{
                        sendTimeToDriver(0,this.props.user.token).then((data)=>{
                        });
                        this.setState({isUserAnswered: true});
                    }}>Уже выхожу</button>
                    <button onClick={()=>{
                        sendTimeToDriver(1,this.props.user.token).then((data)=>{
                        });
                        this.setState({isUserAnswered: true});
                    }}>1 минута</button>
                    <button onClick={()=>{
                        sendTimeToDriver(3,this.props.user.token).then((data)=>{
                        });
                        this.setState({isUserAnswered: true});
                    }}>3 минуты</button>
                    <button onClick={()=>{
                        sendTimeToDriver(5,this.props.user.token).then((data)=>{
                        });
                        this.setState({isUserAnswered: true});
                    }}>5 минут</button>
                </div>


                <div className={'expectation__bottom-row'}>
                    <a href={`tel:+${this.props.driver.phone}`} className={'button-call'}>позвонить</a>
                    <button onClick={this.props.openMenu} className={'button-cancel'}>отменить</button>
                </div>
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

export default connect(mapStateToProps)(Expectation);
