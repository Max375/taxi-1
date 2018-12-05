import connect from "react-redux/es/connect/connect";
import changeScreenAction from "../../../actions/changeScreenAction";
import {cancelOrder} from "../../../fetch/fetch";
import {doSync, updateTrades} from "../../../secondary"
import './SearchDriver.css';
import loaderPurple from "../../../assets/img/loader_purple.svg";


import React, {Component} from 'react';
import '../../Load/Load.css';
import loadingLogo from '../../../assets/img/loading_logo.png';
import {customConsole} from "../../../utils";
import setOrderAction from "../../../actions/ordersActions/setOrderAction";


class SearchDriver extends Component {

    state = {
       interval: null,
        isLoading: false
    };

    componentDidMount(){
        this.setState({interval : setInterval(updateTrades, 1000)});
    }

    componentWillUnmount(){
        clearInterval(this.state.interval);
    }

    //todo
    onClickHandler = ()=> {
        this.setState({isLoading: true});
        cancelOrder(this.props.user.token, 'Водитель не найден')
            .then((res) => {
                this.setState({isLoading: false});
                this.props.dispatch(setOrderAction());
                doSync();
            })
            .catch(e=>{
                this.setState({isLoading: false});
                customConsole.log('failed canceled order');
            })
    };

    render() {
        return (
            <div className={'loading container'}>
                <div className={'logo-loading'}>
                    <img src={loadingLogo} alt=""/>
                </div>
                <div className={'text'}>Поиск водителя</div>
                <button className="button-back-search" onClick={this.onClickHandler}>
                    {this.state.isLoading ? (<img src={loaderPurple} alt="" className={'loader'}/>) : "Назад"}</button>
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