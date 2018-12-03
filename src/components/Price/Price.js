import React , {Component} from 'react';

import './Price.css';
import  from "..//";
import connect from "react-redux/es/connect/connect";

import setOrderPice from '../../actions/ordersActions/setOrderPriceAction';

class Price extends Component{

    constructor(props){
        super(props);
        console.log(this.props,'sadsad');
    }


    buttonClickHandlle(e) {
        this.props.dispatch(setOrderPice(++this.props.order.price));
    }

    render(){
        return(

            <React.Fragment>
            </>
                <div class="wait">Предлагаем вашу цену водителям, ожидайте</div>
                <div class="red"></div>
                <div class="offer">

                    <div class="offer-header">Предложенная цена не заинтересовала водителей</div>
                    <div class="numbers">
                        <div class="numbers-header">Предложите цену выше</div>
                        <button class="minus"><span>-1</span></button>
                        <div class="count"><span>{this.props.order.price}р</span></div>
                        <button class="plus" onClick={this.buttonClickHandlle.bind(this)}><span>+1</span></button>
                    </div>

                    <div class="driver-buttons">
                        <button class="accept-btn">Предложить</button>
                        <button class="cancel-btn">Отказаться</button>
                    </div>

                </div>

            </React.Fragment>
        )


    }

}


const mapStateToProps = (state) => {
    return {
        order: state.order,
    };
};

export default connect(mapStateToProps)(Price);