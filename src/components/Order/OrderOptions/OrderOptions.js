import React, { Component } from 'react';
import './OrderOptions.css'
import setOrderOptionsAction from '../../../actions/ordersActions/setOrderOptionsAction'
import Girl from '../../../assets/img/girl.png'
import Pet from '../../../assets/img/pet.png'
import Case from '../../../assets/img/case.png'
import connect from "react-redux/es/connect/connect";
import {doSync} from "../../../secondary";

class optionsMenu extends Component {

    options = this.props.options;

    constructor(props) {
        super(props);
    }


    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.options[name] = +value;

        this.props.dispatch(setOrderOptionsAction(this.options));
        event.stopPropagation();
    };


    render(){


        return (
            <React.Fragment>
                <div class={this.props.isVisible ? 'option-bg option-bg-open' : 'option-bg'} onClick={this.props.clickHandler}>
                </div>
                <div class={(this.props.isVisible) ? 'extra extra-open' : 'extra'}>
                    <div class="extra-wrapp clearfix">
                        <div class="extra-header">
                            Дополнительные услуги
                        </div>
                    </div>

                    <div class="extra-inputs clearfix">
                        <label><input defaultChecked={this.options.gender} name="gender" type="checkbox" onChange={this.handleInputChange}/>Девушка водитель <img src={Girl}/></label>
                        <label><input defaultChecked={this.options.ads}  name="ads" type="checkbox" onChange={this.handleInputChange} />Авто без рекламы</label>
                        <label><input defaultChecked={this.options.baggage} name="baggage" type="checkbox" onChange={this.handleInputChange} />Багаж <img src={Case}/></label>
                        <label><input defaultChecked={this.options.dogPlace}  name="dogPlace" type="checkbox" onChange={this.handleInputChange} />Перевозка животного <img src={Pet}/></label>
                        <label><input defaultChecked={this.options.smoking}  name="smoking" type="checkbox" onChange={this.handleInputChange} />Не курящий водитель</label>
                        <label><input defaultChecked={this.options.english} name="english" type="checkbox" onChange={this.handleInputChange} />Англоговорящий водитель</label>
                        <label><input defaultChecked={this.options.babySeat} name="babySeat" type="checkbox" onChange={this.handleInputChange} />Детское кресло</label>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        options: state.order.options,
    };
};

export default connect(mapStateToProps)(optionsMenu);
