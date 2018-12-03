import React, { Component } from 'react';
import './SavedPoint.css';
import HeaderBack from '../../HeaderBack/HeaderBack';
import FooterButton from "../../FooterButton/FooterButton";
class SavedPoint extends Component {

    render() {
        return (
            <div className={'saved-points container'}>
                <HeaderBack headerTitle={'Избранный адрес'} />
                <div className="calc-content">
                    <div className="chosen-point field-size"> ул. Колхозной победы над буржуазным строем, 1</div>
                    <input type="text" className={'field-size'} placeholder={'Добаивть название'}/>
                    <input type="text" className={'field-size'} placeholder={'Указать подъезд'}/>
                    <div className="textarea-name">Комментарий</div>
                    <textarea placeholder={'Комментарий'}>По приезду выслать счет Никите</textarea>
                </div>
                <FooterButton nameButton={'добавить'}/>
            </div>
        );
    }
}

export default SavedPoint;