import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Order.css';
import Menu from '../Menu/Menu';

import OrderInput from '../OrderInput/OrderInput'
import TopBar from "../TopBar/TopBar";

import setOrderStartPoint from '../../actions/setOrderStartPoint';
import setOrderEndPoint from '../../actions/setOrderEndPoint';

import changeScreenAction from "../../actions/changeScreenAction";
import Load from '../Load/Load';

import Map from '../Map/Map';





class Order extends Component {
        constructor(props) {
            super(props);


            this.state = {isMenuVisible: false, count: 7};
        }


        onChangeEndPoint(optionSelected,action) {
            this.props.dispatch(setOrderEndPoint(optionSelected.value));
        }


        onChangeStartPoint(optionSelected,action) {
           this.props.dispatch(setOrderStartPoint(optionSelected.value));
        }


        render(){
        return(
            <React.Fragment>

            <div>
                   <div>
                       <TopBar/>

                       <div className='order-wp'>
                           <OrderInput  onChangeCallback={this.onChangeStartPoint.bind(this)} token={this.props.token} />
                           <input className="order-wp entrance" type="text" placeholder="Подъезд" />
                       </div>


                       <div className="order-wp">
                           <OrderInput onChangeCallback={this.onChangeEndPoint.bind(this)}/>
                       </div>

                               <textarea className="comment-text" placeholder="Комментарий к заказу"></textarea>
                       <div className="btn-wp">
                           <button className="order-econom">
                               Эконом
                           </button>

                           <button className="dop-services">
                               Доп. услуги
                           </button>
                       </div>

                                   <select>
                                       <option value="Наличными">Наличными</option>
                                       <option value="Банковской картой">Банковской картой</option>
                                   </select>


                               <div className="price">
                                   Расстояние / рекомендуемая стоимость
                                   <div className="price-count">{(this.props.order.endPoint != null && this.props.order.startPoint != null) ? '7р' : '--'}<span>{(this.props.order.endPoint != null && this.props.order.startPoint != null) ? '14км' : '--'}</span></div>
                               </div>


                       <div className={(this.props.order.endPoint != null && this.props.order.startPoint != null) ? 'numbers numbers-active' : 'menu-bg'}>
                           <button className="minus" onClick={
                               ()=>{this.setState({count: --this.state.count})
                               }
                           }>-1</button>
                           <div className="count"><span>{(this.props.order.endPoint != null && this.props.order.startPoint != null) ? this.state.count : '0'} р</span></div>
                           <button className="plus" onClick={
                               ()=>{this.setState({count: ++this.state.count})}
                           }>+1</button>
                       </div>

                               <button className="to-order" onClick={()=>{
                                   if (this.props.order.endPoint != null && this.props.order.startPoint != null){
                                       this.props.dispatch(changeScreenAction(<Load />))}
                               }
                               } >
                                   Заказать
                               </button>
                           </div>
                   </div>

                <Map/>

            </React.Fragment>

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