import React from 'react';
import './Button.css';
import loader from '../../assets/img/loader.svg';

function Button(props){

        return (
            <button  onClick={props.onClick}   className={props.withImage === true ? ' full-screen-button'  : 'login-submit'} >
                {props.isLoading ? (<img src={loader} alt="" className={'loader'}/>)  : props.text}
            </button>
        );
}
export default Button;
