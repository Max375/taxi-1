import React, { Component } from 'react';
import './FavoriteAddress.css';
import HeaderBack from '../../HeaderBack/HeaderBack';
import FooterButton from '../../FooterButton/FooterButton';


class FavoriteAddress extends Component {

    render() {
        return (
            <div className={'favorite-address container'}>
                <HeaderBack headerTitle={'Избранный адрес'} />
                <div className="calc-content">
                    <div className="adding-point">Красноармейская, 1</div>
                </div>
                <FooterButton nameButton={'Добавить'}/>
            </div>
        );
    }
}

export default FavoriteAddress;