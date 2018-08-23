import React , {Component} from 'react';

import './Price.css';
import TopBar from "../TopBar/TopBar";
import connect from "react-redux/es/connect/connect";

import setOrderPice from '../../actions/setOrderPrice';

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
            <TopBar/>
                <div className="wait">Предлагаем вашу цену водителям, ожидайте</div>
                <div className="red"></div>
                <div className="offer">

                    <div className="offer-header">Предложенная цена не заинтересовала водителей</div>
                    <div className="numbers">
                        <div className="numbers-header">Предложите цену выше</div>
                        <button className="minus"><span>-1</span></button>
                        <div className="count"><span>{this.props.order.price}р</span></div>
                        <button className="plus" onClick={this.buttonClickHandlle.bind(this)}><span>+1</span></button>
                    </div>

                    <div className="driver-buttons">
                        <button className="accept-btn">Предложить</button>
                        <button className="cancel-btn">Отказаться</button>
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