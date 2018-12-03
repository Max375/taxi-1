import React, { Component } from 'react';
import './Comment.css';
import HeaderBack from '../../HeaderBack/HeaderBack';
import FooterButton from '../../FooterButton/FooterButton';
import changeScreenAction from "../../../actions/changeScreenAction";
import Order from "../Order/Order";
import connect from "react-redux/es/connect/connect";

class Comment extends Component {

    textArea = null;

    refSetTextArea = (el)=>{
        this.textArea = el
    };

    componentDidMount(){
        this.textArea.value = this.props.oldComment
    }
    back = ()=>{
        this.props.dispatch(changeScreenAction(<Order/>));
    };


    render() {
        return (
            <div className={'feedback container'}>
                <HeaderBack onClick={this.back} headerTitle={'Комментарий'}/>
                <div className="feedback-content">
                    <div className="flex-top">
                        <p className={'h2'}>Текст отзыва</p>
                        <textarea ref={this.refSetTextArea} />
                    </div>
                </div>
                <FooterButton onClick={()=>{
                    this.props.onChange(this.textArea.value);
                    this.back();
                }} nameButton={'отправить'}/>
            </div>
        );
    }
}

export default connect()(Comment);