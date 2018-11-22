import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getDistance, createOrder, HTTP_STATUS_OK, addressAutocomplete} from '../../../fetch/fetch'


import TopBar from "../../TopBar/TopBar";

import setOrderEndPointAction from '../../../actions/ordersActions/setOrderEndPointAction';
import setOrderPriceAction from '../../../actions/ordersActions/setOrderPriceAction';
import setOrderEntranceAction from '../../../actions/ordersActions/setOrderEntranceAction';
import setOrderCommentAction from '../../../actions/ordersActions/setOrderCommentAction';
import addOrderEndPointAction from '../../../actions/ordersActions/setOrderStartPointAction'
import setOrderStartPointAction from '../../../actions/ordersActions/setOrderStartPointAction'
import setOrderAction from '../../../actions/ordersActions/setOrderAction'
import Select from '../Select/Select'

import Map from '../../Order/OrderMap/OrderMap';


import OrderOptions from '../OrderOptions/OrderOptions'
import {customConsole, logStoreState, throttle, convertOrderInfoFromBackEnd} from "../../../utils";
import {doSync} from "../../../secondary";

const PRICE_STAP = 0.5;


class Order extends Component {

    state = {
        isMenuVisible: false,
        isMapVisible: false,
        orderDistance: null,
        recommendedPrice: null,
        isDistanceUpdated: false
    };


    mapHandler = null;


    /*
    startPointHandler =  (text,position) => {
        this.props.dispatch(setOrderStartPoint({
            value: position,
            label: text
        }));

        this.setState({
            isMapVisible: false,
        });

        this.UpdateDistance()
    };
     */


    /*
    endPointHandler = (text,position) =>{
        let _endPoints = this.props.order.endPoints;


        _endPoints[this.state.currentSelect] = {
            value: position,
            label: text
        };

        this.setState({
            currentSelect: null,
            isMapVisible: false,
        });

        this.props.dispatch(setOrderEndPoint(_endPoints));

        this.UpdateDistance()
    };
     */


    constructor(props) {
            super(props);
    }

    /*
    onChangeSelectStartPoint = (optionSelected,action) => {
        console.log(action,optionSelected);

        if (optionSelected!=null){
            switch (optionSelected.value) {
                case 'map':{
                    this.setState({
                        isMapVisible: true,
                    });
                    this.mapHandler = this.startPointHandler;
                    break;
                }
                case null:{
                    const geocoder = new window.google.maps.Geocoder;
                    geocoder.geocode({
                            'address': optionSelected.label
                        },
                        (results,status) => {
                            if(status === 'OK'){
                                this.props.dispatch(setOrderStartPoint({
                                    value: {
                                        lat: results[0].geometry.location.lat(),
                                        long: results[0].geometry.location.lng(),
                                    },
                                    label: optionSelected.label
                                }));
                            }
                        }
                    );
                }
            }
        }

    };
     */


    /*
    onChangeSelectEndPoint = (optionSelected,action,id) => {
        if (optionSelected.value === 'map'){
            this.setState({
                isMapVisible: true,
                currentSelect: id,
            });
            this.mapHandler = this.endPointHandler;
        }
    };
     */


    componentDidMount(){
        //this.UpdateDistance(false);
    }

    /*
    UpdateDistance(isUpdate = true){
                if (this.props.order.endPoints.find( el => el!==null) !== undefined && this.props.order.startPoint!=null){

                    this.setState({
                        recommendedPrice: 0,
                        length: 0,
                    });

                    let _endPoints = this.props.order.endPoints;

                    _endPoints = _endPoints.map( value => {
                         if (value!=null) return {'street': value.label};
                    });

                    const data = {
                        "start_point": {
                            "street": this.props.order.startPoint.label,
                        },
                        "end_points": _endPoints
                    };


                    getDistance(data,this.props.user.token,this.props.user.deviceId).then((resp) => {
                        if (resp.status === HTTP_STATUS_OK) return resp.json();
                        else return null
                    }).then(data => {
                            if (data!=null){
                                this.setState({
                                    recommendedPrice: (Math.ceil(data.distance.price*2)/2),
                                    length: data.distance.length,
                                });
                                if (isUpdate) this.props.dispatch(setOrderPrice((Math.ceil(data.distance.price*2)/2)));
                            }
                        })
        }
    }
     */


