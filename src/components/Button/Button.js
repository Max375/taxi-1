import React from 'react';
import './Button.css';
import loader from '../../assets/img/loader.svg';

function Button(props){

        return (
            <button  onClick={props.onClick}   className={props.withImage === true ? 'login-submit full-screen-button'  : 'login-submit'} >
                {props.isLoading ? (<img src={loader} alt="" className={'loader'}/>)  : props.text}
            </button>
        );
}
export default Button;


/*

{this.props.withImage === true && (<img src={buttonMark} alt=""/>)}




        let output = this.props.text;

        if (this.state.isLoaded){
            output = (<img src={loader} alt="" className={'loader'}/>);
        }

//////////////
{this.state.isLoaded ? (<img src={loader} alt="" className={'loader'}/>)  : this.props.text}

 */