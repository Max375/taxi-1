import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Order.css';
import Menu from '../Menu/Menu';

import OrderInput from '../OrderInput/OrderInput'
import TopBar from "../TopBar/TopBar";


class Order extends Component {
        constructor(props) {
            super(props);
            this.state = {isMenuVisible: false};
        }

        render(){
        return(
           <div>
                   <div>
                       <TopBar/>

                       <div className='order-wp'>
                           <OrderInput token={this.props.token} />
                           <input className="order-wp entrance" type="text" placeholder="Подъезд" />
                       </div>


                       <div className="order-wp">
                           <OrderInput/>
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
                                   <div className="price-count">--<span>--</span></div>
                               </div>

                       <div className="numbers">
                           <button className="minus">-1</button>
                           <div className="count"><span>0 р</span></div>
                           <button className="plus">+1</button>
                       </div>

                               <button className="to-order">
                                   Заказать
                               </button>
                           </div>
                   </div>
        )
}

}


const mapStateToProps = (state) => {
    return state.user;
};

export default connect(mapStateToProps)(Order);