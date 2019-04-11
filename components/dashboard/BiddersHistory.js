import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {connect } from 'react-redux';
import { fetchBids, fetchBidItem, setBidItem } from './../../store/actions/action'
import loginReducer from './../../store/reducers/loginReducer'

export  class BiddersHistory extends Component {
    componentDidMount(){
        // console.warn(this.props.history)
    }
  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    )
  }
}




// function mapStateToProps(state){
//     return ({
//         bids: state.loginReducer.bids,
//         bidItem : state.loginReducer.bidItem,
//         history : state.loginReducer.history
//     })
// }

// function mapDispatchToProps(dispatch){
//     return{
//         fetchBids : () =>{
//             dispatch(fetchBids())
//         },
//         fetchBidItem : (pushKey) =>{
//             dispatch(fetchBidItem(pushKey))
//         },
//         setBidItem : (item) =>{
//             dispatch(setBidItem(item));
//         },
//         fetchHistory : () =>{
//             dispatch(fetchHistory())
//         }
//     }
// }


export default BiddersHistory