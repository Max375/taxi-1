import React, { Component } from 'react';

import AsyncSelect from 'react-select/lib/Async';

import _ from 'underscore';

import {autocomleteRequest, getStreet, HTTP_STATUS_USER_UNAUTHORIZED} from '../../fetch/fetch';



export default class OrderInput extends Component{

    static defaultProps = {
        apiKey: 'AIzaSyC2KMjrNE3GpU8xFnZwwa0_ic5tGjDW2cg',
        location: '53.90453979999999,27.5615244',
    };

    constructor(props) {
        super(props);

        this.getOptions = _.throttle(this.promiseOptions,300);
        this.constOptions = [
                { value: 'map', label: 'Посмотреть на карте' },
            ];
        if (this.props.defaultValue!=null) this.input = this.props.defaultValue.label;
        else this.input = '';

    };

    state = { inputValue: this.input};

    handleInputChange = (newValue) => {
        const inputValue = newValue.replace(/\W/g, '');
        this.setState({ inputValue });
        return inputValue;
    };


    promiseOptions(inputValue){

        return autocomleteRequest(inputValue).then((data)=>{
            return data.predictions.map(el => {
                return{
                    label: el.structured_formatting.main_text,
                    value: null
                };
            }).concat(this.constOptions);
        }).catch(e=>{});
    }

    onChangeFunc(optionSelected) {
        const name = this.name;
        const value = optionSelected.value;
        const label = optionSelected.label;
    }


    render() {
        return (
            <AsyncSelect   backspaceRemovesValue={false} isClearable={true} classNamePrefix="react-select" placeholder={'Выберите точку'}  value={this.props.defaultValue} onChange={(optionSelected,action) => this.props.onChangeCallback(optionSelected,action, this.props.id)} className="order-input" cacheOptions defaultOptions={this.constOptions} loadOptions={this.getOptions.bind(this)} />
        );
    }
}