import React , {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import changeScreenAction from "../../../actions/changeScreenAction";
import Order from "../../Order/Order/Order";
import BackBtn from "../../../assets/img/icons/button.svg";
import LoadImage from "../../../assets/img/load.gif";
import {cancelOrder, getTradeList} from "../../../fetch/fetch";
import './SearchDriver.css';
import {customConsole} from "../../../utils";

class SearchDriver extends Component {

    componentDidMount(){
        getTradeList(this.props.user.token, this.props.app.deviceId)
            .then(data=>{
                console.log(data);
            })
            .catch(e => {
                customConsole.log(e);
            })
    }

    render() {
        return (
            <div className={"search-driver"}>
                <div className="search">Поиск водителя</div>
                <div className="load">
                    <img src={LoadImage} alt=""/>
                </div>
                <div className="back" onClick={() => {
                    cancelOrder(this.props.user.token, 'Водитель не найден').then((res) => {
                        if (res === true) this.props.dispatch(changeScreenAction(<Order/>));
                        else {
                            console.log('CANCELED ORDER FETCH FAILED');
                        }
                    });
                }}>
                    <img src={BackBtn} alt=""/>
                </div>
            </div>);
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