    UpdateDistance(){
            if (this.isPointSelected()) {
                this.setState({isDistanceUpdated: false});
                getDistance(this.props.order.startPoint.address, this.props.order.endPoints.map((el)=> el.address), this.props.user.token)
                    .then(data => {

                        let newState = {
                            recommendedPrice: (Math.ceil(data.distance.price*2)/2),
                            orderDistance: data.distance.length,
                            isDistanceUpdated: true
                        };

                        if (newState.recommendedPrice < this.props.app.minimalPrice) newState.recommendedPrice = this.props.app.minimalPrice;


                        this.setState(newState);
                        this.props.dispatch(setOrderPriceAction(newState.recommendedPrice));
                    })
                    .catch(e =>{
                        customConsole.error(e);
                    })
            }
        }


    autoComplete = throttle((inputValue,callback)=>{
        addressAutocomplete(inputValue)
            .then((data)=>{
                if (data.status !== "OK") throw {message: "Response is empty", status: 404};
                let points = Array.from(data.predictions).map(el=>{
                    if (el.structured_formatting.secondary_text.indexOf("Minsk, Belarus")) return undefined;
                    return {
                        value: el.structured_formatting.main_text,
                        label: el.structured_formatting.main_text,
                        geocode: true
                    }
                });
                points = points.filter(point => point !== undefined);
                callback(points);
             })
            .catch(e=>{
                customConsole.error(e);
                callback([]);
            });
    },400);


    openMap(handler){
        this.mapHandler = handler;
        this.setState({isMapVisible: true});
    }

    closeMap(){
        this.mapHandler = null;
        this.setState({isMapVisible: false});
    }

    changeStartPoint = (e)=>{
        if (e.data.label === 'map') this.openMap(this.changeStartPoint);
        else {
            this.props.dispatch(setOrderStartPointAction({location: e.data.value, address: e.data.label}));
            this.UpdateDistance();
            this.closeMap();
        }
        logStoreState();
    };


    addEndPoint = ()=>{
        this.props.dispatch(addOrderEndPointAction());
    };


    changeEndPoint = (index) => {
        return (e)=>{
            console.log(e);
            if (e.data.value === 'map') this.openMap(this.changeEndPoint(index));
            else {
                this.props.dispatch(setOrderEndPointAction({location: e.data.value, address: e.data.label},index));
                this.UpdateDistance();
                this.closeMap();
            }
            logStoreState();
        }
    };



    setEntrance = (e)=>{
        const entrance = parseInt(e.target.value,10);
        this.props.dispatch(setOrderEntranceAction(entrance));
    };


    setComment = (e)=>{
        this.props.dispatch(setOrderCommentAction(e.target.value));
    };


    generateEndPointsSelects = ()=>{
        
        let selects =  [];
        
        for (let i = 0; i < this.props.order.endPoints.length;  i++){

            selects.push(<Select
                options = {[]}
                onChange = {this.changeEndPoint(i)}
                constOptions = {[{value: 'map',label: 'map', geocode: false}]}
                defaultOption={{label: this.props.order.endPoints[i].address, value: this.props.order.endPoints[i].location}}
                loadOptions={this.autoComplete}
            />)
        }

        return selects;
    };

    isPointSelected = () => {

        let isEndpointsNull = true;

        for (let i=0; i < this.props.order.endPoints.length; i++){

            if (this.props.order.endPoints[i].location === null || this.props.order.endPoints[i].address === null){
                isEndpointsNull = false;
                break;
            }
        }

        logStoreState();

        customConsole.log('Start point is selected',this.props.order.startPoint.location!=null);
        customConsole.log('End points is selected', isEndpointsNull);


        if (this.props.order.startPoint.location === null || !isEndpointsNull) return false;

        return true;
    };

