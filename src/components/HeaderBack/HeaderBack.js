import React from 'react';
import './HeaderBack.css';


function HeaderBack(props){
        return (
            <div className={'header-type-one'}>
                <button onClick={props.onClick} className={'header-arrow-back'} />
                <p className={'header-type-one__title'}> {props.headerTitle}</p>
            </div>

        )
}
export default HeaderBack;