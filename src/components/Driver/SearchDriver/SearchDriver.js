import React , {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import changeScreenAction from "../../../actions/changeScreenAction";
import Order from "../../Order/Order/Order";
import BackBtn from "../../../assets/img/icons/button.svg";
import LoadImage from "../../../assets/img/load.gif";
import {cancelOrder} from "../../../fetch/fetch";
import {updateTrades} from "../../../secondary"
import './SearchDriver.css';


class SearchDriver extends Component {

    componentDidMount(){
        updateTrades();
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