    reducePrice = ()=>{
        if (this.checkAvailableIncreasePrice()){
            this.props.dispatch(setOrderPriceAction(this.props.order.price - PRICE_STAP));
        }
    };

    checkAvailableIncreasePrice = () => this.props.app.minimalPrice<=this.props.order.price - PRICE_STAP;

    increasePrice = ()=>{
        this.props.dispatch(setOrderPriceAction(this.props.order.price + PRICE_STAP));
    };

    createOrder = ()=>{
        if (this.isPointSelected()){
                createOrder(this.props.order.startPoint,this.props.order.endPoints,this.props.order.price, this.props.order.options, this.props.order.comment ,this.props.order.entrance, this.props.user.token, this.props.user.deviceId)
                    .then(data =>{
                        this.props.dispatch(setOrderAction(convertOrderInfoFromBackEnd(data.order)));
                        doSync();
                    }).catch((e)=>{
                        customConsole.error('create order failed', e);
                    });
        }
    };

    render(){
            const isPointSelected = this.isPointSelected();

            return(
            <div>
                <div>

                    <TopBar/>
                    <OrderOptions options={this.options} isVisible={this.state.isOrderOptionsMenuVisible}  clickHandler={()=>{this.setState({isOrderOptionsMenuVisible: false})}} />

                    <div className='order-wp'>

                        <Select
                            options = {[]}
                            onChange = {this.changeStartPoint}
                            constOptions = {[{value: 'map',label: 'map', geocode: false}]}
                            defaultOption={{label: this.props.order.startPoint.address, value: this.props.order.startPoint.location}}
                            loadOptions={this.autoComplete}
                        />

                        <input  onChange={this.setEntrance} value={this.props.order.entrance || ''}  className="order-wp entrance" type="number" placeholder="Подъезд" />
                    </div>



                    <button
                        onClick={this.addEndPoint}
                        className={this.props.order.endPoints.length < 4 ? "plus-dot" : "plus-dot plus-dot-invisible" }
                    >
                        + Добавить точку
                    </button>

                    {this.generateEndPointsSelects()}


                    <textarea onChange={this.setComment} className="comment-text" placeholder="Комментарий к заказу" value={this.props.order.comment || ''} />

                    <div className="btn-wp">
                        <button className="order-econom">
                            Эконом <img  alt=""/>
                        </button>

                        <button onClick={()=>{this.setState({isOrderOptionsMenuVisible: true})}} class="dop-services">
                            <span>Доп. услуги</span>
                        </button>
                    </div>



                    <div className="price">
                        Расстояние / рекомендуемая стоимость
                        <div className="price-count">{(this.state.recommendedPrice === null && !this.state.isDistanceUpdated ) ? '--': this.state.recommendedPrice + 'р'}<span>{(this.state.orderDistance === null && !this.state.isDistanceUpdated) ? '--': this.state.orderDistance + 'км'}</span></div>
                    </div>


                    <div className={'numbers'}>
                        <button className={isPointSelected && this.checkAvailableIncreasePrice() && this.state.isDistanceUpdated ? 'minus minus-active ' : 'minus'} onClick={this.reducePrice}>-0.5</button>
                        <div className="count"><span>{isPointSelected && this.state.isDistanceUpdated ? this.props.order.price + 'р' : '0р'}</span></div>
                        <button className={isPointSelected && this.state.isDistanceUpdated? 'plus plus-active ' : 'plus'} onClick={ this.increasePrice }>+0.5
                        </button>
                    </div>

                    <button className="to-order" onClick={this.createOrder}> Заказать</button>
                </div>


                {this.state.isMapVisible && <Map addressSelect={this.mapHandler} />}

            </div>
            )
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.user,
        order: state.order,
        app: state.app
    };
};

