import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {StackNavigator, StackNavigator2 } from './TabNavigator'

export class BidContainerRoutes extends Component {
    static navigationOptions = {
        title: 'Auctions'
    }
  render() {
    return (
             <StackNavigator /> 
    )
  }
}

export default BidContainerRoutes

export class HomeContainerRoutes extends Component {
  static navigationOptions = {
      title:"My Auctions"
  }
render() {
  return (
           <StackNavigator2 /> 
  )
}
}