import React, { Component } from 'react';
import './Select.css'

const VALUE_SELECT = 'VALUE_SELECT';

const eventCreator = (eventType,value,label) => {
    return {
        eventType: eventType,
        data: {
            value: value,
            label: label
        }
    }
};




const geocode =  (address, callback) =>{

    const geocoder = new window.google.maps.Geocoder;

    geocoder.geocode({
            'address': address
        },
        (results,status) => {
            if(status === 'OK') callback(results[0].geometry.location, address);

        }
    );
};





class Select extends Component {


    static defaultProps = {
        isSelectOpen: false,
        defaultOption: {value: null, label: null, geocode: false},
        defaultText: 'Введите адресс',
        onChange: null,
        loadOptions: null,
        options: [],
    };


    state = {
        isSelectOpen: this.props.isSelectOpen,
        defaultOption: this.props.defaultOption,
        options: this.props.options,
    };

    input = null;


    componentDidMount(){
        console.log('component did mount',this.state);
        document.addEventListener('click', this.documentClickHandler);
        this.input.value = this.props.defaultOption.label || '';
    }

    componentDidUpdate(){
        if (this.props.defaultOption.label !== this.state.defaultOption.label){
            this.setState({defaultOption: {value: this.props.defaultOption.value, label: this.props.defaultOption.label, geocode: true}});
            this.input.value = this.props.defaultOption.label || '';
        }
    }



    documentClickHandler = (e)=>{
        if (e.target.dataset.select !== 'my-custom-select'){
            if (this.state.isSelectOpen === true){
                this.closeSelect();
                if (this.input!==null) this.input.value = this.state.defaultOption.label || '';
            }
        }
    };


    closeSelect = ()=>{
        this.setState({isSelectOpen: false});
    };


    openSelect = ()=>{
        this.setState({isSelectOpen: true});
    };


    onClickHandler = (e)=>{

        if (e.target.dataset.geocode === 'true'){
            geocode(e.target.innerText,(result,address)=>{
                this.selectValue({lat: result.lat(), lon: result.lat()}, address);
            });
        }else{
            this.selectValue(e.target.dataset.value, e.target.innerText);
        }
    };


    inputChange = ()=>{
        if (this.props.loadOptions !== null) this.props.loadOptions(this.input.value, this.callback);
    };


    callback = (options) =>{
        if (Array.isArray(options)) this.setState({options: options});
        else this.setState({options: []});
    };

    selectValue = (value,label)=>{
        this.setState({defaultOption: {value: value, label: label}});

        this.input.value = label || '';
        if(this.props.onChange !== null) this.props.onChange(eventCreator(VALUE_SELECT,value,label));
    };

    onStateRefInput = (el)=>{this.input = el;};


    generateOptions = () =>{
        const staticOptions = this.props.constOptions.map(el=> <div key={el.value} class="options__elements" data-geocode={el.geocode} data-value={el.value}>{el.label}</div>);

        let options;

        if (this.state.options.length >0) options = this.state.options.map(el =><div key={el.value} class="options__elements" data-geocode={el.geocode} data-value={el.value}>{el.label}</div>);


        if (this.state.options.length + staticOptions.length === 0) options = (<div class="select__not-found">Ничего не найдено</div>);

        return staticOptions.concat(options);
    };


    render() {

        const options = this.generateOptions();


        return (
            <div class="select"
                 onFocus={this.openSelect}
            >
                <input type="text" class="select__input-field"
                       data-select = {'my-custom-select'}
                       placeholder={this.props.defaultText}
                       ref={this.onStateRefInput}
                       onChange={this.inputChange}
                />

                <div
                    data-select = {'my-custom-select'}
                    onClick={options.length  === 0 ? null : this.onClickHandler}
                    class={this.state.isSelectOpen ? "select__options select__options--open" : "select__options"}
                >
                    {options}
                </div>
            </div>
        );
    }
}


export default Select;
