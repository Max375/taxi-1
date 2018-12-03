import React, { Component } from 'react';
import './Order.css';
import HeaderWithMenu from '../../HeaderWithMenu/HeaderWithMenu';
import FooterButton from '../../FooterButton/FooterButton';
import AddressButton from '../AddressButton/AddressButton';
import CarTypeMenu from "../CarTypeMenu/CarTypeMenu";
import connect from "react-redux/es/connect/connect";
import addOrderWayPointAction from '../../../actions/ordersActions/addOrderWayPointAction'
import removeOrderWayPointAction from '../../../actions/ordersActions/removeOrderWayPointAction'
import changeScreenAction from "../../../actions/changeScreenAction";
import AddressSelect from "../AddressSelect/AddressSelect";
import setOrderStartPointAction from "../../../actions/ordersActions/setOrderStartPointAction";
import setOrderWayPointAction from "../../../actions/ordersActions/setOrderWayPointAction";
import {
    customConsole,
    logStoreState,
    collapseSection,
    expandSection,
    PRICE_STAP,
    convertOrderInfoFromBackEnd
} from "../../../utils";
import setOrderEndPointAction from "../../../actions/ordersActions/setOrderEndPointAction";
import setOrderCommentAction from "../../../actions/ordersActions/setOrderCommentAction";
import OrderOptions from '../OrderOptions/OrderOptions'
import Comment from "../Comment/Comment";
import {getDistance, createOrder} from "../../../fetch/fetch";
import setOrderPriceAction from "../../../actions/ordersActions/setOrderPriceAction";
import PaymentMenu from "../PaymentMenu/PaymentMenu";
import cards from "../../../reducers/cardsReducer";
import setOrderAction from "../../../actions/ordersActions/setOrderAction";
import {doSync} from "../../../secondary";


class Order extends Component {


    state = {
        isButtonLoading: false,
        isCarTypeMenuOpen: false,
        isOptionsMenuOpen: false,
        isPaymentMenuOpen: false,
        recommendedPrice: null,
        orderDistance: null,
        price: 0,
        distance: 0,
        duration: 0,
    };

    footer = null;


    openCarTypeMenu = ()=>{
        this.setState({isCarTypeMenuOpen: true});
    };

    closeCarTypeMenu = ()=>{
        this.setState({isCarTypeMenuOpen: false});
    };


    openOptionsMenu = ()=>{
        this.setState({isOptionsMenuOpen: true});
    };


    closeOptionsMenu = ()=>{
        this.setState({isOptionsMenuOpen: false});
    };


    closePaymentMenu = ()=>{
        this.setState({isPaymentMenuOpen: false});
    };


    openPaymentMenu = ()=>{
        this.setState({isPaymentMenuOpen: true});
    };

    addWayPoint = ()=>{
      this.props.dispatch(addOrderWayPointAction());
      customConsole.log('addWayPoint');
      logStoreState();
    };

