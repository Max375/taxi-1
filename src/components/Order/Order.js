import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import {getDistance} from '../../fetch/fetch'

import './Order.css';
import Menu from '../Menu/Menu';

import OrderInput from '../OrderInput/OrderInput'
import TopBar from "../TopBar/TopBar";
import Case from '../../assets/img/case.png'
import Cat from '../../assets/img/pet.png'
import Girl from '../../assets/img/girl.png'

import setOrderStartPoint from '../../actions/setOrderStartPoint';
import setOrderEndPoint from '../../actions/setOrderEndPoint';

import changeScreenAction from "../../actions/changeScreenAction";
import Load from '../Load/Load';

import Map from '../Map/Map';


import OrderOptions from '../OrderOptions/OrderOptions'


class Order extends Component {

    state = {
        isMenuVisible: false,
        price: 0,
        userPrice: 0,
        length: 0,
        isChangePriceActive: false,
        isMapVisible: false,
        endNumber: 1,
        handleFunction: null,
        endPointsSelectOptions: [null],
        startPointSelectOption: null,
        isAddPointButtonActive: false,
        currentSelect: null,
        isOrderOptionsMenuVisible: false
    };


    mapHandler = null;


    startPointHandler =  (text,position) => {
        this.setState({
            startPointSelectOption:  {
                value: position,
                label: text
            },
            isMapVisible: false,
        });
        this.UpdateDistance()
    };


    endPointHandler = (text,position) =>{
        let _endPoints = this.state.endPointsSelectOptions;
        _endPoints[this.state.currentSelect] = {
            value: position,
            label: text
        };

        this.setState({
            endPointsSelectOptions: _endPoints,
            currentSelect: null,
            isMapVisible: false,
        });
        this.UpdateDistance()
    };


    constructor(props) {
            super(props);
    }

    onChangeSelectStartPoint = (optionSelected,action) => {
        if (optionSelected!=null && optionSelected.value === 'map'){
            this.setState({
                isMapVisible: true,
            });
            this.mapHandler = this.startPointHandler;
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

    UpdateDistance(){
        if (this.state.endPointsSelectOptions.find( el => el!==null) !== undefined && this.state.startPointSelectOption!=null){
            let _endPoints = this.state.endPointsSelectOptions;
            _endPoints = _endPoints.map( value => {
                if (value!=null) return {'street': value.label};
            });
            console.log(_endPoints);
            const data = {
                "start_point": {
                    "street": this.state.startPointSelectOption.label,
                },
                "end_points": _endPoints
            };
            getDistance(data).then(resp => resp.json())
                .then(data => {
                    console.log(data,'data');
                    this.setState({
                        price: data.distance.price,
                        length: data.distance.length/1000,
                        isChangePriceActive: true,
                        userPrice: data.distance.price
                    });
                })
        }
    }



        render(){



            let endPoints = [];

            for (let i = 0; i< this.state.endNumber; ++i){
                console.log(this.state.endPointsSelectOptions[i]);
                endPoints.push(
                    <div className="order-wp">
                        <OrderInput key = {i} id = {i} onChangeCallback = {this.onChangeSelectEndPoint} token = {this.props.token} defaultValue = {this.state.endPointsSelectOptions[i]}/>
                    </div>)
            }

            console.log('state', this.state);
            return(
            <div>
                <div>

                    <TopBar/>
                    <OrderOptions isVisible={this.state.isOrderOptionsMenuVisible} />

                    <div className='order-wp'>
                        <OrderInput onChangeCallback = {this.onChangeSelectStartPoint}  token = {this.props.token} defaultValue = {this.state.startPointSelectOption} />
                        <input className="order-wp entrance" type="text" placeholder="Подъезд" />
                    </div>


                    <button
                        onClick={() => {
                            this.setState({endNumber: ++this.state.endNumber});
                        }}

                        className="plus-dot"
                    >
                        + Добавить точку
                    </button>

                        {endPoints}



                    <textarea className="comment-text" placeholder="Комментарий к заказу"></textarea>
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
                        <div className="price-count">{(this.state.isChangePriceActive) ? this.state.length + 'км' : '--'}<span>{(this.state.isChangePriceActive) ? this.state.price + 'р' : '--'}</span></div>
                    </div>

                    <div className={(this.state.isChangePriceActive) ? 'numbers numbers-active' : 'numbers'}>
                        <button className="minus" onClick={ ()=>{this.setState({userPrice: --this.state.userPrice}) } }>-1
                        </button>
                        <div className="count"><span>{(this.state.isChangePriceActive) ? this.state.userPrice : '0'} р</span></div>
                        <button className="plus" onClick={ ()=>{this.setState({userPrice: ++this.state.userPrice})} }>+1
                        </button>
                    </div>

                    <button className="to-order" onClick={()=>{ if (this.state.isChangePriceActive) this.props.dispatch(changeScreenAction(
                        <Load />))} } > Заказать
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