import React , {Component} from 'react';

import './Driver.css';
import TopBar from "../TopBar/TopBar";
import DriverOffer from '../DriverOffer/DriverOffer'
import connect from "react-redux/es/connect/connect";

class Driver extends Component{
    constructor(props) {
        super(props);
        console.log(JSON.stringify(props));
    }

    render(){
       let _Offers = [];

       for (let i=0; i < this.props.tradeList.length; i++){
           _Offers.push(<DriverOffer key={this.props.tradeList[i].id} token={this.props.user.token} data={this.props.tradeList[i]} dispatch={this.props.dispatch} />);
       }
        return(

            <React.Fragment>
                <TopBar/>
                <div className={'driver-wp'}>
                    {_Offers}
                </div>

            </React.Fragment>
        )


    }

}


const mapStateToProps = (state) => {
    return {
        user: state.user,
        order: state.order,
    };
};

export default connect(mapStateToProps)(Driver);

