import connect from "react-redux/es/connect/connect";
import changeScreenAction from "../../../actions/changeScreenAction";
import {cancelOrder} from "../../../fetch/fetch";
import {doSync, updateTrades} from "../../../secondary"
import './SearchDriver.css';


import React, {Component} from 'react';
import '../../Load/Load.css';
import loadingLogo from '../../../assets/img/loading_logo.png';
import {customConsole} from "../../../utils";
import setOrderAction from "../../../actions/ordersActions/setOrderAction";


class SearchDriver extends Component {

    state = {
       interval: null
    };

    componentDidMount(){
        this.setState({interval : setInterval(updateTrades, 1000)});
    }

    componentWillUnmount(){
        clearInterval(this.state.interval);
    }

    //todo
    onClickHandler = ()=> {
        cancelOrder(this.props.user.token, 'Водитель не найден')
            .then((res) => {
                this.props.dispatch(setOrderAction());
                doSync();
            })
            .catch(e=>{
                customConsole.log('failed canceled order');
            })
    };

    render() {
        return (
            <div className={'loading container'}>
                <div className={'logo-loading'}>
                    <img src={loadingLogo} alt=""/>
                </div>
                <div style={{color: 'white',textAlign: 'center'}}>Поиск водителя</div>
                <button onClick={this.onClickHandler}>Назад</button>
                <div className="spinner-wrapper">
                    <div className="lds-default">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        app: state.app,
    };
};

export default connect(mapStateToProps)(SearchDriver);


/*





 */