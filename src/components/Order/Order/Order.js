import React, { Component } from 'react';
import './Order.css';
import HeaderWithMenu from '../../HeaderWithMenu/HeaderWithMenu';
import FooterButton from '../../FooterButton/FooterButton';
import AddressButton from '../AddressButton/AddressButton';
import CarTypeMenu from "../CarTypeMenu/CarTypeMenu";
import PaymentMenu from "../PaymentMenu/PaymentMenu";
import connect from "react-redux/es/connect/connect";
import addOrderWayPointAction from '../../../actions/ordersActions/addOrderWayPointAction'
import removeOrderWayPointAction from '../../../actions/ordersActions/removeOrderWayPointAction'
import changeScreenAction from "../../../actions/changeScreenAction";
import AddressSelect from "../AddressSelect/AddressSelect";
import setOrderStartPointAction from "../../../actions/ordersActions/setOrderStartPointAction";
import setOrderWayPointAction from "../../../actions/ordersActions/setOrderWayPointAction";
import {logStoreState} from "../../../utils";
import setOrderEndPointAction from "../../../actions/ordersActions/setOrderEndPointAction";
import setOrderCommentAction from "../../../actions/ordersActions/setOrderCommentAction";
import Comment from "../Comment/Comment";

class Order extends Component {


    state = {
        isCarTypeMenuOpen: false,
        isOptionsMenuOpen: false,
    };


    openCarTypeMenu = ()=>{
        this.setState({isCarTypeMenuOpen: true});
    };

    closeCarTypeMenu = ()=>{
        this.setState({isCarTypeMenuOpen: false});
    };

    addWayPoint = ()=>{
      this.props.dispatch(addOrderWayPointAction());
    };

    removeWayPoint = ()=>{
        this.props.dispatch(removeOrderWayPointAction());
    };

    changeStartPoint = (data)=>{
        this.props.dispatch(setOrderStartPointAction({location: data.value, address: data.label}));
        logStoreState();
    };


    changeEndPoint = (data)=>{
        this.props.dispatch(setOrderEndPointAction({location: data.value, address: data.label}));
        logStoreState();
    };

    changeWayPoint = (data)=>{
        this.props.dispatch(setOrderWayPointAction({location: data.value, address: data.label}));
        logStoreState();
    };

    changeComment = (comment)=>{
        this.props.dispatch(setOrderCommentAction(comment));
    };


    selectStartPoint = ()=>{
        this.props.dispatch(changeScreenAction(<AddressSelect onChange = {this.changeStartPoint}/>));
    };

    selectEndPoint = ()=>{
        this.props.dispatch(changeScreenAction(<AddressSelect onChange = {this.changeEndPoint}/>));
    };

    selectWayPoint = ()=>{
        this.props.dispatch(changeScreenAction(<AddressSelect onChange = {this.changeWayPoint}/>));
    };

    selectComment = ()=>{
        this.props.dispatch(changeScreenAction(<Comment oldComment={this.props.order.comment} onChange = {this.changeComment}/>));
    };


    render() {
        return (
            <div className="route-payment container">
                <HeaderWithMenu headerTitle={'Заказать такси'} />

                <div className={'route-payment-content'}>
                    <div className={'content-data-button-wrapper'}>
                        <div className={'badge badge-a'} />

                        <AddressButton
                            onClick={this.selectStartPoint}
                            title={'откуда'}
                            mainText={this.props.order.startPoint.address || 'Не выбрано'}
                        />
                        {this.props.order.wayPoint === null && <button className="number-of-route" onClick={this.addWayPoint} />}
                    </div>
                    {
                        this.props.order.wayPoint !== null &&

                        <div className={'content-data-button-wrapper'}>
                            <div className={'badge badge-b'} />
                            <AddressButton
                                onClick={this.selectWayPoint}
                                title={'куда'}
                                mainText={this.props.order.wayPoint.address || 'Не выбрано'}
                            />
                            <button onClick={this.removeWayPoint} className="number-of-route close" />
                        </div>
                    }
                    <div className={'content-data-button-wrapper'}>
                        <div className={'badge badge-b'} />
                        <AddressButton
                            onClick={this.selectEndPoint}
                            title={'куда'}
                            mainText={this.props.order.endPoint.address || 'Не выбрано'}
                        />
                    </div>

                    <div className={'content-data-button-wrapper'}>
                        <div className={'badge pen'} />
                        <AddressButton
                            onClick={this.selectComment}
                            title={'комментарий к заказу'}
                            mainText={this.props.order.comment || ''}
                        />
                    </div>

                    <div className={'content-data-button-wrapper'}>
                        <div className={'badge card'} />
                        <AddressButton title={'способ оплаты'} mainText={'Карта ****6789'}/>
                    </div>


                    <div className="additional-buttons">

                        <button onClick={this.openCarTypeMenu} className={'shadowed-button'}>
                            <div className="shadowed-button-title">класс поездки</div>
                            <div className="shadowed-button-text">Эконом</div>
                        </button>

                        <button className={'shadowed-button'}>
                            <div className="shadowed-button-title">дополнительно</div>
                            <div className="shadowed-button-text">Детское кресло</div>
                        </button>

                    </div>

                </div>

                <footer>
                    <div className="footer-text">Расстояние 25 км</div>
                    <div className="footer-text second">Рекомендуемая стоимость 250 у.е.</div>
                    <div className="price-container">
                        <button className={'button-minus'}>-0.5 Br</button>
                        <div className="calculated-price">11.5 Br</div>
                        <button className={'button-plus'}>+0.5 Br</button>
                    </div>

                </footer>
                <FooterButton nameButton={'заказать'} />

                <CarTypeMenu isVisible = {this.state.isCarTypeMenuOpen} closeMenu={this.closeCarTypeMenu}/>
                <PaymentMenu/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        order: state.order,
        app: state.app
    };
};

export default connect(mapStateToProps)(Order);

