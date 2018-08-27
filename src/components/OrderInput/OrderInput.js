import React, { Component } from 'react';

import AsyncSelect from 'react-select/lib/Async';

import _ from 'underscore';

import {getStreet, HTTP_STATUS_USER_UNAUTHORIZED} from '../../fetch/fetch';

var googleMapsClient = require('@google/maps').createClient({key: 'AIzaSyC2KMjrNE3GpU8xFnZwwa0_ic5tGjDW2cg'});


export default class OrderInput extends Component{

    constructor(props) {
        super(props);
        console.log(this.props.defaultValue);
        this.getOptions = _.throttle(this.promiseOptions,300);
        this.constOptions = [
                { value: 'map', label: 'Посмотреть на карте' },
                { value: 'strawberry', label: 'Любимое место (Работа)' }
            ];
    }


    state = { inputValue: '' };
    handleInputChange = (newValue) => {
        const inputValue = newValue.replace(/\W/g, '');
        this.setState({ inputValue });
        return inputValue;
    };


    promiseOptions(inputValue){
        return getStreet(inputValue, '$2y$10$4NtSAYIvkERQpcO74O2bR.O9rAFEXwXJNqcoyYGCZnrKz6hcju2TO')
            .then(resp => {
                if (resp.status === HTTP_STATUS_USER_UNAUTHORIZED) {

                }
                return resp.json();
            })
            .then(body => {
                return body.address_list.map(elem => {
                    return {
                        value: elem,
                        label: elem
                    }
                })
            })
            .then( (data) => {
                return data.concat(this.constOptions);
            });
    }



    render() {
        console.log(googleMapsClient.places.Autocomplete);
        return (
            <AsyncSelect backspaceRemovesValue={false} isClearable={true} classNamePrefix="react-select" placeholder={'Выберите точку'}  isClearable={true} value={this.props.defaultValue} onChange={(optionSelected,action) => this.props.onChangeCallback(optionSelected,action, this.props.id)} className="order-input" cacheOptions defaultOptions={this.constOptions} loadOptions={this.getOptions.bind(this)} />
        );
    }
}