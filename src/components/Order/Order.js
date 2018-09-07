import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import {getDistance, createOrder, HTTP_STATUS_OK} from '../../fetch/fetch'

import './Order.css';
import Menu from '../Menu/Menu';

import OrderInput from '../OrderInput/OrderInput'
import TopBar from "../TopBar/TopBar";
import Case from '../../assets/img/case.png'
import Cat from '../../assets/img/pet.png'
import Girl from '../../assets/img/girl.png'

import setOrderStartPoint from '../../actions/setOrderStartPoint';
import setOrderEndPoint from '../../actions/setOrderEndPoints';
import setOrderPrice from '../../actions/setOrderPrice';
import changeScreenAction from "../../actions/changeScreenAction";
import setOrderEntranceAction from '../../actions/setOrderEntranceAction';
import setOrderCommentAction from '../../actions/setOrderCommentAction';
import Load from '../Load/Load';

import Map from '../Map/Map';


import OrderOptions from '../OrderOptions/OrderOptions'
import SearchDriver from "../SearchDriver/SearchDriver";


class Order extends Component {

    state = {
        isMenuVisible: false,
        length: 0,
        isMapVisible: false,
        handleFunction: null,
        isAddPointButtonActive: false,
        currentSelect: null,
        recommendedPrice: 0,
        isOrderOptionsMenuVisible: false
    };


    mapHandler = null;



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


    endPointHandler = (text,position) =>{
        let _endPoints = this.props.order.endPoints;

        console.log(_endPoints,'sa');

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


    constructor(props) {
            super(props);
        this.refsInputs = {
            entrance: null,
            comment: null
        };
    }

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
                                        lng: results[0].geometry.location.lng(),
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


    onChangeSelectEndPoint = (optionSelected,action,id) => {
        if (optionSelected.value === 'map'){
            this.setState({
                isMapVisible: true,
                currentSelect: id,
            });
            this.mapHandler = this.endPointHandler;
        }
    };

    componentDidMount(){
        this.UpdateDistance(false);
    }

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
                                    recommendedPrice: data.distance.price,
                                    length: data.distance.length/1000,
                                });
                                if (isUpdate) this.props.dispatch(setOrderPrice(data.distance.price));
                            }
                        })
        }
    }



        render(){

            console.log(this.props.order.endPoints.indexOf(null) === -1 && this.props.order.startPoint !== null);

            let endPoints = [];
            for (let i = 0; i < this.props.order.endPoints.length; ++i){
                endPoints.push(
                    <div className="order-wp">
                        <OrderInput key = {i} id = {i} onChangeCallback = {this.onChangeSelectEndPoint} token = {this.props.token} defaultValue = {this.props.order.endPoints[i]} />
                    </div>
                )
            }


            return(
            <div>
                <div>

                    <TopBar/>
                    <OrderOptions isVisible={this.state.isOrderOptionsMenuVisible}  clickHandler={()=>{this.setState({isOrderOptionsMenuVisible: false})}} />

                    <div className='order-wp'>
                        <OrderInput onChangeCallback = {this.onChangeSelectStartPoint}  token = {this.props.token} defaultValue={this.props.order.startPoint} />
                        <input onChange={(e)=>{this.props.dispatch(setOrderEntranceAction(e.target.value))}} value={this.props.order.entrance} className="order-wp entrance" type="text" placeholder="Подъезд" />
                    </div>


                    <button
                        onClick={() => {
                            console.log(this.props.order.endPoints.length);
                            this.props.dispatch(setOrderEndPoint([...this.props.order.endPoints, null]));
                        }}

                        className={this.props.order.endPoints.length < 4 ? "plus-dot" : "plus-dot plus-dot-invisible" }
                    >
                        + Добавить точку
                    </button>

                        {endPoints}

                    <textarea onChange={(e)=>{this.props.dispatch(setOrderCommentAction(e.target.value))}} value={this.props.order.comment} className="comment-text" placeholder="Комментарий к заказу"></textarea>
                    <div className="btn-wp">
                        <button className="order-econom">
                            Эконом <img src={Case} alt=""/>
                        </button>

                        <button onClick={()=>{this.setState({isOrderOptionsMenuVisible: true})}} className="dop-services">
                            <span>Доп. услуги</span><img src={Cat} alt=""/><img src={Girl} alt=""/>
                        </button>
                    </div>



                    <Select
                        isSearchable={false}
                        defaultValue={{ value: 'money', label: 'Наличными' }}
                        options={[{ value: 'card', label: 'Картой' },
                        { value: 'money', label: 'Наличными' }]}
                        className="pay-type"
                        classNamePrefix="select"
                    />

                    <div className="price">
                        Расстояние / рекомендуемая стоимость
                        <div className="price-count">{(this.props.order.endPoints.indexOf(null) === -1 && this.props.order.startPoint !== null && this.state.recommendedPrice !== 0) ? this.state.length + 'км' : '--'}<span>{(this.props.order.endPoints.indexOf(null) === -1 && this.props.order.startPoint !== null && this.state.recommendedPrice !== 0) ? this.state.recommendedPrice + 'р' : '--'}</span></div>
                    </div>

                    <div className={(this.props.order.endPoints.indexOf(null) === -1 && this.props.order.startPoint !== null && this.state.recommendedPrice !== 0) ? 'numbers numbers-active' : 'numbers'}>
                        <button className="minus" onClick={ ()=>{this.props.dispatch(setOrderPrice(--this.props.order.price )) } }>-1
                        </button>
                        <div className="count"><span>{(this.props.order.endPoints.indexOf(null) === -1 && this.props.order.startPoint !== null && this.state.recommendedPrice !== 0) ? this.props.order.price + 'р' : '0р'}</span></div>
                        <button className="plus" onClick={ ()=>{ this.props.dispatch(setOrderPrice(++this.props.order.price )) } }>+1
                        </button>
                    </div>

                    <button className="to-order" onClick={()=>{
                        if (this.props.order.endPoints.indexOf(null) === -1 && this.props.order.startPoint !== null && this.state.recommendedPrice !== 0){
                            createOrder(this.props.order.startPoint.value,this.props.order.startPoint.label,this.props.order.endPoints.map(point => point.value),this.props.order.endPoints.map(point => point.label),this.props.order.price, {},this.props.user.token, this.props.user.deviceId)
                                .then(res =>{
                                    if (res) this.props.dispatch(changeScreenAction(<SearchDriver dispatch={this.props.dispatch} token={this.props.user.token} deviceId={this.props.user.deviceId} />));
                                    else{
                                        console.log('CREATE ORDER FAILED');
                                    }
                                });
                        }
                    } } > Заказать
                    </button>
                </div>


                {this.state.isMapVisible && <Map handler={this.mapHandler} />}


            </div>

                )
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.user,
        order: state.order,
    };
};

export default connect(mapStateToProps)(Order);