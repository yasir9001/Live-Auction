import React, { Component } from 'react'
import TabNavigator from './TabNavigator'
export class Dashboard extends Component {
  static navigationOptions = {
    header: null,
}
  render() {
    return (
      <TabNavigator />
    )
  }
}

export default Dashboard
