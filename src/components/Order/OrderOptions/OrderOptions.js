import React, { Component } from 'react';
import './OrderOptions.css'
import setOrderOptionsAction from '../../../actions/ordersActions/setOrderOptionsAction'
import connect from "react-redux/es/connect/connect";

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
            <div className="left-popup-menu additional-services">
                <div className="left-popup-menu-content">
                    <div className="flex-top-wrapper">
                        <p className={'popup-title'}>Дополнительные услуги</p>
                        <input defaultChecked={this.options.gender} name="gender" type="checkbox" onChange={this.handleInputChange}/>
                        <label htmlFor={'girl-driver'}>
                            Девушка водитель
                        </label>

                        <input defaultChecked={this.options.ads}  name="ads" type="checkbox" onChange={this.handleInputChange}/>
                        <label htmlFor={'ads'}>
                            Авто без рекламы
                        </label>

                        <input defaultChecked={this.options.baggage} name="baggage" type="checkbox" onChange={this.handleInputChange} checked/>
                        <label  htmlFor={'baggage'}>
                            Багаж
                        </label>

                        <input defaultChecked={this.options.dogPlace}  name="dogPlace" type="checkbox" onChange={this.handleInputChange}/>
                        <label htmlFor={'dogPlace'}>
                            Перевозка животного
                        </label>

                        <input defaultChecked={this.options.smoking}  name="smoking" type="checkbox" onChange={this.handleInputChange}  />
                        <label  htmlFor={'smoking'}>
                            Не курящий водитель
                        </label>

                        <input defaultChecked={this.options.english} name="english" type="checkbox" onChange={this.handleInputChange}/>
                        <label defaultChecked={this.options.english} htmlFor={'english'}>
                            Англоговорящий водитель
                        </label>

                        <input defaultChecked={this.options.babySeat} name="babySeat" type="checkbox" onChange={this.handleInputChange}/>
                        <label defaultChecked={this.options.babySeat} htmlFor={'babySeat'}>
                            Детское кресло
                        </label>

                    </div>

                    <div className="flex-bottom-wrapper">
                        <Button text={'применить'}/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        options: state.order.options,
    };
};

export default connect(mapStateToProps)(optionsMenu);