import React, { Component } from 'react';
import './AddressSelect.css';
import connect from "react-redux/es/connect/connect";
import HeaderBack from "../../HeaderBack/HeaderBack";
import FooterButton from "../../FooterButton/FooterButton";
import Select from "../Select/Select";
import OrderMap from '../OrderMap/OrderMap'
import {addressAutocomplete} from '../../../fetch/fetch'
import changeScreenAction from "../../../actions/changeScreenAction";
import Order from "../Order/Order";

const autoComplete = (inputValue,callback)=>{
    addressAutocomplete(inputValue,callback)
        .then((data)=>{
            if (data.status !== "OK") throw {message: "Response is empty", status: 404};
            let points = Array.from(data.predictions).map(el=>{
                if (el.structured_formatting.secondary_text.indexOf("Minsk, Belarus")) return undefined;
                return {
                    value: el.structured_formatting.main_text,
                    label: el.structured_formatting.main_text,
                    geocode: true
                }
            });
            points = points.filter(point => point !== undefined);
            callback(points);
        })
        .catch(e=>{
            callback([]);
        });
};


class AddressSelect extends Component {

    selectRef = null;

    state = {
        label: null,
        value: null
    };


    selectSetRef = (el)=>{
        this.selectRef = el
    };

    selectOnChange = (e)=>{
        this.setState({
            value: e.data.value,
            label: e.data.label
        });
    };

    mapOnChange = (e)=>{
        this.selectRef.setOption(e.value,e.label);
    };

    back = ()=>{
        this.props.dispatch(changeScreenAction(<Order/>));
    };

    render() {
        return (
            <div className="address-select container">
                <HeaderBack onClick={this.back} headerTitle={'Выберете адресс'} />

                <div className="address-wp">

                    <Select
                        MyRef={this.selectSetRef}
                        onChange={this.selectOnChange}
                        options = {[]}
                        defaultOption={{label: this.state.label, value: this.state.value}}
                        constOptions = {[]}
                        loadOptions={autoComplete}
                    />

                    <OrderMap onChange={this.mapOnChange} />

                </div>
                <FooterButton nameButton={'Выбрать'}
                    onClick={()=> {
                        this.props.onChange(this.state);
                        this.back();
                    }}
                />
            </div>
        );
    }
}

export default connect()(AddressSelect)