    removeWayPoint = ()=>{
        this.props.dispatch(removeOrderWayPointAction());
        customConsole.log('removeWayPoint');
        logStoreState();
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

    additionalOptionShow =()=>{

        for (let prop in this.props.order.options) {
            if (this.props.order.options[prop] === 1 && prop !== 'carType'){
                switch (prop) {
                    case 'english':
                        return 'Англоговорящий водитель';
                    case 'ads':
                        return 'Авто без рекламы';
                    case 'gender':
                        return 'Девушка водитель';
                    case 'baggage':
                        return 'Багаж';
                    case 'dogPlace':
                        return 'Перевозка животного';
                    case 'smoking':
                        return 'Не курящий водитель';
                    case 'babySeat':
                        return 'Детское кресло';
                    default:
                        return '';
                }
            }
        }
    };

    typeCarShow = ()=>{
        switch (this.props.order.options.carType) {
            case 1:
                return 'Эконом';
            case 2:
                return 'Комфорт';
            case 4:
                return 'Минивен';
        }
    };


    isPointsSelected = () => {
        if (this.props.order.endPoint.location !== null && this.props.order.startPoint.location !==null){
            if (this.props.order.wayPoint === null) return true;
            else{
                return this.props.order.wayPoint.location !== null;
            }
        }
        else return false;
    };


    componentDidMount(){
        this.UpdateDistance();
    }

    componentDidUpdate(prevProps, prevState, snapshot){
       if (prevProps.order.endPoint !== this.props.order.endPoint || prevProps.order.wayPoint !== this.props.order.wayPoint || prevProps.order.startPoint !== this.props.order.startPoint){
            this.UpdateDistance();
       }
    }

    UpdateDistance(){
        collapseSection(this.footer);
            if (this.isPointsSelected()) {
                let endPoints = [this.props.order.endPoint.location];
                if (this.props.order.wayPoint!==null) endPoints.unshift(this.props.order.wayPoint.location);

                getDistance(this.props.order.startPoint.location, endPoints, this.props.user.token)
                    .then(data => {

                        this.setState({
                            price: Math.ceil(data.price*2)/2,
                            distance: data.distance.toFixed(2),
                            duration: data.duration,
                        });

                        this.props.dispatch(setOrderPriceAction(this.state.price));
                        expandSection(this.footer);
                    })
                    .catch(e =>{
                        collapseSection(this.footer);
                        customConsole.error(e);
                    })
            }else{
                collapseSection(this.footer);
            }
    }


    reducePrice = ()=>{
        if (this.checkAvailableIncreasePrice()){
            this.props.dispatch(setOrderPriceAction(this.props.order.price - PRICE_STAP));
        }
    };

    checkAvailableIncreasePrice = () => this.props.app.minimalPrice<=this.props.order.price - PRICE_STAP;

    increasePrice = ()=>{
        this.props.dispatch(setOrderPriceAction(this.props.order.price + PRICE_STAP));
    };

    createOrderHandler = ()=>{
        this.setState({isButtonLoading: true});
        const order = this.props.order;

        let endPoints = [order.endPoint];
        if (order.wayPoint !==null) endPoints.unshift(order.wayPoint);

        createOrder(order.startPoint,endPoints,order.price,order.options,order.comment,0, this.props.order.card ,this.props.user.token,this.props.app.deviceId)
            .then(data =>{
                this.setState({isButtonLoading: false});
                this.props.dispatch(setOrderAction(convertOrderInfoFromBackEnd(data.order)));
                doSync();
            })
            .catch((e)=>{
                e.error.then(data=>{
                   console.log(data);
                });
                this.setState({isButtonLoading: false});
            })
    };



    render() {

        return (
            <div className="route-payment container">
                <HeaderWithMenu headerTitle={'Заказать такси'} />

                <div className={'calc-content'}>
                    <div className={'content-data-button-wrapper'}>
                        <div className={'badge badge-a'}/>
                        <AddressButton
                            onClick={this.selectStartPoint}
                            title={'откуда'}
                            mainText={this.props.order.startPoint.address || 'Не выбрано'}
                        />
                        {
                            this.props.order.wayPoint === null &&
                            <button className="number-of-route" onClick={this.addWayPoint}>
                                <div className="button-picture-btn"/>
                            </button>
                        }
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
                            <button onClick={this.removeWayPoint} className="number-of-route close">
                                <div className="button-picture-btn" />
                            </button>
                        </div>
                    }


                    <div className={'content-data-button-wrapper'}>
                        <div className={this.props.order.wayPoint === null ? 'badge badge-b' : 'badge badge-c' } />
                        <AddressButton
                            onClick={this.selectEndPoint}
                            title={'куда'}
                            mainText={this.props.order.endPoint.address || 'Не выбрано'}
                        />
                    </div>

                    <div className={'content-data-button-wrapper'}>
                        <div className={'badge pen'}/>
                        <AddressButton
                            onClick={this.selectComment}
                            title={'комментарий'}
                            mainText={this.props.order.comment || 'Добавьте комментарий'}
                        />
                    </div>
                    <div className={'content-data-button-wrapper'}>
                        <div className={'badge card'} />
                        <AddressButton
                            onClick={this.openPaymentMenu}
                            title={'способ оплаты'}
                            mainText={this.props.order.card === 0 ? "Наличные" : "Карта ***" + this.props.cards.find(el=> el.id === this.props.order.card).lastDigits }/>
                    </div>

                    <div className="additional-buttons">

                        <button onClick={this.openCarTypeMenu} className={'shadowed-button'}>
                            <div className="shadowed-button-title">класс поездки</div>
                            <div className="shadowed-button-text">{this.typeCarShow()}</div>
                        </button>

                        <button onClick={this.openOptionsMenu} className={'shadowed-button'}>
                            <div className="shadowed-button-title">дополнительно</div>
                            <div className="shadowed-button-text">{this.additionalOptionShow()}</div>
                        </button>

                    </div>
                </div>


                <footer ref={(el)=>{this.footer = el;}} style={{height: 0}}>
                    <div className={'footer-wp'}>
                        <div className="footer-text">Расстояние {this.state.distance} км</div>
                        <div className="footer-text second">Рекомендуемая стоимость {this.state.price}  BYN</div>
                        <div className="price-container">
                            <button onClick={this.reducePrice} className={'button-minus'}>-0.5 BYN</button>
                            <div className="calculated-price">{this.props.order.price} BYN</div>
                            <button onClick={this.increasePrice} className={'button-plus'}>+0.5 BYN</button>
                        </div>
                    </div>
                </footer>

                <FooterButton isLoading={this.state.isButtonLoading} onClick={this.createOrderHandler} nameButton={'заказать'} />

                <CarTypeMenu isVisible = {this.state.isCarTypeMenuOpen} closeMenu={this.closeCarTypeMenu}/>
                <OrderOptions isVisible = {this.state.isOptionsMenuOpen} closeMenu={this.closeOptionsMenu} />
                <PaymentMenu isVisible = {this.state.isPaymentMenuOpen} closeMenu={this.closePaymentMenu}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        order: state.order,
        app: state.app,
        cards: state.cards.cards
    };
};

export default connect(mapStateToProps)(Order);

/*
<PaymentMenu/>
 */