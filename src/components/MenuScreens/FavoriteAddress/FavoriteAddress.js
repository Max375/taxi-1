import React, { Component } from 'react';
import './FavoriteAddress.css';
import HeaderBack from '../../HeaderBack/HeaderBack';
import FooterButton from '../../FooterButton/FooterButton';
import {addressAutocomplete} from "../../../fetch/fetch";


class FavoriteAddress extends Component {

    state={
        points: []
    };

    autoComplete = (inputValue,callback)=>{
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

    changeInputHandler = (e)=>{
        this.autoComplete(e.target.value,(points)=>{
            this.setState({points: points});
            console.log(this.state.points,'points')
        })
    };

    render() {
        return (
            <div className={'favorite-address container'}>
                <HeaderBack headerTitle={'Избранный адрес'} />
                <div className="calc-content">
                    <input className="adding-point" onChange={this.changeInputHandler} />
                    {this.state.points.map(el => <div>{el.value}</div>)}
                </div>
                <FooterButton nameButton={'Добавить'}/>
            </div>
        );
    }
}

export default FavoriteAddress;