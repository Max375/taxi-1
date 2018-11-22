import {Component} from "react";
import TopBar from "../TopBar/TopBar";
import React from "react";
import connect from "react-redux/es/connect/connect";
import './Promocodes.css';
import {getUserInfo, usePromocode} from '../../fetch/fetch'
import setUserInfoAction from "../../actions/setUserInfoAction";

class Promocodes extends Component {

    input = null;

    state = {
        message: '',
        isValid: false,
        isMessageOpen: false,
    };

    render(){


        return(
            <div class='promocodes'>

                    <TopBar/>
                    <div>
                        Ваш промокод {this.props.user.promocode}!
                    </div>
                    <div>Ввести промокод</div>
                    <div>
                        <input ref={el =>{
                            this.input = el;
                        }} type="text"/>
                        { this.state.isMessageOpen && <div class={this.state.isValid ? 'promocode-invalid-message': 'promocode-valid-message'} >{this.state.message}</div>}
                        <button onClick={
                            ()=>{
                                usePromocode(this.input.value.trim(),this.props.user.token)
                                    .then((data)=>{
                                        console.log('succes',data);
                                        this.setState({
                                            message: 'Ваш промокод применен',
                                            isValid: true,
                                            isMessageOpen: true,
                                        });

                                        getUserInfo(this.props.user.token)
                                            .then((data)=> {
                                                this.props.dispatch(setUserInfoAction(data.user_info.info, this.props.user.token));
                                            });

                                    })
                                    .catch((e)=>{
                                        console.log('fail');
                                        this.setState({
                                            message: 'Промокд применен не верно',
                                            isValid: false,
                                            isMessageOpen: true,
                                        })
                                    })
                            }
                        }>
                            Ввести промокод
                        </button>
                    </div>

            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        app: state.app,
        user: state.user
    };
};

export default connect(mapStateToProps)(Promocodes);

