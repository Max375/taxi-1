import React, { Component } from 'react';
import './PointsList.css';
import HeaderBack from '../../HeaderBack/HeaderBack';
import FooterButton from '../../FooterButton/FooterButton';
import Point from "./Point";
import connect from "react-redux/es/connect/connect";
import {doSync} from "../../../secondary";
import changeScreenAction from "../../../actions/changeScreenAction";
import FavoriteAddress from '../FavoriteAddress/FavoriteAddress'

class PointsList extends Component {

    componentDidMount(){
        console.log(this.props)
    }

    render() {
        return (
            <div className={'my-addresses container'}>
                <HeaderBack onClick={doSync} headerTitle={'Мои адреса'} />
                <div className="calc-content">
                    {this.props.favoritePoints.map(el=><Point key={el.id} info={el}/>)}
                </div>
                <FooterButton onClick={()=>{this.props.dispatch(changeScreenAction(<FavoriteAddress />))}} nameButton={'Добавить адрес'}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        favoritePoints: state.favoritePoints.points,
    };
};

export default connect(mapStateToProps)(PointsList);


